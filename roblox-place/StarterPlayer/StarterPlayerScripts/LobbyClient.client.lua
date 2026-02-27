local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ProximityPromptService = game:GetService("ProximityPromptService")

local player = Players.LocalPlayer
local remotes = ReplicatedStorage:WaitForChild("Remotes")
local queueEvent = remotes:WaitForChild("QueueRequest")
local matchStateEvent = remotes:WaitForChild("MatchState")

local duelSizeByPrompt = {
	Duel1v1 = 1,
	Duel2v2 = 2,
	Duel3v3 = 3,
	Duel4v4 = 4,
	Duel5v5 = 5,
}

ProximityPromptService.PromptTriggered:Connect(function(prompt, triggerPlayer)
	if triggerPlayer ~= player then
		return
	end
	local duelSize = duelSizeByPrompt[prompt.Name]
	if duelSize then
		queueEvent:FireServer({mode = "DUELS", teamSize = duelSize})
	end
end)

matchStateEvent.OnClientEvent:Connect(function(payload)
	if payload.kind == "MATCH_FOUND" then
		print("Match found:", payload.mode)
	elseif payload.kind == "PROFILE" then
		print("Keys:", payload.keys)
	end
end)

-- Hook this to a green Play button in StarterGui/MatchUI
local gui = player:WaitForChild("PlayerGui")
local matchGui = gui:FindFirstChild("MatchUI")
if matchGui and matchGui:FindFirstChild("PlayButton") then
	matchGui.PlayButton.MouseButton1Click:Connect(function()
		local modes = {"TDM", "FFA", "1V1V1", "2V2V2"}
		local randomMode = modes[math.random(1, #modes)]
		queueEvent:FireServer({mode = randomMode, teamSize = 1})
	end)
end
