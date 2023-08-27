/// Imports ///
import { boardData } from "../model/board-data";
import getSurrounding from "../helpers/get-surrounding";

/// Private ///
/**
 * Converts foreground hash to array of edge types.
 * @param {foregroundHash} foregroundHash String representing tile foreground.
 * @returns {[]} Foreground edge types from top going clockwise, each represented as a numeric character.
 */
const convertForeground = (foregroundHash) => foregroundHash.split("");

/// Public ///
/**
 * Evaluates whether a tile placement is valid.
 * @param {string} foregroundHash Edge types for the attempted tile from top going clockwise, represented as a string of six numeric characters.
 * @param {string} index Index of attempted placement position on the gameboard, represented as "x,y".
 * @returns {boolean} Returns true if valid placement and false if invalid placement.
 */
const validatePlace = (foregroundHash, index) => {
  // get own edge types from top going clockwise
  const edgeTypes = convertForeground(foregroundHash);

  // get surrounding indexes
  const surrounding = getSurrounding(index);

  // check each edge for adjacent tiles
  for (let i = 0; i < surrounding.length; i += 1) {
    const tileData = boardData[surrounding[i]];
    const complementary = (i + 3) % 6;
    if (tileData !== undefined && tileData.status !== "available") {
      // current edge has adjacent tile
      const adjacent = convertForeground(tileData.foreground)[complementary];
      if (edgeTypes[i] !== adjacent) {
        // adjacent edge doesn't match
        return false;
      }
    }
  }
  // no mismatches
  return true;
};

export default validatePlace;
