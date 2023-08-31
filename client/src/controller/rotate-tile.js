/// Imports ///
import convertForeground from "../utils/convert-foreground";
import { nextTile } from "../model/board-data";

/// Public ///
/**
 * Updates next tile in board data when it is rotated.
 * @param {"right" | "left"} direction Direction of rotation.
 */
const rotateTile = (direction) => {
  const oldForeground = convertForeground(nextTile.foreground);
  const newForeground = new Array(6);
  for (let i = 0; i < oldForeground.length; i += 1) {
    const newIndex = direction === "right" ? (i + 1) % 6 : (6 + i - 1) % 6;
    newForeground[newIndex] = oldForeground[i];
  }

  nextTile.foreground = newForeground.join("");
};

export default rotateTile;
