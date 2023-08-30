/// Imports ///
import rotateTile from "../controller/rotate-tile";

/// Constants ///
/**
 * Degree of rotation for 1 rotation index.
 */
const DEGREES = 60;
/**
 * Rotation index at which the tile rotates full circle.
 * (360 / 60)
 */
const MAX_ROTATES = 6;
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
  const tile = document.querySelector(".next-tile");
  const rotation =
    (MAX_ROTATES + (Number(tile.getAttribute("rotation")) + ROTATE_LEFT)) %
    MAX_ROTATES;
  tile.setAttribute("rotation", `${rotation}`);

  tile.style.transform = `rotate(${rotation * DEGREES}deg)`;
  rotateTile("left");
};

/**
 * Handles rotating next tile clockwise.
 */
const handleRotateRight = () => {
  const tile = document.querySelector(".next-tile");
  const rotation =
    (Number(tile.getAttribute("rotation")) + ROTATE_RIGHT) % MAX_ROTATES;
  tile.setAttribute("rotation", `${rotation}`);

  tile.style.transform = `rotate(${rotation * DEGREES}deg)`;
  rotateTile("right");
};

/// Public ///
/**
 * Adds listener for rotating next tile.
 */
const listenRotate = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "q") {
      handleRotateLeft();
    }
    if (e.key === "e") {
      handleRotateRight();
    }
  });
};

export default listenRotate;
