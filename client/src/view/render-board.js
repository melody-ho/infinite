/// Imports ///
import { boardData } from "../model/board-data";
import { renderNextTile, renderTile } from "./render-tiles";
import { viewCenter } from "../model/view-data";

/// Constants ///
/**
 * Index of tile at view center.
 * @type {string} "x,y"
 */
const CENTER_INDEX = "0,0";

/// Public ///
/**
 * Renders board view.
 */
const renderBoard = () => {
  const board = document.querySelector(".board");
  const indexes = Object.keys(boardData);
  for (let i = 0; i < indexes.length; i += 1) {
    const tile = renderTile(indexes[i], CENTER_INDEX, viewCenter);
    board.appendChild(tile);
  }

  const nextTile = renderNextTile();
  board.appendChild(nextTile);
};

export default renderBoard;
