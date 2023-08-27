/// Imports ///
import { nextTile } from "../model/board-data";
import placeTile from "../controller/place-tile";
import validatePlace from "../controller/validate-place";

/// Private ///
/**
 * Handles attempted placement by placing the tile if valid.
 * @param {Event} e Event object returned from listener.
 */
const handleClickAvailable = (e) => {
  const index = e.target.parentElement.getAttribute("index");
  if (validatePlace(index, nextTile[1])) {
    placeTile(index, nextTile);
  }
};

/// Public ///
/**
 * Adds listeners for new available tiles.
 * @param {[]} indexes Indexes of new available tiles.
 */
const listenAvailable = (indexes) => {
  for (let i = 0; i < indexes.length; i += 1) {
    const tile = document.querySelector(`[index="${indexes[i]}"]`);
    tile.addEventListener("click", (e) => {
      handleClickAvailable(e);
    });
  }
};

export default listenAvailable;
