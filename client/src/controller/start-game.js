/// Imports ///
import listenRotate from "../view/listen-rotate";
import placeTile from "./place-tile";

// Public //
/**
 * Starts a new game.
 */
const startGame = () => {
  placeTile("0,0", ["medium", "000000"]);
  listenRotate();
};

export default startGame;
