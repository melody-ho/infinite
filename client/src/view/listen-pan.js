/// Imports ///
import { pan } from "../model/view-data";

/// Constants ///
/**
 * Speed of pan, in pixels.
 */
const SPEED = 20;

/// Private ///
/**
 * Applies pan data to DOM.
 */
const applyPan = () => {
  const board = document.querySelector(".board");
  board.style.setProperty("--move-x", `${pan.x}px`);
  board.style.setProperty("--move-y", `${pan.y}px`);
};

/**
 * Increase x of pan value if within bounds.
 */
const increaseX = () => {
  if (pan.x < pan.getLimits().xMax) {
    pan.changeX(SPEED);
  }
};

/**
 * Decrease x of pan value if within bounds.
 */
const decreaseX = () => {
  if (pan.x > pan.getLimits().xMin) {
    pan.changeX(-SPEED);
  }
};

/**
 * Increase y of pan value if within bounds.
 */
const increaseY = () => {
  if (pan.y < pan.getLimits().yMax) {
    pan.changeY(SPEED);
  }
};

/**
 * Decrease y of pan value if within bounds.
 */
const decreaseY = () => {
  if (pan.y > pan.getLimits().yMin) {
    pan.changeY(-SPEED);
  }
};

/// Public ///
/**
 * Adds listeners for view panning.
 */
const listenPan = () => {
  // initalize css variables
  applyPan();

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
      applyPan();
    }
    if (a && !d && !w && !s) {
      increaseX();
      applyPan();
    }
    if (w && !d && !a && !s) {
      increaseY();
      applyPan();
    }
    if (s && !d && !a && !w) {
      decreaseY();
      applyPan();
    }
    if (d && w && !a && !s) {
      decreaseX();
      increaseY();
      applyPan();
    }
    if (d && s && !a && !w) {
      decreaseX();
      decreaseY();
      applyPan();
    }
    if (a && w && !d && !s) {
      increaseX();
      increaseY();
      applyPan();
    }
    if (a && s && !d && !w) {
      increaseX();
      decreaseY();
      applyPan();
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
