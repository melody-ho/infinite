/// Imports ///
import { nextTile } from "../model/board-data";
import placeTile from "../controller/place-tile";
import validatePlace from "../controller/validate-place";

/// Constants ///
/**
 * Threshold of touch length for registering as tap event (ms).
 */
const TIME_THRESHOLD = 50;

/// Private ///
/**
 * Handles attempted placement by placing the tile if valid.
 * @param {Element} target DOM element where placement was attempted.
 */
const handlePlaceAttempt = (target) => {
  const index = target.parentElement.getAttribute("index");
  if (validatePlace(index, nextTile.foreground)) {
    placeTile(index, [nextTile.background, nextTile.foreground]);
  }
};

/// Public ///
/**
 * Adds listener for an available position.
 * @param {Element} element DOM element to add listener to.
 */
const listenAvailable = (element) => {
  // mouse event //
  element.addEventListener("click", (e) => {
    handlePlaceAttempt(e.target);
  });

  // touch event //
  let target = null;
  let startT = null;
  let startX = 0;
  let startY = 0;
  let deltaX = 0;
  let deltaY = 0;

  const handleStart = (startEvent) => {
    target = startEvent.target;
    startT = new Date();
    startX = startEvent.touches[0].clientX;
    startY = startEvent.touches[0].clientY;
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);
  };

  const handleMove = (moveEvent) => {
    deltaX = moveEvent.touches[0].clientX - startX;
    deltaY = moveEvent.touches[0].clientY - startY;
  };

  const handleEnd = () => {
    const lapse = new Date() - startT;
    if (
      lapse > TIME_THRESHOLD &&
      (Math.abs(deltaX) <= 0 || Math.abs(deltaY) <= 0)
    ) {
      handlePlaceAttempt(target);
    }
    deltaX = 0;
    deltaY = 0;
    window.removeEventListener("touchmove", handleMove);
    window.removeEventListener("touchend", handleEnd);
  };

  element.addEventListener("touchstart", handleStart);
};

export default listenAvailable;
