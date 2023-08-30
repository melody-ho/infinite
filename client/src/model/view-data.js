/// Public ///
/**
 * Absolute position of center tile on view. Represented as [x,y] in pixels.
 * @type {[number, number]}
 */
const viewCenter = [];

/**
 * Distance to pan from original position. Represented as [x,y] in pixels.
 */
const panValue = [0, 0];

/**
 * Updates view center.
 * @param {[number, number]} newCenter New view center, represented as absolute position [x,y] in pixels.
 */
const setViewCenter = (newCenter) => {
  viewCenter[0] = newCenter[0];
  viewCenter[1] = newCenter[1];
};

/**
 * Updates x of pan value.
 * @param {number} change Change in x of pan value, in pixels.
 */
const panX = (change) => {
  panValue[0] += change;
};

/**
 * Updates y of pan value.
 * @param {number} change Change in y of pan value, in pixels.
 */
const panY = (change) => {
  panValue[1] += change;
};

export { panValue, panX, panY, viewCenter, setViewCenter };
