/// Imports ///
import clearBoardView from "./clear-board-view";
import renderBoard from "./render-board";
import { tileSize } from "../model/view-data";

/// Constants ///
/**
 * Default minimum number of tiles on shorter dimension.
 */
const MIN_TILES = 8;
/**
 * tile width  = tile size * SIZE_FACTOR
 */
const SIZE_FACTOR = 4;
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
 * Initializes zoom to default level.
 */
const initializeZoom = () => {
  const board = document.querySelector(".board");
  tileSize.set =
    Math.min(board.offsetWidth, board.offsetHeight) / MIN_TILES / SIZE_FACTOR;
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
