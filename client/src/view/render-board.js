/// Imports ///
import {
  renderStaticNext,
  renderTile,
  renderTrackingNext,
} from "./render-tiles";
import { boardData } from "../model/board-data";

/// Public ///
/**
 * Renders board view.
 */
const renderBoard = () => {
  const board = document.querySelector(".board");

  // render tiles in gameboard //
  const indexes = Object.keys(boardData);
  for (let i = 0; i < indexes.length; i += 1) {
    const tile = renderTile(indexes[i]);
    board.appendChild(tile);
  }

  // render next tile //
  // for devices with hover
  const trackingNext = renderTrackingNext();
  const prevTrackingNext = document.querySelector(".next-tile--tracking");
  prevTrackingNext.replaceWith(trackingNext);
  // for devices without hover
  const staticNext = renderStaticNext();
  const prevStaticNext = document.querySelector(".next-tile--static");
  prevStaticNext.replaceWith(staticNext);
};

export default renderBoard;
