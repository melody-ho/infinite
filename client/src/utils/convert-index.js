/**
 * Converts index from string to array of numbers.
 * @param {string} index "x,y" with x and y being numeric characters.
 * @returns {[number, number]} [x,y] with x and y being numbers.
 */
const convertIndex = (index) => {
  let [x, y] = index.split(",");
  x = Number(x);
  y = Number(y);

  return [x, y];
};

export default convertIndex;
