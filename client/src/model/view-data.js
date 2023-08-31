/// Constants ///
/**
 * tile width  = tile size * SIZE_FACTOR
 */
const SIZE_FACTOR = 4;

/// Public ///
/**
 * Object containing tile size, tile width and their getters and setters.
 * @type {Object}
 */
const tileSize = {
  /**
   * Tile size, in pixels. (width = size * size factor)
   * @type {?number}
   */
  size: null,
  /**
   * Size factor. (width = size * size factor)
   * @const {number}
   */
  sizeFactor: SIZE_FACTOR,
  /**
   * Get tile size, in pixels. (width = size * size factor)
   */
  get get() {
    return this.size;
  },
  /**
   * Get tile width, in pixels. (width = size * size factor)
   */
  get getWidth() {
    return this.size * this.sizeFactor;
  },
  /**
   * Set tile size.
   * @param {number} newSize New size of tiles, in pixels. (width = size * 4)
   */
  set set(newSize) {
    this.size = newSize;
  },
};

/**
 * Object containing view width, view height, view center, cursor position and their getters and setters.
 * @type {Object}
 */
const view = {
  /**
   * View width, in pixels.
   * @type {number}
   */
  w: 0,
  /**
   * View height, in pixels.
   * @type {number}
   */
  h: 0,
  /**
   * Absolute position of center tile. Represented as [x,y] in pixels.
   */
  center: [0, 0],
  /**
   * Last logged cursor position. Represented as [x,y] in pixels.
   * @type {[number, number]}
   */
  cursor: [0, 0],
  /**
   * Set new view width and update x position of center tile.
   * @param {number} newWidth New view width, in pixels.
   */
  set width(newWidth) {
    this.w = newWidth;
    this.center[0] = newWidth / 2 - tileSize.getWidth / 2;
  },
  /**
   * Set new view height and update y position of center tile.
   * @param {number} newHeight New view height, in pixels.
   */
  set height(newHeight) {
    this.h = newHeight;
    this.center[1] = newHeight / 2 - tileSize.getWidth / 2;
  },
  /**
   * Get x position of center tile, in pixels.
   */
  get centerX() {
    return this.center[0];
  },
  /**
   * Get y position of center tile, in pixels.
   */
  get centerY() {
    return this.center[1];
  },
  /**
   * Get x position of cursor, in pixels.
   */
  get cursorX() {
    return this.cursor[0];
  },
  /**
   * Set x position of cursor, in pixels.
   * @param {number} x New x position of cursor, in pixels.
   */
  set cursorX(x) {
    this.cursor[0] = x;
  },
  /**
   * Get y position of cursor, in pixels.
   */
  get cursorY() {
    return this.cursor[1];
  },
  /**
   * Set y position of cursor, in pixels.
   * @param {number} y New y position of cursor, in pixels.
   */
  set cursorY(y) {
    this.cursor[1] = y;
  },
};

/**
 * Object containing pan data and its methods.
 * @type {Object}
 */
const pan = {
  /**
   * Distance from original position. Represented as [x,y] in pixels.
   * @type {[number, number]}
   */
  distance: [0, 0],
  /**
   * Absolute position of tiles furthest from center, in pixels. Values are null when there are no tiles rendered.
   * @type {{"top": ?number, "right": ?number, "bottom": ?number, "left": ?number}}
   */
  bounds: {
    top: null,
    right: null,
    bottom: null,
    left: null,
  },
  /**
   * Get x distance from original position, in pixels.
   */
  get x() {
    return this.distance[0];
  },
  /**
   * Set new x distance from original position, in pixels.
   * @param {number} newX
   */
  set x(newX) {
    this.distance[0] = newX;
  },
  /**
   * Get y distance from original position, in pixels.
   */
  get y() {
    return this.distance[1];
  },
  /**
   * Set new y distance from original position, in pixels.
   * @param {number} newY
   */
  set y(newY) {
    this.distance[1] = newY;
  },
  /**
   * Change x distance by a certain amount.
   * @param {number} change Change in x, in pixels.
   */
  changeX(change) {
    this.distance[0] += change;
  },
  /**
   * Change y distance by a certain amount.
   * @param {number} change Change in y, in pixels.
   */
  changeY(change) {
    this.distance[1] += change;
  },
  /**
   * Resets pan values to 0.
   */
  resetDistance() {
    this.distance = [0, 0];
  },
  /**
   * Reset pan bounds.
   */
  resetBounds() {
    this.bounds.top = null;
    this.bounds.right = null;
    this.bounds.bottom = null;
    this.bounds.left = null;
  },
  /**
   * Gets pan limits.
   * @returns {{xMin: number, xMax: number, yMin: number, yMax: number}}
   */
  getLimits() {
    const xMin = -this.bounds.right;
    const xMax = view.w - this.bounds.left - tileSize.getWidth;
    const yMin = -(view.h - this.bounds.bottom - tileSize.getWidth);
    const yMax = this.bounds.top;

    return { xMin, xMax, yMin, yMax };
  },
};

export { pan, tileSize, view };
