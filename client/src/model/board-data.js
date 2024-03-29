/// Imports ///
import getSurrounding from "../helpers/get-surrounding";

/**
 * @typedef {string} boardIndex Index of a specific position on the gameboard, represented as "x,y".
 * @typedef {string} foregroundHash Tile edge types from top going clockwise, represented as a string of six numbers.
 */

/// Private ///
/**
 * Add newly available positions to the gameboard.
 * @param {tileIndex} centerIndex Index of tile placed.
 * @returns {tileIndex[]} Array of indexes representing newly available positions.
 */
const addNewAvailable = (centerIndex) => {
  const surrounding = getSurrounding(centerIndex);
  const added = [];
  surrounding.forEach((index) => {
    if (boardData[index] === undefined) {
      boardData[index] = {
        status: "available",
        background: null,
        foreground: null,
      };
      added.push(index);
    }
  });
  return added;
};

/// Public ///
/**
 * Object representing the current gameboard.
 * @type {{ tileIndex: {
 *    status: "filled" | "available",
 *    background: ?"light" | "medium" | "dark",
 *    foreground: ?foregroundHash }
 * }}
 */
const boardData = {};

/**
 * Set containing indexes of available positions.
 * @type {Set}
 */
const availableIndexes = new Set();

/**
 * Object containing next tile and its getters and setters.
 * @type {Object}
 */
const nextTile = {
  /**
   * Next tile to be placed.
   * @type {[("light" | "medium" | "dark"), foregroundHash]}
   */
  tile: [],
  /**
   * Get background of next tile.
   */
  get background() {
    return this.tile[0];
  },
  /**
   * Set background of next tile.
   * @param {"light" | "medium" | "dark"} background Background of next tile.
   */
  set background(background) {
    this.tile[0] = background;
  },
  /**
   * Get foreground of next tile.
   */
  get foreground() {
    return this.tile[1];
  },
  /**
   * Set foreground of next tile.
   * @param {foregroundHash} foreground Foreground of next tile.
   */
  set foreground(foreground) {
    this.tile[1] = foreground;
  },
};

/**
 * Updates the gameboard, given a new tile to place.
 * @param {tileIndex} index Index to place new tile at.
 * @param {"light" | "medium" | "dark"} background Background of tile to place.
 * @param {foregroundHash} foreground Foreground of tile to place.
 * @returns {tileIndex[]} Two-element array. First element is the index filled. Second element is an array of new available indexes.
 */
const addTileData = (index, background, foreground) => {
  // add tile data to board
  boardData[index] = {
    status: "filled",
    background,
    foreground,
  };

  // update available positions
  availableIndexes.delete(index);
  const newAvailables = addNewAvailable(index);
  newAvailables.forEach((newAvailable) => {
    availableIndexes.add(newAvailable);
  });

  return [index, [...newAvailables]];
};

export { addTileData, availableIndexes, boardData, nextTile };
