/// Imports ///
import { initializeView, listenResize } from "../view/responsive-view";
import { initializeZoom, listenZoom } from "../view/zoom";
import listenPan from "../view/listen-pan";
import listenRotate from "../view/listen-rotate";
import placeTile from "./place-tile";

// Public //
/**
 * Starts a new game.
 */
const startGame = () => {
  initializeZoom();
  initializeView();
  placeTile("0,0", ["medium", "000000"]);
  listenRotate();
  listenResize();
  listenPan();
  listenZoom();
};

export default startGame;
