local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")

local player = Players.LocalPlayer
local camera = workspace.CurrentCamera

local sliding = false
local slideVelocity = 0

local function setupCharacter(character)
	local humanoid = character:WaitForChild("Humanoid")
	humanoid.AutoRotate = true
	player.CameraMode = Enum.CameraMode.LockFirstPerson

	UserInputService.InputBegan:Connect(function(input, gpe)
		if gpe then
			return
		end
		if input.KeyCode == Enum.KeyCode.LeftControl and humanoid.MoveDirection.Magnitude > 0 then
			sliding = true
			slideVelocity = 70
			humanoid.HipHeight = 1
		elseif input.KeyCode == Enum.KeyCode.Space and humanoid.FloorMaterial ~= Enum.Material.Air then
			humanoid.JumpPower = 70
		end
	end)

	UserInputService.InputEnded:Connect(function(input)
		if input.KeyCode == Enum.KeyCode.LeftControl then
			sliding = false
			humanoid.HipHeight = 2
		end
	end)

	RunService.RenderStepped:Connect(function(dt)
		if sliding and humanoid.RootPart then
			slideVelocity = math.max(0, slideVelocity - (40 * dt))
			humanoid.RootPart.AssemblyLinearVelocity = humanoid.RootPart.CFrame.LookVector * slideVelocity
		end
	end)
end

if player.Character then
	setupCharacter(player.Character)
end
player.CharacterAdded:Connect(setupCharacter)

camera:GetPropertyChangedSignal("FieldOfView"):Connect(function()
	if camera.FieldOfView < 75 then
		camera.FieldOfView = 75
	end
end)
