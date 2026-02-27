local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remotes = ReplicatedStorage:WaitForChild("Remotes")
local loadoutEvent = remotes:WaitForChild("LoadoutUpdate")
local shopEvent = remotes:WaitForChild("ShopRequest")

local screenGui = script.Parent

local selectedLoadout = {
	Primary = "AR_MK1",
	Secondary = "PST_9",
	Melee = "KNF_COMBAT",
	Utility = "GRN_HE",
}

if screenGui:FindFirstChild("SaveLoadoutButton") then
	screenGui.SaveLoadoutButton.MouseButton1Click:Connect(function()
		loadoutEvent:FireServer(selectedLoadout)
	end)
end

if screenGui:FindFirstChild("BuyWeaponButton") then
	screenGui.BuyWeaponButton.MouseButton1Click:Connect(function()
		shopEvent:FireServer({id = "AR_MK1", price = 300})
	end)
end
