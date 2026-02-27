local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

local dataStore = DataStoreService:GetDataStore("RivalsV1")

local DataService = {}
local cache = {}

local defaultData = {
	Keys = 0,
	OwnedWeapons = {"AR_MK1", "PST_9", "KNF_COMBAT", "GRN_HE"},
	OwnedCosmetics = {},
	Loadout = {
		Primary = "AR_MK1",
		Secondary = "PST_9",
		Melee = "KNF_COMBAT",
		Utility = "GRN_HE",
	},
	Stats = {
		Kills = 0,
		Wins = 0,
	},
}

local function deepCopy(tbl)
	local result = {}
	for k, v in pairs(tbl) do
		result[k] = type(v) == "table" and deepCopy(v) or v
	end
	return result
end

function DataService:Get(player)
	return cache[player.UserId]
end

function DataService:AddKeys(player, amount)
	local profile = cache[player.UserId]
	if not profile then
		return
	end
	profile.Keys += amount
end

function DataService:Load(player)
	local success, result = pcall(function()
		return dataStore:GetAsync(player.UserId)
	end)
	local profile = deepCopy(defaultData)
	if success and type(result) == "table" then
		for k, v in pairs(result) do
			profile[k] = v
		end
	end
	cache[player.UserId] = profile
	return profile
end

function DataService:Save(player)
	local profile = cache[player.UserId]
	if not profile then
		return
	end
	pcall(function()
		dataStore:SetAsync(player.UserId, profile)
	end)
end

Players.PlayerRemoving:Connect(function(player)
	DataService:Save(player)
	cache[player.UserId] = nil
end)

game:BindToClose(function()
	for _, player in ipairs(Players:GetPlayers()) do
		DataService:Save(player)
	end
end)

return DataService
