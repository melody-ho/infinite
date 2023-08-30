/// Imports ///
import clearBoardView from "./clear-board-view";
import renderBoard from "./render-board";
import { setViewCenter, setViewSize, tileSize } from "../model/view-data";

/// Constants ///
/**
 * tile width  = SIZE * SIZE_FACTOR
 */
const SIZE_FACTOR = 4;

/// Private ///
/**
 * Updates view center and view size in view data.
 */
const updateViewData = () => {
  const size = tileSize.get;
  const center = [];
  const board = document.querySelector(".board");

  const viewWidth = board.offsetWidth;
  const viewHeight = board.offsetHeight;
  center[0] = viewWidth / 2 - (size * SIZE_FACTOR) / 2;
  center[1] = viewHeight / 2 - (size * SIZE_FACTOR) / 2;

  setViewSize([viewWidth, viewHeight]);
  setViewCenter(center);
};

/**
 * Updates view data and rerenders board.
 */
const handleResize = () => {
  updateViewData();
  clearBoardView();
  renderBoard();
};

/// Public ///
/**
 * Initializes view data.
 */
const initializeView = () => {
  updateViewData();
};

/**
 * Adds listener to update view when window is resized.
 */
const listenResize = () => {
  window.onresize = handleResize;
};

export { initializeView, listenResize };
