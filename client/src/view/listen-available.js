/// Imports ///
import { nextTile } from "../model/board-data";
import placeTile from "../controller/place-tile";
import validatePlace from "../controller/validate-place";

/// Constants ///
/**
 * Minimum time between taps to register as separate taps (ms).
 */
const SINGLE_TAP_MIN_LAPSE = 280;
/**
 * Threshold of touch length for registering as tap event (ms).
 */
const TAP_DURATION_THRESHOLD = 50;

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
  // mouse controls //
  let clickTarget = null;
  let clickStartX = 0;
  let clickStartY = 0;
  let clickDeltaX = 0;
  let clickDeltaY = 0;

  const handleClickStart = (startEvent) => {
    clickTarget = startEvent.target;
    clickStartX = startEvent.clientX;
    clickStartY = startEvent.clientY;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleClickEnd);
  };

  const handleMouseMove = (moveEvent) => {
    clickDeltaX = moveEvent.clientX - clickStartX;
    clickDeltaY = moveEvent.clientY - clickStartY;
  };

  const handleClickEnd = () => {
    if (clickDeltaX === 0 && clickDeltaY === 0) {
      handlePlaceAttempt(clickTarget);
    }
    clickDeltaX = 0;
    clickDeltaY = 0;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleClickEnd);
  };

  element.addEventListener("mousedown", (e) => {
    if (e.button === 0) handleClickStart(e);
  });

  // touch controls //
  let touchTarget = null;
  let touchStartT = null;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchDeltaX = 0;
  let touchDeltaY = 0;
  let tapTimer = null;

  const handleTouchStart = (startEvent) => {
    touchTarget = startEvent.target;
    touchStartT = new Date();
    touchStartX = startEvent.touches[0].clientX;
    touchStartY = startEvent.touches[0].clientY;
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (moveEvent) => {
    touchDeltaX = moveEvent.touches[0].clientX - touchStartX;
    touchDeltaY = moveEvent.touches[0].clientY - touchStartY;
  };

  const handleTouchEnd = () => {
    const lapse = new Date() - touchStartT;
    if (
      lapse > TAP_DURATION_THRESHOLD &&
      (Math.abs(touchDeltaX) <= 0 || Math.abs(touchDeltaY) <= 0)
    ) {
      if (tapTimer === null) {
        tapTimer = setTimeout(() => {
          tapTimer = null;
          handlePlaceAttempt(touchTarget);
        }, SINGLE_TAP_MIN_LAPSE);
      } else {
        clearTimeout(tapTimer);
        tapTimer = null;
      }
    }
    touchDeltaX = 0;
    touchDeltaY = 0;
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  element.addEventListener("touchstart", handleTouchStart);
};

export default listenAvailable;
