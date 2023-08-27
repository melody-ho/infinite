/// Imports ///
import { addTileData } from "../model/board-data";
import renderTile from "../view/render-tile";

/// Constants ///
// TO DO: make these dynamic when implementing drag and zoom //
const CENTER_INDEX = "0,0";
const CENTER_POSITION = [750, 500];
const SIZE = 20;

/**
 * @typedef {string} foregroundHash Tile edge types from top going clockwise, represented as a string of six numbers.
 * @typedef {"light" | "medium" | "dark"} backgroundHash String representing background of tile.
 */

/// Public ///
/**
 * Places tile.
 * @param {string} index Gameboard index to place tile at.
 * @param {[backgroundHash, foregroundHash]} tile Two-element array representing tile to place.
 */
const placeTile = (index, tile) => {
  const listOfUpdated = addTileData(index, ...tile);

  const board = document.querySelector(".board");
  for (let i = 0; i < listOfUpdated.length; i += 1) {
    const oldTile = document.querySelector(`[index="${listOfUpdated[i]}"]`);
    const newTile = renderTile(
      listOfUpdated[i],
      CENTER_INDEX,
      CENTER_POSITION,
      SIZE,
    );
    if (oldTile !== null) {
      // replace previous avaiable tile
      oldTile.parentNode.replaceChild(newTile, oldTile);
    } else {
      // add new available tile
      board.appendChild(newTile);
    }
  }
};

export default placeTile;
