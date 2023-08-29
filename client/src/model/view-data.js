/// Public ///
/**
 * Absolute position of center tile on view. Represented as [x,y] in pixels.
 * @type {[number, number]}
 */
const viewCenter = [];

/**
 * Updates view center.
 * @param {[number, number]} newCenter New view center, represented as absolute position [x,y] in pixels.
 */
const setViewCenter = (newCenter) => {
  viewCenter[0] = newCenter[0];
  viewCenter[1] = newCenter[1];
};

export { viewCenter, setViewCenter };
