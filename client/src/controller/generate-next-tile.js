/// Imports ///
import { boardData, availableIndexes } from "../model/board-data";
import getSurrounding from "../helpers/get-surrounding";

/// Constants ///
/**
 * String representation of blank edge type.
 */
const BLANK = "0";
/**
 * Probability of blank edge for randomly generated edges.
 */
const BLANK_PROBABILITY = 4;
/**
 * Maximum times a foreground can be rotated by 60 degrees before repeating.
 * ((360 / 60) - 1)
 */
const MAX_ROTATES = 5;
/**
 * Potential backgrounds.
 */
const POTENTIAL_BACKGROUNDS = ["light", "medium", "dark"];
/**
 * String representation of star edge type.
 */
const STAR = "1";
/**
 * Probability of star edge for randomly generated edges.
 */
const STAR_PROBABILITY = 4;
/**
 * String representation of stripe edge type.
 */
const STRIPE = "2";
/**
 * Probability of stripe edge for randomly generated edges.
 */
const STRIPE_PROBABILITY = 2;

/**
 * @typedef {string} foregroundHash Tile edge types from top going clockwise, represented as a string of six numeric characters.
 * @typedef {"light" | "medium" | "dark"} backgroundHash String representing background of tile.
 */

/// Private ///
/**
 * Converts foreground hash to array of edge types.
 * @param {foregroundHash} foregroundHash String representing tile foreground.
 * @returns {[]} Foreground edge types from top going clockwise, each represented as a numeric character.
 */
const convertForeground = (foregroundHash) => foregroundHash.split("");

/**
 * Returns random element in an array.
 * @param {[]} arr
 */
const getRandomInArray = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

/**
 * Rotates foreground.
 * @param {[]} foregroundArr Array of edge types for foreground to be rotated, from top going clockwise.
 * @param {number} rotation Number of times to rotate by 60 degrees clockwise.
 * @returns {[]} Array of edge types for foreground after rotation, from top going clockwise.
 */
const rotateForeground = (foregroundArr, rotations) => {
  const newForeground = [];

  for (let i = 0; i < foregroundArr.length; i += 1) {
    const newIndex = (i + rotations) % 6;
    newForeground[newIndex] = foregroundArr[i];
  }

  return newForeground;
};

/**
 * Generates a random tile edge type.
 * @returns {"0" | "1" | "2"} One of three types of tile edges, represented as a numeric character.
 */
const generateRandomEdge = () => {
  const totalProbability =
    BLANK_PROBABILITY + STAR_PROBABILITY + STRIPE_PROBABILITY;

  const randomInt = Math.floor(Math.random() * totalProbability);
  if (randomInt < BLANK_PROBABILITY) {
    return BLANK;
  }
  if (randomInt < BLANK_PROBABILITY + STAR_PROBABILITY) {
    return STAR;
  }
  return STRIPE;
};

/// Public ///
/**
 * Generates a tile that is valid for at least one of the current available indexes.
 * @returns {[backgroundHash, foregroundHash]} Two-element array representing generated tile.
 */
const generateNextTile = () => {
  // randomly choose an available index to match //
  const potentialIndexes = Array.from(availableIndexes);
  const index = getRandomInArray(potentialIndexes);

  // generate foreground //
  /**
   * Tile edges from top going clockwise.
   * Edge types are represented as numeric characters.
   * null indicates not yet generated.
   */
  const edges = new Array(6).fill(null);
  /**
   * Array of tile edges that do not have adjacent tiles.
   */
  const noAdjacents = [];
  /**
   * Number of stripe edges so far.
   */
  let stripes = 0;

  // fill in edges
  const surrounding = getSurrounding(index);
  for (let i = 0; i < surrounding.length; i += 1) {
    const tileData = boardData[surrounding[i]];
    const complementary = (i + 3) % 6;

    if (tileData !== undefined && tileData.status !== "available") {
      // current edge has adjacent tile
      const type = convertForeground(tileData.foreground)[complementary];
      edges[i] = type;
      if (type === STRIPE) stripes += 1;
    } else {
      // current edge has no adjacent tile
      noAdjacents.push(i);
      edges[i] = generateRandomEdge();
      if (edges[i] === STRIPE) stripes += 1;
    }
  }

  // ensure there isn't only one stripe edge
  if (stripes === 1) {
    // make a random non-stripe edge with no adjacent tiles a stripe edge
    let randomNoAdjacent;
    do {
      randomNoAdjacent = getRandomInArray(noAdjacents);
    } while (edges[randomNoAdjacent] === STRIPE);
    edges[randomNoAdjacent] = STRIPE;
  }

  // randomly rotate foreground //
  const rotations = Math.floor(Math.random() * (MAX_ROTATES + 1));
  const foreground = rotateForeground(edges, rotations);
  const foregroundHash = foreground.join("");

  // randomly generate background //
  const potentialBackgrounds = POTENTIAL_BACKGROUNDS;
  const backgroundHash = getRandomInArray(potentialBackgrounds);

  return [backgroundHash, foregroundHash];
};

export default generateNextTile;
