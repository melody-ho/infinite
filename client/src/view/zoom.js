/// Imports ///
import { tiles, view, zoom } from "../model/view-data";
import { updatePan } from "./pan";

/// Constants ///
/**
 * Minimum number of tiles on shorter dimension with zoom.
 */
const MIN_ZOOM_TILES = 2;
/**
 * Amount to change zoom factor by when zooming in/out.
 */
const ZOOM_CHANGE_FACTOR = 12 / 10;
/**
 * Zoom transition duration, in ms.
 */
const ZOOM_DURATION = 250;

/// Private ///
/**
 * Updates zoom factor in CSS.
 */
const updateCSS = () => {
  const main = document.querySelector(".main");
  main.style.setProperty("--zoom-factor", `${zoom.factor}`);
};

/**
 * Handles zooming in.
 */
const zoomIn = () => {
  // update data
  const newZoom = zoom.factor * ZOOM_CHANGE_FACTOR;
  const maxZoom =
    Math.min(view.width, view.height) / MIN_ZOOM_TILES / tiles.width;
  zoom.factor = newZoom > maxZoom ? maxZoom : newZoom;

  // apply data
  updateCSS();
  setTimeout(updatePan, ZOOM_DURATION);
};

/**
 * Handles zooming out.
 */
const zoomOut = () => {
  // update data
  zoom.factor /= ZOOM_CHANGE_FACTOR;

  // apply data
  updateCSS();
  setTimeout(updatePan, ZOOM_DURATION);
};

/// Public ///
/**
 * Adjusts zoom when window is resized.
 */
const adjustZoom = () => {
  const currZoom = zoom.factor;
  const maxZoom =
    Math.min(view.width, view.height) / MIN_ZOOM_TILES / tiles.width;
  zoom.factor = currZoom > maxZoom ? maxZoom : currZoom;

  updateCSS();
};

/**
 * Adds listener for zooming.
 */
const listenZoom = () => {
  // keyboard controls //
  document.addEventListener("keydown", (e) => {
    if (e.key === "z") zoomIn();
    if (e.key === "x") zoomOut();
  });

  // button controls //
  const zoomInBtn = document.querySelector(".zoom-interface__zoom-in-btn");
  zoomInBtn.addEventListener("click", zoomIn);
  const zoomOutBtn = document.querySelector(".zoom-interface__zoom-out-btn");
  zoomOutBtn.addEventListener("click", zoomOut);
};

export { adjustZoom, listenZoom };
