/// Imports ///
import { getPanLimits, panValue, panX, panY } from "../model/view-data";

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

/**
 * Increase x of pan value if within bounds.
 */
const increaseX = () => {
  if (panValue[0] < getPanLimits().xMax) {
    panX(SPEED);
  }
};

/**
 * Decrease x of pan value if within bounds.
 */
const decreaseX = () => {
  if (panValue[0] > getPanLimits().xMin) {
    panX(-SPEED);
  }
};

/**
 * Increase y of pan value if within bounds.
 */
const increaseY = () => {
  if (panValue[1] < getPanLimits().yMax) {
    panY(SPEED);
  }
};

/**
 * Decrease y of pan value if within bounds.
 */
const decreaseY = () => {
  if (panValue[1] > getPanLimits().yMin) {
    panY(-SPEED);
  }
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
      decreaseX();
      pan();
    }
    if (a && !d && !w && !s) {
      increaseX();
      pan();
    }
    if (w && !d && !a && !s) {
      increaseY();
      pan();
    }
    if (s && !d && !a && !w) {
      decreaseY();
      pan();
    }
    if (d && w && !a && !s) {
      decreaseX();
      increaseY();
      pan();
    }
    if (d && s && !a && !w) {
      decreaseX();
      decreaseY();
      pan();
    }
    if (a && w && !d && !s) {
      increaseX();
      increaseY();
      pan();
    }
    if (a && s && !d && !w) {
      increaseX();
      decreaseY();
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
