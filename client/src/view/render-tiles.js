/// Imports ///
// modules
import { boardData, nextTile } from "../model/board-data";
import { pan, tiles, view } from "../model/view-data";
import convertIndex from "../utils/convert-index";
import getForeground from "./get-foreground";
import listenAvailable from "./listen-available";

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

/// Private ///
/**
 * Calculates distance factor of a tile.
 * @param {string} self Index of tile itself.
 * @returns {[number, number]} Distance factors, represented as [x, y]. (distance from center = tile size * distance factor)
 */
const getDistanceFactors = (self) => {
  const coordinates = convertIndex(self);

  const xDistance = 3 * coordinates[0];

  const yDistance =
    coordinates[0] % 2 === 0
      ? Math.sqrt(3) * 2 * coordinates[1]
      : Math.sqrt(3) * (2 * coordinates[1] + 1);

  return [xDistance, yDistance];
};

/**
 * Updates pan boundaries when a new tile is rendered, represented as distance factors.
 * @param {[number, number]} distanceFactors Distance factors, represented as [x, y]. (distance from center = tile size * distance factor)
 */
const updatePanBounds = (distanceFactors) => {
  const [x, y] = [...distanceFactors];

  if (pan.bounds.top === null) {
    pan.bounds.top = y;
  } else if (y > pan.bounds.top) {
    pan.bounds.top = y;
  }

  if (pan.bounds.right === null) {
    pan.bounds.right = x;
  } else if (x > pan.bounds.right) {
    pan.bounds.right = x;
  }

  if (pan.bounds.bottom === null) {
    pan.bounds.bottom = y;
  } else if (y < pan.bounds.bottom) {
    pan.bounds.bottom = y;
  }

  if (pan.bounds.left === null) {
    pan.bounds.left = x;
  } else if (x < pan.bounds.left) {
    pan.bounds.left = x;
  }
};

/**
 * Creates DOM element showing next tile to be placed.
 * @returns {Element} Newly created DOM element of next tile to be placed.
 */
const renderNextTile = () => {
  const [background, foreground] = [nextTile.background, nextTile.foreground];

  // create container //
  const tile = document.createElement("div");
  tile.classList.add("next-tile");
  tile.style.width = `${tiles.width}px`;
  tile.style.height = `${tiles.width}px`;

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

  return tile;
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
  const [xDistance, yDistance] = [...getDistanceFactors(index)];
  const offsetLeft = view.centerLeft + xDistance * tiles.size;
  const offsetTop = view.centerTop - yDistance * tiles.size;

  // update pan boundaries //
  updatePanBounds([xDistance, yDistance]);

  // create container //
  const newTile = document.createElement("div");
  newTile.classList.add("tile");
  newTile.setAttribute("index", `${index}`);
  newTile.style.width = `${tiles.width}px`;
  newTile.style.height = `${tiles.width}px`;
  newTile.style.left = `${offsetLeft}px`;
  newTile.style.top = `${offsetTop}px`;

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
 * Renders a next tile that remains static, shown on devices without hover.
 * @returns {Element} DOM element of next tile to be placed, for devices without hover.
 */
const renderStaticNext = () => {
  const tile = renderNextTile();
  tile.classList.add("next-tile--static");

  return tile;
};

/**
 * Renders a next tile that follows the cursor, shown on devices with hover.
 * @returns {Element} DOM element of next tile to be placed, for devices with hover.
 */
const renderTrackingNext = () => {
  // rnder next tile //
  // render content
  const tile = renderNextTile();
  // add tracking specific classes
  tile.classList.add("hover");
  tile.classList.add("next-tile--tracking");

  // style wrapper //
  const trackingWrapper = document.querySelector(
    ".next-tile__zoom-wrapper--tracking",
  );
  trackingWrapper.style.width = `${tiles.width}px`;
  trackingWrapper.style.height = `${tiles.width}px`;
  // place at current cursor position
  trackingWrapper.style.left = `${tiles.trackingLeft}px`;
  trackingWrapper.style.top = `${tiles.trackingTop}px`;
  // add listener to follow cursor
  const viewBox = document.querySelector(".view-box");
  viewBox.addEventListener("mousemove", (e) => {
    tiles.trackingLeft = e.clientX - viewBox.offsetLeft - tiles.width / 2;
    tiles.trackingTop = e.clientY - viewBox.offsetTop - tiles.width / 2;
    trackingWrapper.style.left = `${tiles.trackingLeft}px`;
    trackingWrapper.style.top = `${tiles.trackingTop}px`;
  });

  return tile;
};

/**
 * Initializes position at which to render next tile.
 */
const initializeTrackingPosition = async () => {
  await new Promise((resolve) => {
    document.addEventListener(
      "mouseover",
      (e) => {
        const viewBox = document.querySelector(".view-box");
        tiles.trackingLeft = e.clientX - viewBox.offsetLeft - tiles.width / 2;
        tiles.trackingTop = e.clientY - viewBox.offsetTop - tiles.width / 2;
        resolve();
      },
      { once: true },
    );
    // bypass getting cursor position for devices without hover
    setTimeout(() => {
      resolve();
    }, 100);
  });
};

export {
  initializeTrackingPosition,
  renderStaticNext,
  renderTile,
  renderTrackingNext,
};
