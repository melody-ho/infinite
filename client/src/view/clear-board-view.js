/**
 * Clears board view.
 */
const clearBoardView = () => {
  const board = document.querySelector(".board");
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
};

export default clearBoardView;
