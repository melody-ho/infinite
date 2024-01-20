/// Imports ///
import { revalidatePreview } from "./render-preview";
import rotateTile from "../controller/rotate-tile";

/// Constants ///
/**
 * Degree of rotation for 1 rotation index.
 */
const DEGREES = 60;
/**
 * Maximum time between clicks to register as double click, in ms.
 */
const DOUBLE_CLICK_MAX_LAPSE = 250;
/**
 * Maximum time between taps to register as multi tap, in ms.
 */
const MULTI_TAP_MAX_LAPSE = 250;
/**
 * Change in rotation index when rotated left.
 */
const ROTATE_LEFT = -1;
/**
 * Change in rotation index when rotated right.
 */
const ROTATE_RIGHT = 1;
/**
 * Duration of tile rotation transition, in ms.
 */
const ROTATE_TRANSITION_DURATION = 200;
/**
 * Minimum time between wheel events firing to trigger rotation, in ms.
 */
const WHEEL_EVENT_INTERVAL = 100;

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
  setTimeout(() => {
    revalidatePreview();
  }, ROTATE_TRANSITION_DURATION);
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
  setTimeout(() => {
    revalidatePreview();
  }, ROTATE_TRANSITION_DURATION);
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

  const viewBox = document.querySelector(".view-box");

  // mouse controls //
  viewBox.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  viewBox.addEventListener("auxclick", (e) => {
    if (e.button === 2) handleRotateRight();
  });
  let doubleClick = false;
  viewBox.addEventListener("mouseup", (e) => {
    if (!e.target.classList.contains("overlay-control") && e.button === 0) {
      if (!doubleClick) {
        doubleClick = true;
        setTimeout(() => {
          doubleClick = false;
        }, DOUBLE_CLICK_MAX_LAPSE);
      } else {
        handleRotateLeft();
      }
    }
  });

  // wheel controls //
  let wheelThrottled = false;
  let wheelTimer = null;
  function resetTimer() {
    if (wheelTimer) clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      wheelThrottled = false;
      wheelTimer = null;
    }, WHEEL_EVENT_INTERVAL);
  }
  viewBox.addEventListener("wheel", (e) => {
    if (!wheelThrottled) {
      wheelThrottled = true;
      if (e.deltaY < 0) {
        handleRotateLeft();
      } else if (e.deltaY > 0) {
        handleRotateRight();
      }
      resetTimer();
    } else {
      resetTimer();
    }
  });

  // touch controls //
  let taps = 0;
  let tapTimer = null;
  viewBox.addEventListener("touchend", (e) => {
    if (!e.target.classList.contains("overlay-control")) {
      taps += 1;
      if (taps === 1) {
        if (tapTimer) clearTimeout(tapTimer);
        tapTimer = setTimeout(() => {
          taps = 0;
        }, MULTI_TAP_MAX_LAPSE);
      } else if (taps === 2) {
        if (tapTimer) clearTimeout(tapTimer);
        tapTimer = setTimeout(() => {
          handleRotateLeft();
          taps = 0;
        }, MULTI_TAP_MAX_LAPSE);
      } else if (taps === 3) {
        if (tapTimer) clearTimeout(tapTimer);
        handleRotateRight();
        taps = 0;
        tapTimer = null;
      }
    }
  });

  // button controls //
  const rotateRightBtn = document.querySelector(
    ".next-tile-interface__rotate-right-btn",
  );
  rotateRightBtn.addEventListener("click", handleRotateRight);
  const rotateLeftBtn = document.querySelector(
    ".next-tile-interface__rotate-left-btn",
  );
  rotateLeftBtn.addEventListener("click", handleRotateLeft);
};

export default listenRotate;
