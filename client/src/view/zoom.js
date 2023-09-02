/// Imports ///
import clearBoardView from "./clear-board-view";
import renderBoard from "./render-board";
import { tileSize } from "../model/view-data";

/// Constants ///
/**
 * Minimum size of tiles at default.
 */
const MIN_SIZE = 20;
/**
 * Minimum number of tiles on shorter dimension at default.
 */
const MIN_TILES = 8;
/**
 * Amount to increment size by when zooming in.
 */
const ZOOM_FACTOR = 12 / 10;

/// Private ///
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
      MIN_TILES /
      tileSize.sizeFactor,
    MIN_SIZE,
  );

  // initialize tile width in CSS for devices without hover
  const nextInterface = document.querySelector(".no-hover");
  nextInterface.style.setProperty("--tile-width", `${tileSize.getWidth}px`);
};

/**
 * Adds listener for zooming.
 */
const listenZoom = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "z") {
      tileSize.set = tileSize.get * ZOOM_FACTOR;
      rerender();
    }
    if (e.key === "x") {
      tileSize.set = tileSize.get / ZOOM_FACTOR;
      rerender();
    }
  });
};

export { initializeZoom, listenZoom };
