local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")

local GameConfig = require(ReplicatedStorage.Configs.GameConfig)

local RoundService = {}
RoundService.activeMatches = {}

local function getArenaTemplate(name)
	return ServerStorage.Maps:FindFirstChild(name) or ServerStorage.Maps:FindFirstChild("Warehouse")
end

function RoundService:StartMatch(matchData, teams)
	local arena = getArenaTemplate(matchData.mode)
	if not arena then
		warn("No maps found in ServerStorage/Maps")
		return
	end

	local arenaClone = arena:Clone()
	arenaClone.Parent = workspace

	local state = {
		mode = matchData.mode,
		arena = arenaClone,
		teams = teams,
		round = 0,
		score = {},
		finished = false,
	}

	for teamIndex = 1, #teams do
		state.score[teamIndex] = 0
	end

	table.insert(self.activeMatches, state)
	task.spawn(function()
		self:RunRounds(state)
	end)
end

function RoundService:RunRounds(state)
	while not state.finished do
		state.round += 1
		for teamIndex, teamPlayers in ipairs(state.teams) do
			for _, player in ipairs(teamPlayers) do
				if player.Character and state.arena:FindFirstChild("Spawns") and state.arena.Spawns:FindFirstChild(tostring(teamIndex)) then
					player.Character:PivotTo(state.arena.Spawns[tostring(teamIndex)]:GetPivot())
				end
			end
		end

		task.wait(GameConfig.RoundTime)
		local winningTeam = math.random(1, #state.teams) -- Replace with alive tracking in production
		state.score[winningTeam] += 1

		if state.score[winningTeam] >= GameConfig.RoundWinTarget then
			state.finished = true
		end
	end

	state.arena:Destroy()
end

return RoundService
