/// Imports ///
import { preview, tiles } from "../model/view-data";

/// Constants ///
/**
 * Rate at which to confirm appropriate visibility, in ms.
 */
const CHECK_VISIBILITY_INTERVAL = 100;
/**
 * Duration of buffer for rendering SVG on screen, in ms.
 */
const SVG_RENDER_BUFFER = 100;

/// Public ///
/**
 * Initializes container for next tile that follows the cursor, shown on devices with hover.
 */
const initializeTrackingNextContainer = () => {
  // get container element //
  const trackingNextContainer = document.querySelector(
    ".next-tile__container--tracking",
  );

  // set width and height according to view data //
  trackingNextContainer.style.width = `${tiles.width}px`;
  trackingNextContainer.style.height = `${tiles.width}px`;

  // place at current cursor position //
  trackingNextContainer.style.left = `${tiles.trackingLeft}px`;
  trackingNextContainer.style.top = `${tiles.trackingTop}px`;

  // declare function for updating visibility //
  let hideTrackingTimer = null;
  const updateVisibility = () => {
    if (preview.index === null) {
      if (hideTrackingTimer) clearTimeout(hideTrackingTimer);
      trackingNextContainer.classList.remove("next-tile--hidden");
    } else if (!trackingNextContainer.classList.contains("next-tile--hidden")) {
      hideTrackingTimer = setTimeout(() => {
        trackingNextContainer.classList.add("next-tile--hidden");
        hideTrackingTimer = null;
      }, SVG_RENDER_BUFFER);
    }
  };

  // add listener for updating position and visibility //
  const viewBox = document.querySelector(".view-box");
  viewBox.addEventListener("mousemove", (e) => {
    // track cursor
    tiles.trackingLeft = e.clientX - viewBox.offsetLeft - tiles.width / 2;
    tiles.trackingTop = e.clientY - viewBox.offsetTop - tiles.width / 2;
    trackingNextContainer.style.left = `${tiles.trackingLeft}px`;
    trackingNextContainer.style.top = `${tiles.trackingTop}px`;
    // update visibility
    updateVisibility();
  });

  // set up interval to ensure only either preview or tracking next tile is shown //
  setInterval(() => {
    updateVisibility();
  }, CHECK_VISIBILITY_INTERVAL);
};

export default initializeTrackingNextContainer;
