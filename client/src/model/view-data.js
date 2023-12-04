/// Public ///
/**
 * Object containing information for rendering tiles..
 * @type {Object}
 */
const tiles = {
  /**
   * Tile size, in pixels. (width = size * size factor)
   * @type {?number}
   */
  tileSize: null,
  /**
   * Size factor. (width = size * size factor)
   * @const {number}
   */
  sizeFactor: 4,
  /**
   * Last logged absolute position of next tile that tracks cursor. Represented as [left offset, top offset] in pixels.
   * @type {[number, number]}
   */
  trackingNextTile: [0, 0],
  /**
   * Get tile size, in pixels. (width = size * size factor)
   */
  get size() {
    return this.tileSize;
  },
  /**
   * Set tile size.
   * @param {number} newSize New tile size, in pixels. (width = size * size factor)
   */
  set size(newSize) {
    this.tileSize = newSize;
  },
  /**
   * Get tile width, in pixels. (width = size * size factor)
   */
  get width() {
    return this.size * this.sizeFactor;
  },
  /**
   * Get left offset of next tile that tracks cursor, in pixels.
   */
  get trackingLeft() {
    return this.trackingNextTile[0];
  },
  /**
   * Set left offset of next tile that tracks cursor, in pixels.
   * @param {number} newOffset New left offset of next tile, in pixels.
   */
  set trackingLeft(newOffset) {
    this.trackingNextTile[0] = newOffset;
  },
  /**
   * Get top offset of next tile that tracks cursor, in pixels.
   */
  get trackingTop() {
    return this.trackingNextTile[1];
  },
  /**
   * Set top offset of next tile that tracks cursor, in pixels.
   * @param {number} newOffset New top offset of next tile, in pixels.
   */
  set trackingTop(newOffset) {
    this.trackingNextTile[1] = newOffset;
  },
};

/**
 * Object containing view width, view height, view center, and their getters and setters.
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
   * Get view width, in pixels.
   */
  get width() {
    return this.w;
  },
  /**
   * Set new view width.
   * @param {number} newWidth New view width, in pixels.
   */
  set width(newWidth) {
    this.w = newWidth;
  },
  /**
   * Get view height, in pixels.
   */
  get height() {
    return this.h;
  },
  /**
   * Set new view height.
   * @param {number} newHeight New view height, in pixels.
   */
  set height(newHeight) {
    this.h = newHeight;
  },
  /**
   * Get left offset of center tile, in pixels.
   */
  get centerLeft() {
    return (this.w - tiles.width) / 2;
  },
  /**
   * Get top offset of center tile, in pixels.
   */
  get centerTop() {
    return (this.h - tiles.width) / 2;
  },
  /**
   * Get calculated left offset of center tile, in pixels.
   */
  get calculatedCenterLeft() {
    return (this.w - tiles.width * zoom.factor) / 2;
  },
  /**
   * Get calculated top offset of center tile, in pixels.
   */
  get calculatedCenterTop() {
    return (this.h - tiles.width * zoom.factor) / 2;
  },
};

/**
 * Object containing zoom factor and its getters and setters.
 * @type {Object}
 */
const zoom = {
  /**
   * Level of zoom.
   * @type {number}
   */
  zoomFactor: 1,
  /**
   * Get zoom factor.
   */
  get factor() {
    return this.zoomFactor;
  },
  /**
   * Set new zoom factor.
   * @param {number} newZoom New zoom factor.
   */
  set factor(newZoom) {
    this.zoomFactor = newZoom;
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
    const { xMin, xMax } = this.getLimits();
    if (this.distance[0] > xMax) {
      this.distance[0] = xMax;
    }
    if (this.distance[0] < xMin) {
      this.distance[0] = xMin;
    }
  },
  /**
   * Change y distance by a certain amount.
   * @param {number} change Change in y, in pixels.
   */
  changeY(change) {
    this.distance[1] += change;
    const { yMin, yMax } = this.getLimits();
    if (this.distance[1] > yMax) {
      this.distance[1] = yMax;
    }
    if (this.distance[1] < yMin) {
      this.distance[1] = yMin;
    }
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
    const xMin =
      (-view.calculatedCenterLeft -
        this.bounds.right * tiles.size * zoom.factor) /
      zoom.factor;
    const xMax =
      (view.w -
        view.calculatedCenterLeft -
        (this.bounds.left * tiles.size + tiles.width) * zoom.factor) /
      zoom.factor;
    const yMin =
      (-view.calculatedCenterTop +
        this.bounds.bottom * tiles.size * zoom.factor) /
      zoom.factor;
    const yMax =
      (view.h -
        view.calculatedCenterTop +
        (this.bounds.top * tiles.size - tiles.width) * zoom.factor) /
      zoom.factor;

    return { xMin, xMax, yMin, yMax };
  },
};

/**
 * Object containing location of current preview position and its getter and setter.
 * @type {Object}
 */
const preview = {
  /**
   * Index of preview location, represented as "x,y".
   * @type {string}
   */
  i: null,
  /**
   * Set index of preview location, represented as "x,y".
   * @param {string} newIndex Index of new preview location.
   */
  set index(newIndex) {
    this.i = newIndex;
  },
  /**
   * Get index of preview location, represented as "x,y".
   */
  get index() {
    return this.i;
  },
  /**
   * Reset preview location.
   */
  reset() {
    this.i = null;
  },
};

export { pan, preview, tiles, view, zoom };
