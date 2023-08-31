/// Imports ///
import { nextTile } from "../model/board-data";
import placeTile from "../controller/place-tile";
import validatePlace from "../controller/validate-place";

/// Public ///
/**
 * Adds listener for an available position.
 * @param {Element} element DOM element to add listener to.
 */
const listenAvailable = (element) => {
  element.addEventListener("click", (e) => {
    const index = e.target.parentElement.getAttribute("index");
    if (validatePlace(index, nextTile.foreground)) {
      placeTile(index, [nextTile.background, nextTile.foreground]);
    }
  });
};

export default listenAvailable;
