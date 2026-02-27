local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local DataService = require(script.Parent.Modules.DataService)
local MatchmakingService = require(script.Parent.Modules.MatchmakingService)
local RoundService = require(script.Parent.Modules.RoundService)
local CombatService = require(script.Parent.Modules.CombatService)

local remotes = ReplicatedStorage:WaitForChild("Remotes")
local matchStateEvent = remotes:WaitForChild("MatchState")
local combatEvent = remotes:WaitForChild("CombatRequest")
local killFeedEvent = remotes:WaitForChild("KillFeed")
local loadoutEvent = remotes:WaitForChild("LoadoutUpdate")
local queueEvent = remotes:WaitForChild("QueueRequest")
local shopEvent = remotes:WaitForChild("ShopRequest")
local snapshotFn = remotes:WaitForChild("GetSnapshot")

local livingByMatch = {}

local function broadcastSnapshot(player)
	local data = DataService:Get(player)
	matchStateEvent:FireClient(player, {
		kind = "PROFILE",
		keys = data and data.Keys or 0,
		loadout = data and data.Loadout or {},
	})
end

Players.PlayerAdded:Connect(function(player)
	DataService:Load(player)
	broadcastSnapshot(player)

	player.CharacterAdded:Connect(function(character)
		local humanoid = character:WaitForChild("Humanoid")
		humanoid.Died:Connect(function()
			killFeedEvent:FireAllClients({
				killer = "Environment",
				victim = player.Name,
				weapon = "-",
			})
		end)
	end)
end)

queueEvent.OnServerEvent:Connect(function(player, payload)
	local match = MatchmakingService:QueuePlayer(player, payload.mode, payload.teamSize)
	if match then
		local teams = MatchmakingService:BuildTeams(match)
		RoundService:StartMatch(match, teams)
		matchStateEvent:FireAllClients({kind = "MATCH_FOUND", mode = match.mode})
	end
end)

loadoutEvent.OnServerEvent:Connect(function(player, newLoadout)
	local profile = DataService:Get(player)
	if not profile then
		return
	end
	profile.Loadout = newLoadout
	broadcastSnapshot(player)
end)

shopEvent.OnServerEvent:Connect(function(player, item)
	local profile = DataService:Get(player)
	if not profile then
		return
	end
	if profile.Keys < item.price then
		return
	end
	profile.Keys -= item.price
	table.insert(profile.OwnedWeapons, item.id)
	broadcastSnapshot(player)
end)

combatEvent.OnServerEvent:Connect(function(player, payload)
	if payload.type == "SHOT" then
		local result = CombatService:ValidateAndApplyShot(player, payload)
		if result then
			if result.target.Character and result.target.Character:FindFirstChildOfClass("Humanoid").Health <= 0 then
				DataService:AddKeys(player, 10)
				killFeedEvent:FireAllClients({
					killer = player.Name,
					victim = result.target.Name,
					weapon = result.weapon,
					headshot = result.headshot,
				})
			end
		end
	elseif payload.type == "GRENADE" then
		CombatService:ThrowGrenade(player, payload)
	end
end)

snapshotFn.OnServerInvoke = function(player)
	local profile = DataService:Get(player)
	return {
		keys = profile and profile.Keys or 0,
		loadout = profile and profile.Loadout or {},
		ownedWeapons = profile and profile.OwnedWeapons or {},
	}
end
