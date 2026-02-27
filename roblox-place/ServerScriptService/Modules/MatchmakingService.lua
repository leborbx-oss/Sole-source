local Players = game:GetService("Players")
local Teams = game:GetService("Teams")

local MatchmakingService = {}
MatchmakingService.queues = {
	DUELS = {},
	TDM = {},
	FFA = {},
	["1V1V1"] = {},
	["2V2V2"] = {},
}

local function takePlayers(queue, count)
	local selected = {}
	for i = 1, count do
		table.insert(selected, table.remove(queue, 1))
	end
	return selected
end

function MatchmakingService:QueuePlayer(player, mode, teamSize)
	local queue = self.queues[mode]
	if not queue then
		return nil
	end
	table.insert(queue, {
		Player = player,
		TeamSize = teamSize,
		Joined = os.clock(),
	})

	if mode == "DUELS" and #queue >= teamSize * 2 then
		return {mode = mode, players = takePlayers(queue, teamSize * 2), teamSize = teamSize}
	elseif mode == "TDM" and #queue >= 10 then
		return {mode = mode, players = takePlayers(queue, 10), teamSize = 5}
	elseif mode == "FFA" and #queue >= 8 then
		return {mode = mode, players = takePlayers(queue, 8), teamSize = 1}
	elseif mode == "1V1V1" and #queue >= 3 then
		return {mode = mode, players = takePlayers(queue, 3), teamSize = 1}
	elseif mode == "2V2V2" and #queue >= 6 then
		return {mode = mode, players = takePlayers(queue, 6), teamSize = 2}
	end
	return nil
end

function MatchmakingService:BuildTeams(match)
	local teamBuckets = {}
	local teamCount = math.max(2, math.floor(#match.players / match.teamSize))
	for i = 1, teamCount do
		teamBuckets[i] = {}
	end

	for index, entry in ipairs(match.players) do
		local bucket = ((index - 1) % teamCount) + 1
		table.insert(teamBuckets[bucket], entry.Player)
	end
	return teamBuckets
end

function MatchmakingService:RemovePlayer(player)
	for _, queue in pairs(self.queues) do
		for i = #queue, 1, -1 do
			if queue[i].Player == player then
				table.remove(queue, i)
			end
		end
	end
end

Players.PlayerRemoving:Connect(function(player)
	MatchmakingService:RemovePlayer(player)
end)

return MatchmakingService
