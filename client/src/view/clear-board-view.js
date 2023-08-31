/// Imports ///
import { pan } from "../model/view-data";

/// Public ///
/**
 * Clears board view and relevant view data.
 */
const clearBoardView = () => {
  // reset pan bounds
  pan.resetBounds();

  // remove elements
  const board = document.querySelector(".board");
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
};

export default clearBoardView;
