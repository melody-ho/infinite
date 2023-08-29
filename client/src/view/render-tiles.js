/// Imports ///
// modules
import { boardData, nextTile } from "../model/board-data";
import convertIndex from "../utils/convert-index";
import getForeground from "./get-foreground";
import listenAvailable from "../view/listen-available";

// assets
function importAll(r) {
  const files = {};
  r.keys().forEach((key) => {
    files[key.replace("./", "")] = r(key);
  });
  return files;
}

const backgrounds = importAll(
  require.context("../assets/tiles/background", false, /\.+/),
);
const foregrounds = importAll(
  require.context("../assets/tiles/foreground", false, /\.+/),
);

/// Constants ///
/**
 * tile width  = tile size * SIZE_FACTOR
 */
const SIZE_FACTOR = 4;

/// Private ///
/**
 * Get view coordinates of a tile.
 * @param {string} self Index of tile itself.
 * @param {string} center Index of tile at view center.
 * @returns {[number, number]} View coordinates of the tile as [x,y].
 */
const getCoordinates = (self, center) => {
  const [sx, sy] = convertIndex(self);
  const [cx, cy] = convertIndex(center);
  return [sx - cx, sy - cy];
};

/**
 * Calculates absolute position of a tile.
 * @param {string} self Index of tile itself.
 * @param {string} center Index of tile at view center.
 * @param {[number, number]} viewCenter Absolute position of tile at view center, represented as [left, bottom] (in pixels).
 * @param {number} size Size of tiles in pixels.
 * @returns {[number, number]} Absolute position represented as [left, bottom] (in pixels).
 */
const getViewPosition = (self, center, viewCenter, size) => {
  const coordinates = getCoordinates(self, center);

  const xDistance = 3 * size * coordinates[0];
  const left = viewCenter[0] + xDistance;

  const yDistance =
    coordinates[0] % 2 === 0
      ? Math.sqrt(3) * size * 2 * coordinates[1]
      : Math.sqrt(3) * size * (2 * coordinates[1] + 1);
  const bottom = viewCenter[1] + yDistance;

  return [left, bottom];
};

/// Public ///
/**
 * Creates DOM element for a specified tile.
 * @param {string} index Index of tile to render.
 * @param {string} centerTile Index of tile at view center.
 * @param {[number, number]} viewCenter Absolute position of tile at view center, represented as [left, bottom] (in pixels).
 * @param {number} size Size of tiles in pixels.
 * @returns {Object} Newly created DOM element for the tile specified.
 */
const renderTile = (index, centerTile, viewCenter, size) => {
  // get information needed //
  const tileData = boardData[index];
  const position = getViewPosition(index, centerTile, viewCenter, size);
  const width = size * SIZE_FACTOR;

  // create container //
  const newTile = document.createElement("div");
  newTile.classList.add("tile");
  newTile.setAttribute("index", `${index}`);
  newTile.style.width = `${width}px`;
  newTile.style.height = `${width}px`;
  newTile.style.left = `${position[0]}px`;
  newTile.style.bottom = `${position[1]}px`;

  // fill container //
  if (tileData.status === "available") {
    // render as available position //
    const available = document.createElement("img");
    available.classList.add("tile__available");
    available.setAttribute("src", backgrounds["available.svg"]);
    // add listener
    listenAvailable(newTile);
    // append
    newTile.appendChild(available);
  } else {
    // render as filled position //
    // render background
    const back = document.createElement("img");
    back.classList.add("tile__background");
    const backSvg = tileData.background;
    back.setAttribute("src", backgrounds[`${backSvg}.svg`]);
    // render foreground
    if (tileData.foreground !== "000000") {
      const front = document.createElement("img");
      front.classList.add("tile__foreground");
      const [frontSvg, rotation] = getForeground(tileData.foreground);
      front.setAttribute("src", foregrounds[`${frontSvg}.svg`]);
      front.style.transform = `rotate(${rotation}deg)`;
      // appending in this order ensures foreground is shown in front of background
      newTile.appendChild(front);
      newTile.insertBefore(back, front);
    } else {
      newTile.appendChild(back);
    }
  }

  return newTile;
};

/**
 * Creates DOM element showing the next tile to be placed.
 * @param {number} size Size of tiles in pixels.
 * @returns Newly created DOM element showing the next tile to be placed.
 */
const renderNextTile = (size) => {
  const [background, foreground] = nextTile;
  const width = size * SIZE_FACTOR;

  // create container //
  const tile = document.createElement("div");
  tile.classList.add("next-tile");
  tile.style.width = `${width}px`;
  tile.style.height = `${width}px`;

  // fill container //
  // render background
  const back = document.createElement("img");
  back.classList.add("next-tile__background");
  back.setAttribute("src", backgrounds[`${background}.svg`]);
  // render foreground
  if (foreground !== "000000") {
    const front = document.createElement("img");
    front.classList.add("next-tile__foreground");
    const [frontSvg, rotation] = getForeground(foreground);
    front.setAttribute("src", foregrounds[`${frontSvg}.svg`]);
    front.style.transform = `rotate(${rotation}deg)`;
    front.setAttribute("rotation", `${rotation}`);
    // appending in this order ensures foreground is shown in front of background
    tile.appendChild(front);
    tile.insertBefore(back, front);
  } else {
    tile.appendChild(back);
  }

  // add listener for following cursor//
  const board = document.querySelector(".board");
  board.addEventListener("mousemove", (e) => {
    tile.style.left = `${e.clientX - width / 2}px`;
    tile.style.top = `${e.clientY - width / 2}px`;
  });

  return tile;
};

export { renderNextTile, renderTile };
