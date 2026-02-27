# RIVALS-Style Roblox Place (ZIP-Ready Source)

This folder is a **Roblox Studio source layout** you can import/build into a playable FPS duels experience inspired by **RIVALS**.

## Folder Structure

```text
roblox-place/
  default.project.json                         # Optional Rojo mapping
  ReplicatedStorage/
    Configs/
      GameConfig.lua
      WeaponDefs.lua
    Remotes/                                   # Auto-created by Bootstrap.server.lua
    Modules/
  ServerScriptService/
    Bootstrap.server.lua                       # Creates remotes
    GameServer.server.lua                      # Main orchestrator
    Modules/
      DataService.lua                          # DataStore + keys/loadouts
      MatchmakingService.lua                   # Queue simulation + team building
      RoundService.lua                         # Round lifecycle (first to 5)
      CombatService.lua                        # Server-authoritative raycast damage
  ServerStorage/
    Maps/                                      # Put map models here (Warehouse/Rooftop)
    Weapons/                                   # Put free model gun tools here
    Cosmetics/                                 # Put hats/skins here
  StarterPlayer/
    StarterPlayerScripts/
      FPSController.client.lua                 # First person lock, jump/slide controls
      CombatClient.client.lua                  # Sends shot/grenade requests
      LobbyClient.client.lua                   # Duel pads + Play button queue
  StarterGui/
    MatchUI/
      MatchHud.client.lua                      # Round + kill feed + keys UI updates
      LoadoutShop.client.lua                   # Loadout + shop actions
```

## Implemented Core Loop

- **Lobby flow**
  - Duel hallway supports 1v1 to 5v5 using ProximityPrompt names `Duel1v1` ... `Duel5v5`.
  - Green Play button queues random public mode (`TDM`, `FFA`, `1V1V1`, `2V2V2`).
  - Lobby loadout/shop hooks via remote events.

- **Match simulation**
  - Queue service builds balanced teams.
  - Round service handles first-to-5 rounds and arena spawning.
  - Supports mode expansion: Duels (no-respawn by design), TDM/FFA style queue sizes.

- **FPS gunplay foundation**
  - First-person lock and sprint-slide feel.
  - Client sends shot requests; server raycasts and applies validated damage.
  - Headshot/body multipliers in config.
  - Grenade throw + timed explosion.

- **Economy + persistence**
  - Keys currency in DataStore (`RivalsV1`).
  - Keys awarded for kills.
  - Saved: Keys, owned weapons/cosmetics, selected loadout, stats.

- **Cross-platform baseline**
  - Client scripts run on both mobile and PC; add touch buttons in MatchUI for mobile-specific firing/slide if desired.

## Required Roblox Studio Setup

1. Create a new **Place** in Roblox Studio.
2. Recreate this hierarchy in Explorer:
   - `ReplicatedStorage`, `ServerScriptService`, `ServerStorage`, `StarterPlayer`, `StarterGui`.
3. Copy each Lua file from this folder into matching Roblox instances.
4. In `ServerStorage/Maps`, add free models (Toolbox) for:
   - `Warehouse` (Model)
   - `Rooftop` (Model)
   - Each map should contain `Spawns` folder with parts named `1`, `2`, `3` (as needed).
5. Build lobby:
   - Spawn area, shooting range, leaderboard boards, shop NPC/button zones.
   - Add ProximityPrompts named `Duel1v1` ... `Duel5v5` to duel pads.
6. Create `StarterGui > ScreenGui` named `MatchUI` with UI elements:
   - `PlayButton` (green)
   - `RoundLabel`, `KeysLabel`, `KillFeedLabel`
   - optional `SaveLoadoutButton`, `BuyWeaponButton`
7. Enable Studio settings:
   - **Game Settings > Security > Enable Studio Access to API Services** (for DataStore testing)
8. Play test with 2+ players (`Test > Start`) and validate queue/match flow.
9. Publish (`File > Publish to Roblox`) and iterate balancing values in:
   - `ReplicatedStorage/Configs/GameConfig.lua`
   - `ReplicatedStorage/Configs/WeaponDefs.lua`

## Free Model / Asset Notes

- Use free Toolbox assets for maps, weapon meshes, and cosmetic hats.
- Keep scripts **server-authoritative**:
  - Never trust client damage numbers.
  - Validate weapon IDs and ray directions on server (already structured this way).
- Suggested SFX placeholders:
  - Gunshot, reload, footsteps, explosion IDs from Roblox Creator Hub audio library.

## Balancing Defaults

- Round win target: `5`
- Kill reward: `+10 Keys`
- AR damage: `24` (2x headshot)
- Pistol damage: `20`
- Grenade radius: `18`

## Recommended Next Improvements

- Replace random round winner logic with alive-player tracking.
- Add explicit respawn manager for TDM vs no-respawn duels.
- Add anti-speedhack checks (distance moved per tick server-side).
- Add proper recoil, spread bloom, tracers, and hit markers.
- Add matchmaking rating (MMR) and region buckets.

---

This is intentionally optimized for a **working core gameplay loop first** (queue -> round -> fight -> rewards) so you can rapidly tune toward the smooth “CS:GO meets Roblox” dueling feel.
