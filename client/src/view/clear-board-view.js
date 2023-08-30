/// Imports ///
import { resetPanBounds } from "../model/view-data";

/// Public ///
/**
 * Clears board view and relevant view data.
 */
const clearBoardView = () => {
  const board = document.querySelector(".board");

  // reset pan bounds
  resetPanBounds();

  // remove elements
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
};

export default clearBoardView;
