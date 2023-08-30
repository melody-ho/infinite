/// Imports ///
import { initializeView, listenResize } from "../view/responsive-view";
import listenPan from "../view/listen-pan";
import listenRotate from "../view/listen-rotate";
import placeTile from "./place-tile";

// Public //
/**
 * Starts a new game.
 */
const startGame = () => {
  initializeView();
  placeTile("0,0", ["medium", "000000"]);
  listenRotate();
  listenResize();
  listenPan();
};

export default startGame;
