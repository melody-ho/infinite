/// Imports ///
import { addTileData } from "../model/board-data";
import { renderTile } from "../view/render-tiles";

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
  const [filled, newAvailables] = addTileData(index, ...tile);

  const board = document.querySelector(".board");

  // place new filled tile //
  const oldTile = document.querySelector(`[index="${filled}"]`);
  const newTile = renderTile(filled, CENTER_INDEX, CENTER_POSITION, SIZE);
  if (oldTile !== null) {
    // replace previous available tile
    oldTile.parentNode.replaceChild(newTile, oldTile);
  }
  // first filled tile is placed on empty board
  board.appendChild(newTile);

  // place new available tiles //
  for (let i = 0; i < newAvailables.length; i += 1) {
    const newAvailable = renderTile(
      newAvailables[i],
      CENTER_INDEX,
      CENTER_POSITION,
      SIZE,
    );
    board.appendChild(newAvailable);
  }
};

export default placeTile;
