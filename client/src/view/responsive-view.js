/// Imports ///
import clearBoardView from "./clear-board-view";
import renderBoard from "./render-board";
import { setViewCenter } from "../model/view-data";

/// Constants ///
/**
 * Size of tiles in pixels.
 */
// TO DO: make this dynamic when implementing zoom
const SIZE = 20;
/**
 * tile width  = SIZE * SIZE_FACTOR
 */
const SIZE_FACTOR = 4;

/// Private ///
/**
 * Gets absolute position of view center and updates view data.
 */
const getViewCenter = () => {
  const center = [];
  const board = document.querySelector(".board");

  center[0] = board.offsetWidth / 2 - (SIZE * SIZE_FACTOR) / 2;
  center[1] = board.offsetHeight / 2 - (SIZE * SIZE_FACTOR) / 2;

  setViewCenter(center);
};

/**
 * Changes view center and rerenders board.
 */
const handleResize = () => {
  getViewCenter();
  clearBoardView();
  renderBoard();
};

/// Public ///
/**
 * Initializes view data.
 */
const initializeView = () => {
  getViewCenter();
};

/**
 * Adds listener to update view when window is resized.
 */
const listenResize = () => {
  window.onresize = handleResize;
};

export { initializeView, listenResize };
