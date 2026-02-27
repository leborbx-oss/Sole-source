local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remotesFolder = ReplicatedStorage:FindFirstChild("Remotes") or Instance.new("Folder")
remotesFolder.Name = "Remotes"
remotesFolder.Parent = ReplicatedStorage

local function ensureRemote(className, name)
	local remote = remotesFolder:FindFirstChild(name)
	if remote then
		return remote
	end
	remote = Instance.new(className)
	remote.Name = name
	remote.Parent = remotesFolder
	return remote
end

ensureRemote("RemoteEvent", "MatchState")
ensureRemote("RemoteEvent", "CombatRequest")
ensureRemote("RemoteEvent", "KillFeed")
ensureRemote("RemoteEvent", "LoadoutUpdate")
ensureRemote("RemoteEvent", "QueueRequest")
ensureRemote("RemoteEvent", "ShopRequest")
ensureRemote("RemoteFunction", "GetSnapshot")
