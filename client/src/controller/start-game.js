/// Imports ///
import { initializeView, listenResize } from "../view/responsive-view";
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
};

export default startGame;
