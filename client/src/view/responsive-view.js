/// Imports ///
import { tiles, view } from "../model/view-data";
import { adjustZoom } from "./zoom";
import clearBoardView from "./clear-board-view";
import renderBoard from "./render-board";
import { updatePan } from "./pan";

/// Constants ///
/**
 * Minimum size of tiles at default.
 */
const MIN_DEFAULT_SIZE = 20;
/**
 * Minimum number of tiles on shorter dimension at default.
 */
const MIN_DEFAULT_TILES = 8;

/// Private ///
/**
 * Initialize default tile size.
 */
const initializeTileSize = () => {
  // set default tile size in view data
  tiles.size = Math.max(
    Math.min(view.width, view.height) / MIN_DEFAULT_TILES / tiles.sizeFactor,
    MIN_DEFAULT_SIZE,
  );

  // update tile width in CSS
  const nextInterface = document.querySelector(
    ".no-hover .next-tile-interface",
  );
  nextInterface.style.setProperty("--tile-width", `${tiles.width}px`);
};

/**
 * Updates view size in view data.
 */
const updateViewData = () => {
  const viewBox = document.querySelector(".view-box");
  view.width = viewBox.offsetWidth;
  view.height = viewBox.offsetHeight;
};

/**
 * Updates view data and rerenders board.
 */
const handleResize = () => {
  updateViewData();
  adjustZoom();
  updatePan();
  clearBoardView();
  renderBoard();
};

/// Public ///
/**
 * Initializes view data.
 */
const initializeView = () => {
  updateViewData();
  initializeTileSize();
};

/**
 * Adds listener to update view when window is resized.
 */
const listenResize = () => {
  window.onresize = handleResize;
};

export { initializeView, listenResize };
