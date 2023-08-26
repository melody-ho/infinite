/// Imports ///
import convertIndex from "../utils/convert-index";

/// Public ///
/**
 * Get surrounding positions for a given position.
 * @param {string} centerIndex Index for which to get surrounding positions, represented as "x,y".
 * @returns {string[]} Indexes of surrounding positions starting from top going clockwise, each represented as "x,y".
 */
const getSurrounding = (centerIndex) => {
  const [x, y] = convertIndex(centerIndex);

  let surrounding;
  if (x % 2 === 0) {
    surrounding = [
      [x, y + 1].join(),
      [x + 1, y].join(),
      [x + 1, y - 1].join(),
      [x, y - 1].join(),
      [x - 1, y - 1].join(),
      [x - 1, y].join(),
    ];
  } else {
    surrounding = [
      [x, y + 1].join(),
      [x + 1, y + 1].join(),
      [x + 1, y].join(),
      [x, y - 1].join(),
      [x - 1, y].join(),
      [x - 1, y + 1].join(),
    ];
  }

  return surrounding;
};

export default getSurrounding;
