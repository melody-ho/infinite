/// Imports ///
import { addTileData, nextTile } from "../model/board-data";
import {
  renderStaticNext,
  renderTile,
  renderTrackingNext,
} from "../view/render-tiles";
import generateNextTile from "./generate-next-tile";

/// Constants ///
/**
 * Transition duration for fading in new tile, in ms.
 */
const TILE_FADE_DURATION = 550;

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
  // update board data //
  const [filled, newAvailables] = addTileData(index, ...tile);

  // get board element //
  const board = document.querySelector(".board");

  // place new filled tile //
  // get elements
  const oldTile = document.querySelector(`[index="${filled}"]`);
  const newTile = renderTile(filled);
  // fade in new tile
  newTile.classList.add("fade-in");
  board.appendChild(newTile);
  // clean up DOM after transition
  setTimeout(() => {
    newTile.classList.remove("fade-in");
    if (oldTile) board.removeChild(oldTile);
  }, TILE_FADE_DURATION);

  // place new available tiles //
  for (let i = 0; i < newAvailables.length; i += 1) {
    // get element
    const newAvailable = renderTile(newAvailables[i]);
    // fade in new available tiles
    newAvailable.classList.add("fade-in");
    board.appendChild(newAvailable);
    // clean up DOM after transition
    setTimeout(() => {
      newAvailable.classList.remove("fade-in");
    }, TILE_FADE_DURATION);
  }

  // generate next tile and update next tile data //
  [nextTile.background, nextTile.foreground] = generateNextTile();

  // render next tile //
  // for devices with hover: next tile tracks cursor
  // get elements
  const prevTrackingNext = document.querySelector(".next-tile--tracking");
  const trackingNext = renderTrackingNext();
  // transition
  trackingNext.classList.add("fade-in");
  prevTrackingNext.after(trackingNext);
  // clean up DOM after transition
  setTimeout(() => {
    trackingNext.classList.remove("fade-in");
    prevTrackingNext.parentNode.removeChild(prevTrackingNext);
  }, TILE_FADE_DURATION);

  // for devices without hover: next tile is static
  // get elements
  const prevStaticNext = document.querySelector(".next-tile--static");
  const staticNext = renderStaticNext();
  // transition
  staticNext.classList.add("fade-in");
  prevStaticNext.after(staticNext);
  // clean up DOM after transition
  setTimeout(() => {
    staticNext.classList.remove("fade-in");
    prevStaticNext.parentNode.removeChild(prevStaticNext);
  }, TILE_FADE_DURATION);
};

export default placeTile;
