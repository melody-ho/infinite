/// Imports ///
import { nextTile } from "../model/board-data";
import { preview } from "../model/view-data";
import { renderNextTilePreview } from "./render-tiles";
import validatePlace from "../controller/validate-place";

/// Constants ///
/**
 * Duration of buffer for rendering SVG on screen, in ms.
 */
const SVG_RENDER_BUFFER = 100;

/// Public ///
/**
 * Creates preview of next tile at specified position.
 * @param {string} index Index attribute value of DOM element where preview should be created.
 */
const createPreview = (index) => {
  const container = document.querySelector(`[index = "${index}"]`);
  const tile = renderNextTilePreview();
  tile.classList.add("svg-buffer");
  if (!validatePlace(index, nextTile.foreground)) {
    tile.classList.add("next-tile--invalid");
  }
  container.insertBefore(tile, container.firstChild);
  setTimeout(() => {
    tile.classList.remove("svg-buffer");
  }, SVG_RENDER_BUFFER);
};

/**
 * Removes preview of next tile at specified position.
 * @param {string} index Index attribute value of DOM element from which preview should be removed.
 */
const removePreview = (index) => {
  const container = document.querySelector(`[index = "${index}"]`);
  if (container.firstChild.classList.contains("next-tile--preview")) {
    container.removeChild(container.firstChild);
  }
};

/**
 * Recreates preview.
 */
const recreatePreview = () => {
  if (preview.index) {
    removePreview(preview.index);
    createPreview(preview.index);
  }
};

/**
 * Revalidates placement and changes appearance of preview accordingly when next tile is rotated in place.
 */
const revalidatePreview = () => {
  if (preview.index !== null) {
    const previewTile = document.querySelector(".next-tile--preview");
    if (validatePlace(preview.index, nextTile.foreground)) {
      previewTile.classList.remove("next-tile--invalid");
    } else {
      previewTile.classList.add("next-tile--invalid");
    }
  }
};

export { createPreview, recreatePreview, removePreview, revalidatePreview };
