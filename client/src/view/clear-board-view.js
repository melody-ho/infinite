/// Imports ///
import { panValue, resetPan, resetPanBounds } from "../model/view-data";

/// Public ///
/**
 * Clears board view.
 */
const clearBoardView = () => {
  const board = document.querySelector(".board");

  // reset pan bounds
  resetPanBounds();

  // reset pan
  resetPan();
  board.style.setProperty("--move-x", `${panValue[0]}px`);
  board.style.setProperty("--move-y", `${panValue[1]}px`);

  // remove elements
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
};

export default clearBoardView;
