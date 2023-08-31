/// Imports ///
import clearBoardView from "./clear-board-view";
import renderBoard from "./render-board";
import { view } from "../model/view-data";

/// Private ///
/**
 * Updates view center and view size in view data.
 */
const updateViewData = () => {
  const board = document.querySelector(".board");
  view.width = board.offsetWidth;
  view.height = board.offsetHeight;
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
