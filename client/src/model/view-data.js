/// Constants ///
/**
 * tile width  = tile size * SIZE_FACTOR
 */
const SIZE_FACTOR = 4;

/// Public ///
/**
 * View size. Represented as [width, height] in pixels.
 * @type {[number, number]}
 */
const viewSize = [];

/**
 * Absolute position of center tile on view. Represented as [x,y] in pixels.
 * @type {[number, number]}
 */
const viewCenter = [];

/**
 * Distance to pan from original position. Represented as [x,y] in pixels.
 * @type {[number, number]}
 */
const panValue = [0, 0];

/**
 * Absolute position of tiles furthest from center, in pixels. Values are null when there are no tiles rendered.
 * @type {{"top": ?number, "right": ?number, "bottom": ?number, "left": ?number}}
 */
const panBounds = {
  top: null,
  right: null,
  bottom: null,
  left: null,
};

/**
 * Object containing current tile size and its getter and setter.
 * @type {Object}
 */
const tileSize = {
  /**
   * Size of tiles, in pixels. (width = currentSize * 4)
   * @type {?number}
   */
  currentSize: null,
  /**
   * Get tile size, in pixels. (width = tileSize * 4)
   * @type {?number}
   */
  get get() {
    return this.currentSize;
  },
  /**
   * Set tile size.
   * @param {number} newSize New size of tiles, in pixels. (width = newSize * 4)
   */
  set set(newSize) {
    this.currentSize = newSize;
  },
};

/**
 * Updates view size.
 * @param {[number, number]} newSize New view size, represented as [width, height] in pixels.
 */
const setViewSize = (newSize) => {
  viewSize[0] = newSize[0];
  viewSize[1] = newSize[1];
};

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

/**
 * Resets pan values to 0.
 */
const resetPan = () => {
  panValue[0] = 0;
  panValue[1] = 0;
};

/**
 * Reset pan bounds.
 */
const resetPanBounds = () => {
  panBounds.top = null;
  panBounds.right = null;
  panBounds.bottom = null;
  panBounds.left = null;
};

/**
 * Calculates pan limits.
 * @returns {{xMin: number, xMax: number, yMin: number, yMax: number}}
 */
const getPanLimits = () => {
  const xMin = -panBounds.right;
  const xMax = viewSize[0] - panBounds.left - tileSize.get * SIZE_FACTOR;
  const yMin = -(viewSize[1] - panBounds.bottom - tileSize.get * SIZE_FACTOR);
  const yMax = panBounds.top;

  return { xMin, xMax, yMax, yMin };
};

export {
  getPanLimits,
  panBounds,
  panValue,
  panX,
  panY,
  resetPan,
  resetPanBounds,
  setViewCenter,
  setViewSize,
  tileSize,
  viewCenter,
  viewSize,
};
