/// Imports ///
import { boardData } from "../model/board-data";
import convertForeground from "../utils/convert-foreground";
import getSurrounding from "../helpers/get-surrounding";

/// Public ///
/**
 * Evaluates whether a tile placement is valid.
 * @param {string} index Index of attempted placement position on the gameboard, represented as "x,y".
 * @param {string} foregroundHash Edge types for the attempted tile from top going clockwise, represented as a string of six numeric characters.
 * @returns {boolean} Returns true if valid placement and false if invalid placement.
 */
const validatePlace = (index, foregroundHash) => {
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
