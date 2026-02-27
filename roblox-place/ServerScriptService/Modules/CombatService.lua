local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local WeaponDefs = require(ReplicatedStorage.Configs.WeaponDefs)
local GameConfig = require(ReplicatedStorage.Configs.GameConfig)

local CombatService = {}
CombatService.playerState = {}

local function isHeadshot(hitPart)
	if not hitPart then
		return false
	end
	return hitPart.Name == "Head"
end

local function getHumanoidFromPart(part)
	if not part then
		return nil
	end
	local model = part:FindFirstAncestorOfClass("Model")
	if not model then
		return nil
	end
	return model:FindFirstChildOfClass("Humanoid")
end

function CombatService:ValidateAndApplyShot(shooter, payload)
	local weapon = WeaponDefs[payload.weaponId]
	if not weapon then
		return nil
	end

	local origin = payload.origin
	local direction = payload.direction.Unit * weapon.Range
	local rayParams = RaycastParams.new()
	rayParams.FilterType = Enum.RaycastFilterType.Exclude
	rayParams.FilterDescendantsInstances = {shooter.Character}
	local result = workspace:Raycast(origin, direction, rayParams)

	if not result then
		return nil
	end

	local humanoid = getHumanoidFromPart(result.Instance)
	if not humanoid then
		return nil
	end

	local targetPlayer = Players:GetPlayerFromCharacter(humanoid.Parent)
	if not targetPlayer or targetPlayer == shooter then
		return nil
	end

	local baseDamage = weapon.Damage
	local multiplier = isHeadshot(result.Instance) and (weapon.HeadshotMultiplier or GameConfig.HeadshotMultiplier) or GameConfig.BodyMultiplier
	local damage = math.floor(baseDamage * multiplier)
	humanoid:TakeDamage(damage)

	return {
		target = targetPlayer,
		damage = damage,
		headshot = isHeadshot(result.Instance),
		weapon = payload.weaponId,
	}
end

function CombatService:ThrowGrenade(player, payload)
	local grenade = Instance.new("Part")
	grenade.Shape = Enum.PartType.Ball
	grenade.Size = Vector3.new(1, 1, 1)
	grenade.Position = payload.origin
	grenade.Name = "LiveGrenade"
	grenade.Parent = workspace
	grenade.CanCollide = true
	grenade.AssemblyLinearVelocity = payload.velocity

	task.delay(2.5, function()
		if not grenade.Parent then
			return
		end
		local explosion = Instance.new("Explosion")
		explosion.Position = grenade.Position
		explosion.BlastRadius = 18
		explosion.BlastPressure = 0
		explosion.Parent = workspace
		grenade:Destroy()
	end)
end

return CombatService
