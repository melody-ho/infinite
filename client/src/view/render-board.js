/// Imports ///
import { boardData } from "../model/board-data";
import { renderNextTile, renderTile } from "./render-tiles";
import { viewCenter } from "../model/view-data";

/// Constants ///
// TO DO: make these dynamic when implementing drag and zoom //
const CENTER_INDEX = "0,0";
const SIZE = 20;

/// Public ///
/**
 * Renders board view.
 */
const renderBoard = () => {
  const board = document.querySelector(".board");
  const indexes = Object.keys(boardData);
  for (let i = 0; i < indexes.length; i += 1) {
    const tile = renderTile(indexes[i], CENTER_INDEX, viewCenter, SIZE);
    board.appendChild(tile);
  }

  const nextTile = renderNextTile(SIZE);
  board.appendChild(nextTile);
};

export default renderBoard;
