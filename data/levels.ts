import { TileType } from './App'; // Assuming App.tsx or similar exports TileType

export const levels: TileType[][][] = [
  // Level 1 (New Hard Set): The Controlled Burn
  // Must use the first sun to pass the snow, then find another snow.
  [
    ["wall", "player", "sun", "wall", "wall", "wall"],
    ["wall", "sun", "sun", "wall", "snow", "wall"],
    ["wall", "snow", "empty", "sun", "sun", "home"],
    ["wall", "wall", "wall", "wall", "empty", "wall"],
    ["wall", "sun", "empty", "empty", "sun", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall"]
    // Hint: Get hot (stage 1), cool to player (stage 0), then navigate carefully.
  ],

  // Level 2: The Ice Bridge
  // Player must become cold to pass a sun trap, then find a way to re-warm slightly for home.
  [
    ["player", "snow", "empty", "wall", "wall", "wall"],
    ["wall", "wall", "sun", "sun", "sun", "wall"],
    ["empty", "empty", "empty", "wall", "empty", "home"],
    ["wall", "snow", "snow", "wall", "empty", "wall"],
    ["sun", "empty", "empty", "empty", "sun", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall"]
    // Hint: Get cold (stage -1 from player, assuming player is 0), pass suns, then use a far sun.
  ],

  // Level 3: The Thermostat Maze
  // Requires multiple precise temperature adjustments.
  [
    ["player", "empty", "sun", "sun", "sun", "wall"],
    ["wall", "wall", "wall", "empty", "wall", "wall"],
    ["snow", "empty", "empty", "snow", "empty", "wall"],
    ["wall", "wall", "snow", "wall", "empty", "home"],
    ["sun", "empty", "snow", "empty", "sun", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall"]
    // Hint: Path involves multiple changes. (e.g. +1, -1, +1, -1)
  ],

  // Level 4: One-Tile Tolerance
  // Player often must be at the exact right temperature to pass certain points.
  // One wrong step near a sun/snow could be fatal for the sequence.
  [
    ["wall", "wall", "wall", "player", "wall", "wall"],
    ["wall", "sun", "empty", "empty", "sun", "wall"],
    ["home", "empty", "wall", "wall", "empty", "snow"],
    ["wall", "snow", "empty", "empty", "sun", "wall"],
    ["wall", "wall", "wall", "sun", "wall", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "wall"]
    // Hint: Requires being exactly player stage (not hot, not cold) for some empty tiles between suns.
  ],

  // Level 5: The Long Haul
  // A long path with sparse temperature changers, demanding conservation.
  [
    ["player", "empty", "empty", "empty", "wall", "sun"],
    ["wall", "wall", "wall", "empty", "wall", "empty"],
    ["snow", "empty", "empty", "empty", "empty", "empty"],
    ["wall", "wall", "wall", "wall", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "sun", "wall", "home", "wall"]
    // Hint: Careful use of the initial snow, then a long trek. The suns are mostly traps or for very specific use.
  ],

  // Level 6: Sunken Path
  // Player is surrounded by suns and must find a very specific route using limited snow.
  [
    ["wall", "sun", "sun", "sun", "sun", "wall"],
    ["wall", "sun", "player", "empty", "sun", "wall"],
    ["wall", "snow", "wall", "empty", "snow", "wall"],
    ["wall", "sun", "empty", "empty", "sun", "wall"],
    ["wall", "sun", "sun", "home", "sun", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall"]
    // Hint: The snow tiles are crucial. Player might need to take 1-2 heat ticks.
  ],

  // Level 7: The Choice Paradox
  // Apparent choices lead to failure, the correct path is counter-intuitive.
  [
    ["player", "empty", "wall", "sun", "empty", "home"],
    ["empty", "wall", "wall", "empty", "wall", "empty"],
    ["sun", "empty", "snow", "empty", "sun", "empty"],
    ["wall", "empty", "wall", "empty", "wall", "empty"],
    ["snow", "empty", "sun", "empty", "snow", "empty"],
    ["wall", "wall", "wall", "wall", "wall", "wall"]
    // Hint: The direct-looking paths are usually traps. Look for ways to use snow to negate suns passed earlier.
  ],

  // Level 8: Precision Engineering
  // Every single move and temperature change needs to be calculated.
  [
    ["wall", "player", "sun", "empty", "snow", "wall"],
    ["wall", "wall", "empty", "wall", "empty", "wall"],
    ["sun", "empty", "empty", "empty", "sun", "home"],
    ["wall", "snow", "wall", "wall", "empty", "wall"],
    ["wall", "empty", "sun", "snow", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall"]
    // Hint: You might need to be at ice-melt-2 to pass a sun tile and then immediately hit a snow tile.
  ],

  // Level 9: The Gauntlet Redux
  // A long corridor forcing alternating states, but with less room for error.
  [
    ["player", "sun", "empty", "snow", "empty", "sun"],
    ["wall", "wall", "wall", "wall", "wall", "empty"],
    ["empty", "snow", "empty", "sun", "empty", "snow"],
    ["empty", "wall", "wall", "wall", "wall", "wall"],
    ["sun", "empty", "snow", "empty", "sun", "empty"],
    ["wall", "wall", "wall", "wall", "wall", "home"]
    // Hint: The path to home is long and requires using almost every temperature changer optimally.
  ],

  // Level 10: The Master Theorem
  // Combines all difficult elements: long paths, precise control, misdirection, scarcity.
  [
    ["player", "empty", "wall", "sun", "wall", "snow"],
    ["sun", "empty", "empty", "empty", "empty", "empty"],
    ["wall", "wall", "snow", "wall", "sun", "wall"],
    ["empty", "empty", "empty", "empty", "empty", "home"],
    ["snow", "wall", "sun", "empty", "wall", "sun"],
    ["wall", "wall", "wall", "wall", "empty", "wall"]
    // Hint: Expect to map this one out. The 'home' seems close but reaching it requires a journey.
  ]
];