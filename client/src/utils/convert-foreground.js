/**
 * Converts foreground hash to array of edge types.
 * @param {foregroundHash} foregroundHash String representing tile foreground.
 * @returns {[]} Foreground edge types from top going clockwise, each represented as a numeric character.
 */
const convertForeground = (foregroundHash) => foregroundHash.split("");

export default convertForeground;
