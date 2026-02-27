local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local player = Players.LocalPlayer
local camera = workspace.CurrentCamera
local remotes = ReplicatedStorage:WaitForChild("Remotes")
local combatEvent = remotes:WaitForChild("CombatRequest")

local firing = false
local canFire = true
local activeWeapon = "AR_MK1"

local function fireShot()
	if not canFire then
		return
	end
	canFire = false
	combatEvent:FireServer({
		type = "SHOT",
		weaponId = activeWeapon,
		origin = camera.CFrame.Position,
		direction = camera.CFrame.LookVector,
		timestamp = workspace:GetServerTimeNow(),
	})
	task.delay(0.09, function()
		canFire = true
	end)
end

UserInputService.InputBegan:Connect(function(input, gpe)
	if gpe then
		return
	end
	if input.UserInputType == Enum.UserInputType.MouseButton1 then
		firing = true
		fireShot()
	elseif input.KeyCode == Enum.KeyCode.G then
		combatEvent:FireServer({
			type = "GRENADE",
			origin = camera.CFrame.Position,
			velocity = camera.CFrame.LookVector * 90 + Vector3.new(0, 25, 0),
		})
	end
end)

UserInputService.InputEnded:Connect(function(input)
	if input.UserInputType == Enum.UserInputType.MouseButton1 then
		firing = false
	end
end)

RunService.RenderStepped:Connect(function()
	if firing then
		fireShot()
	end
end)
