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
 * Updates the gameboard, given a new tile to place.
 * @param {tileIndex} index Index to place new tile at.
 * @param {"light" | "medium" | "dark"} background Background of tile to place.
 * @param {foregroundHash} foreground Foreground of tile to place.
 * @returns {tileIndex[]} Array of indexes representing positions that were updated.
 */
const addTileData = (index, background, foreground) => {
  boardData[index] = {
    status: "filled",
    background,
    foreground,
  };
  const newAvailable = addNewAvailable(index);
  return [index, ...newAvailable];
};

export { boardData, addTileData };
