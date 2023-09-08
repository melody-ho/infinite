/// Imports ///
import { addTileData, nextTile } from "../model/board-data";
import {
  renderStaticNext,
  renderTile,
  renderTrackingNext,
} from "../view/render-tiles";
import generateNextTile from "./generate-next-tile";

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
  const newTile = renderTile(filled);
  if (oldTile !== null) {
    // replace previous available tile
    oldTile.parentNode.replaceChild(newTile, oldTile);
  }
  // first filled tile is placed on empty board
  board.appendChild(newTile);

  // place new available tiles //
  for (let i = 0; i < newAvailables.length; i += 1) {
    const newAvailable = renderTile(newAvailables[i]);
    board.appendChild(newAvailable);
  }

  // proceed to next move //
  // generate next tile
  [nextTile.background, nextTile.foreground] = generateNextTile();
  // render next tile
  // for devices with hover: next tile tracks cursor
  const prevTracking = document.querySelector(".next-tile--tracking");
  const trackingNext = renderTrackingNext();
  prevTracking.replaceWith(trackingNext);
  // for devices without hover: next tile is static
  const prevStaticNext = document.querySelector(".next-tile--static");
  const staticNext = renderStaticNext();
  prevStaticNext.replaceWith(staticNext);
};

export default placeTile;
