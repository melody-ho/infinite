/// Imports ///
// modules
import { boardData, nextTile } from "../model/board-data";
import convertIndex from "../utils/convert-index";
import getForeground from "./get-foreground";
import listenAvailable from "./listen-available";
import { pan, tileSize, view } from "../model/view-data";

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
 * Index of tile at view center.
 * @type {string} "x,y"
 */
const CENTER_INDEX = "0,0";

/// Private ///
/**
 * Get view coordinates of a tile.
 * @param {string} self Index of tile itself.
 * @returns {[number, number]} View coordinates of the tile as [x,y].
 */
const getCoordinates = (self) => {
  const [sx, sy] = convertIndex(self);
  const [cx, cy] = convertIndex(CENTER_INDEX);
  return [sx - cx, sy - cy];
};

/**
 * Calculates absolute position of a tile.
 * @param {string} self Index of tile itself.
 * @returns {[number, number]} Absolute position represented as [left, bottom] (in pixels).
 */
const getViewPosition = (self) => {
  const size = tileSize.get;
  const coordinates = getCoordinates(self);

  const xDistance = 3 * size * coordinates[0];
  const left = view.centerX + xDistance;

  const yDistance =
    coordinates[0] % 2 === 0
      ? Math.sqrt(3) * size * 2 * coordinates[1]
      : Math.sqrt(3) * size * (2 * coordinates[1] + 1);
  const bottom = view.centerY + yDistance;

  return [left, bottom];
};

/**
 * Updates pan boundaries when a new tile is rendered.
 * @param {[number, number]} viewPosition Absolute position of the new tile, represented as [left, bottom] (in pixels).
 */
const updatePanBounds = (viewPosition) => {
  const [left, bottom] = [...viewPosition];

  if (pan.bounds.top === null) {
    pan.bounds.top = bottom;
  } else if (bottom > pan.bounds.top) {
    pan.bounds.top = bottom;
  }

  if (pan.bounds.right === null) {
    pan.bounds.right = left;
  } else if (left > pan.bounds.right) {
    pan.bounds.right = left;
  }

  if (pan.bounds.bottom === null) {
    pan.bounds.bottom = bottom;
  } else if (bottom < pan.bounds.bottom) {
    pan.bounds.bottom = bottom;
  }

  if (pan.bounds.left === null) {
    pan.bounds.left = left;
  } else if (left < pan.bounds.left) {
    pan.bounds.left = left;
  }
};

/// Public ///
/**
 * Creates DOM element for a specified tile.
 * @param {string} index Index of tile to render.
 * @returns {Object} Newly created DOM element for the tile specified.
 */
const renderTile = (index) => {
  // get information needed //
  const tileData = boardData[index];
  const position = getViewPosition(index);
  const width = tileSize.getWidth;

  // update pan boundaries //
  updatePanBounds(position);

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
    // available position //
    // render image
    const available = document.createElement("img");
    available.classList.add("tile__available");
    available.setAttribute("src", backgrounds["available.svg"]);
    // add listener
    listenAvailable(newTile);
    // append
    newTile.appendChild(available);
  } else {
    // filled position //
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
 * @returns Newly created DOM element showing the next tile to be placed.
 */
const renderNextTile = () => {
  const [background, foreground] = nextTile;
  const width = tileSize.getWidth;

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

  // add listener for following cursor //
  const board = document.querySelector(".board");
  board.addEventListener("mousemove", (e) => {
    tile.style.left = `${e.clientX - width / 2}px`;
    tile.style.top = `${e.clientY - width / 2}px`;
  });

  return tile;
};

export { renderNextTile, renderTile };
