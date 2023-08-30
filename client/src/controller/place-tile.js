/// Imports ///
import { addTileData, updateNextTile } from "../model/board-data";
import generateNextTile from "./generate-next-tile";
import { renderNextTile, renderTile } from "../view/render-tiles";
import { viewCenter } from "../model/view-data";

/// Constants ///
/**
 * Index of tile at view center.
 * @type {string} "x,y"
 */
const CENTER_INDEX = "0,0";

/**
 * @typedef {string} foregroundHash Tile edge types from top going clockwise, represented as a string of six numbers.
 * @typedef {"light" | "medium" | "dark"} backgroundHash String representing background of tile.
 */

/// Public ///
/**
 * Places tile and proceeds to next move.
 * @param {string} index Gameboard index to place tile at.
 * @param {[backgroundHash, foregroundHash]} tile Two-element array representing tile to place.
 */
const placeTile = (index, tile) => {
  const [filled, newAvailables] = addTileData(index, ...tile);

  const board = document.querySelector(".board");

  // place new filled tile //
  const oldTile = document.querySelector(`[index="${filled}"]`);
  const newTile = renderTile(filled, CENTER_INDEX, viewCenter);
  if (oldTile !== null) {
    // replace previous available tile
    oldTile.parentNode.replaceChild(newTile, oldTile);
  }
  // first filled tile is placed on empty board
  board.appendChild(newTile);

  // place new available tiles //
  for (let i = 0; i < newAvailables.length; i += 1) {
    const newAvailable = renderTile(newAvailables[i], CENTER_INDEX, viewCenter);
    board.appendChild(newAvailable);
  }

  // proceed to next move //
  // generate next tile
  updateNextTile(generateNextTile());
  // remove previous if present
  const previous = document.querySelector(".next-tile");
  if (previous !== null) {
    previous.remove();
  }
  // render and append next tile
  const nextTile = renderNextTile();
  board.appendChild(nextTile);
};

export default placeTile;
