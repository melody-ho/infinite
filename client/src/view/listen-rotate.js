/// Imports ///
import rotateTile from "../controller/rotate-tile";

/// Constants ///
/**
 * Degree of rotation for 1 rotation index.
 */
const DEGREES = 60;
/**
 * Maximum time between taps to register as double tap, in ms.
 */
const DOUBLE_TAP_MAX_LAPSE = 250;
/**
 * Change in rotation index when rotated left.
 */
const ROTATE_LEFT = -1;
/**
 * Change in rotation index when rotated right.
 */
const ROTATE_RIGHT = 1;

/// Private ///
/**
 * Handles rotating next tile counterclockwise.
 */
const handleRotateLeft = () => {
  const tiles = document.querySelectorAll(".next-tile");
  for (let i = 0; i < tiles.length; i += 1) {
    const tile = tiles[i];

    const rotation = Number(tile.getAttribute("rotation")) + ROTATE_LEFT;
    tile.setAttribute("rotation", `${rotation}`);
    tile.style.transform = `rotate(${rotation * DEGREES}deg)`;
  }

  rotateTile("left");
};

/**
 * Handles rotating next tile clockwise.
 */
const handleRotateRight = () => {
  const tiles = document.querySelectorAll(".next-tile");
  for (let i = 0; i < tiles.length; i += 1) {
    const tile = tiles[i];

    const rotation = Number(tile.getAttribute("rotation")) + ROTATE_RIGHT;
    tile.setAttribute("rotation", `${rotation}`);
    tile.style.transform = `rotate(${rotation * DEGREES}deg)`;
  }

  rotateTile("right");
};

/// Public ///
/**
 * Adds listener for rotating next tile.
 */
const listenRotate = () => {
  // keyboard controls //
  document.addEventListener("keydown", (e) => {
    if (e.key === "q") {
      handleRotateLeft();
    }
    if (e.key === "e") {
      handleRotateRight();
    }
  });

  // mouse controls //
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  document.addEventListener("auxclick", (e) => {
    if (e.button === 2) handleRotateRight();
  });

  // touch controls //
  const viewBox = document.querySelector(".view-box");
  let doubleTap = false;
  viewBox.addEventListener("touchend", () => {
    if (!doubleTap) {
      doubleTap = true;
      setTimeout(() => {
        doubleTap = false;
      }, DOUBLE_TAP_MAX_LAPSE);
    } else {
      handleRotateRight();
    }
  });

  // button controls //
  const rotateRightBtn = document.querySelector(
    ".next-tile-interface__rotate-right-btn",
  );
  rotateRightBtn.addEventListener("click", handleRotateRight);
};

export default listenRotate;
