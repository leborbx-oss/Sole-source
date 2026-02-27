local GameConfig = {
	RoundWinTarget = 5,
	RoundTime = 90,
	BuyPhaseTime = 10,
	TDMTime = 360,
	KeysPerKill = 10,
	KeysPerWin = 40,
	HeadshotMultiplier = 2,
	BodyMultiplier = 1,
	DefaultLoadout = {
		Primary = "AR_MK1",
		Secondary = "PST_9",
		Melee = "KNF_COMBAT",
		Utility = "GRN_HE",
	},
	QueueSizes = {1, 2, 3, 4, 5},
	Gamemodes = {
		"DUELS",
		"TDM",
		"FFA",
		"1V1V1",
		"2V2V2",
	},
}

return GameConfig
