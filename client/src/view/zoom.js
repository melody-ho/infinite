/// Imports ///
import clearBoardView from "./clear-board-view";
import renderBoard from "./render-board";
import { tileSize } from "../model/view-data";

/// Constants ///
/**
 * Minimum size of tiles at default.
 */
const MIN_DEFAULT_SIZE = 20;
/**
 * Minimum number of tiles on shorter dimension at default.
 */
const MIN_DEFAULT_TILES = 8;
/**
 * Minimum number of tiles on shorter dimension with zoom.
 */
const MIN_ZOOM_TILES = 2;
/**
 * Amount to increment size by when zooming in.
 */
const ZOOM_FACTOR = 12 / 10;

/// Private ///
/**
 * Updates tile width in CSS.
 */
const updateCSS = () => {
  const nextInterface = document.querySelector(".no-hover");
  nextInterface.style.setProperty("--tile-width", `${tileSize.getWidth}px`);
};

/**
 * Rerenders view.
 */
const rerender = () => {
  clearBoardView();
  renderBoard();
};

/// Public ///
/**
 * Initializes zoom to default level and updates relevant data.
 */
const initializeZoom = () => {
  const board = document.querySelector(".board");
  tileSize.set = Math.max(
    Math.min(board.offsetWidth, board.offsetHeight) /
      MIN_DEFAULT_TILES /
      tileSize.sizeFactor,
    MIN_DEFAULT_SIZE,
  );

  updateCSS();
};

/**
 * Adjusts zoom when window is resized.
 */
const adjustZoom = () => {
  const board = document.querySelector(".board");

  const maxSize =
    Math.min(board.offsetWidth, board.offsetHeight) /
    MIN_ZOOM_TILES /
    tileSize.sizeFactor;

  tileSize.set = tileSize.get > maxSize ? maxSize : tileSize.get;

  updateCSS();
};

/**
 * Adds listener for zooming.
 */
const listenZoom = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "z") {
      const newSize = tileSize.get * ZOOM_FACTOR;
      const board = document.querySelector(".board");
      const maxSize =
        Math.min(board.offsetWidth, board.offsetHeight) /
        MIN_ZOOM_TILES /
        tileSize.sizeFactor;
      tileSize.set = newSize > maxSize ? maxSize : newSize;

      updateCSS();
      rerender();
    }
    if (e.key === "x") {
      tileSize.set = tileSize.get / ZOOM_FACTOR;

      updateCSS();
      rerender();
    }
  });
};

export { adjustZoom, initializeZoom, listenZoom };
