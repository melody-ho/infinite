/// Imports ///
import { panValue, panX, panY } from "../model/view-data";

/// Constants ///
/**
 * Speed of pan, in pixels.
 */
const SPEED = 20;

/// Private ///
/**
 * Pans view.
 */
const pan = () => {
  const board = document.querySelector(".board");
  board.style.setProperty("--move-x", `${panValue[0]}px`);
  board.style.setProperty("--move-y", `${panValue[1]}px`);
};

/// Public ///
/**
 * Adds listeners for view panning.
 */
const listenPan = () => {
  // initalize css variables
  pan();

  // log keys pressed
  let d = false;
  let a = false;
  let w = false;
  let s = false;

  document.addEventListener("keydown", (e) => {
    if (e.key === "d") {
      d = true;
    }
    if (e.key === "a") {
      a = true;
    }
    if (e.key === "w") {
      w = true;
    }
    if (e.key === "s") {
      s = true;
    }
    if (d && !a && !w && !s) {
      panX(-SPEED);
      pan();
    }
    if (a && !d && !w && !s) {
      panX(SPEED);
      pan();
    }
    if (w && !d && !a && !s) {
      panY(SPEED);
      pan();
    }
    if (s && !d && !a && !w) {
      panY(-SPEED);
      pan();
    }
    if (d && w && !a && !s) {
      panX(-SPEED);
      panY(SPEED);
      pan();
    }
    if (d && s && !a && !w) {
      panX(-SPEED);
      panY(-SPEED);
      pan();
    }
    if (a && w && !d && !s) {
      panX(SPEED);
      panY(SPEED);
      pan();
    }
    if (a && s && !d && !w) {
      panX(SPEED);
      panY(-SPEED);
      pan();
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "d") {
      d = false;
    }
    if (e.key === "a") {
      a = false;
    }
    if (e.key === "w") {
      w = false;
    }
    if (e.key === "s") {
      s = false;
    }
  });
};

export default listenPan;
