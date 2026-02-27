local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local remotes = ReplicatedStorage:WaitForChild("Remotes")
local matchStateEvent = remotes:WaitForChild("MatchState")
local killFeedEvent = remotes:WaitForChild("KillFeed")
local snapshotFn = remotes:WaitForChild("GetSnapshot")

local screenGui = script.Parent
local roundLabel = screenGui:WaitForChild("RoundLabel")
local keysLabel = screenGui:WaitForChild("KeysLabel")
local killFeedLabel = screenGui:WaitForChild("KillFeedLabel")

local snapshot = snapshotFn:InvokeServer()
keysLabel.Text = "Keys: " .. tostring(snapshot.keys)

matchStateEvent.OnClientEvent:Connect(function(payload)
	if payload.kind == "PROFILE" then
		keysLabel.Text = "Keys: " .. tostring(payload.keys)
	elseif payload.kind == "MATCH_FOUND" then
		roundLabel.Text = payload.mode .. " queued..."
	elseif payload.kind == "ROUND" then
		roundLabel.Text = string.format("Round %d | %d - %d", payload.round, payload.scoreA, payload.scoreB)
	elseif payload.kind == "WIN" then
		roundLabel.Text = payload.winner .. " wins!"
	end
end)

killFeedEvent.OnClientEvent:Connect(function(payload)
	killFeedLabel.Text = string.format("%s [%s] %s", payload.killer, payload.weapon, payload.victim)
	task.delay(2, function()
		if killFeedLabel.Text:find(payload.victim) then
			killFeedLabel.Text = ""
		end
	end)
end)
