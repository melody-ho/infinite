/// Imports ///
import { initializeView, listenResize } from "../view/responsive-view";
import initializeTrackingNextContainer from "../view/initialize-tracking-next-container";
import { initializeTrackingPosition } from "../view/render-tiles";
import listenModals from "../view/listen-modals";
import { listenPan } from "../view/pan";
import listenRotate from "../view/listen-rotate";
import { listenZoom } from "../view/zoom";
import placeTile from "./place-tile";

/// Public ///
/**
 * Starts a new game.
 */
const startGame = async () => {
  initializeView();
  await initializeTrackingPosition();
  initializeTrackingNextContainer();
  placeTile("0,0", ["medium", "000000"]);
  listenRotate();
  listenResize();
  listenPan();
  listenZoom();
  listenModals();
};

export default startGame;
