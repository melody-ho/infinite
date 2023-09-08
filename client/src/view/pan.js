/// Imports ///
import { pan, tiles, zoom } from "../model/view-data";

/// Constants ///
/**
 * Interval between steps when panning with keyboard, in ms.
 */
const KEYBOARD_PAN_INTERVAL = 100;
/**
 * Distance to move for each step when panning with keyboard, represented as number of tile sizes (tile size = tile width / size factor).
 */
const KEYBOARD_STEP_SIZE = 2;
/**
 * Pan transition property.
 */
const PAN_TRANSITION = "transform 0.2s ease";
/**
 * Duration of transition for each step when panning with keyboard, in ms.
 */
const PAN_TRANSITION_DURATION = 200;

/// Private ///
/**
 * Applies pan data to DOM.
 */
const applyPan = () => {
  const board = document.querySelector(".board");
  board.style.setProperty("--move-x", `${pan.x}px`);
  board.style.setProperty("--move-y", `${pan.y}px`);
};

/**
 * Increase x of pan value if within bounds.
 */
const increaseX = () => {
  if (pan.x < pan.getLimits().xMax) {
    pan.changeX(tiles.size * KEYBOARD_STEP_SIZE);
  }
};

/**
 * Decrease x of pan value if within bounds.
 */
const decreaseX = () => {
  if (pan.x > pan.getLimits().xMin) {
    pan.changeX(tiles.size * -KEYBOARD_STEP_SIZE);
  }
};

/**
 * Increase y of pan value if within bounds.
 */
const increaseY = () => {
  if (pan.y < pan.getLimits().yMax) {
    pan.changeY(tiles.size * KEYBOARD_STEP_SIZE);
  }
};

/**
 * Decrease y of pan value if within bounds.
 */
const decreaseY = () => {
  if (pan.y > pan.getLimits().yMin) {
    pan.changeY(tiles.size * zoom.factor * -KEYBOARD_STEP_SIZE);
  }
};

/**
 * Tracks active panning with keyboard.
 */
const keys = {
  d: false,
  a: false,
  w: false,
  s: false,
};

/// Public ///
/**
 * Updates pan bounds and adjusts pan position to reflect new limits.
 */
const updatePan = () => {
  // update pan bounds //
  const { xMin, xMax, yMin, yMax } = pan.getLimits();

  if (pan.x < xMin) {
    pan.x = xMin;
  }
  if (pan.x > xMax) {
    pan.x = xMax;
  }
  if (pan.y < yMin) {
    pan.y = yMin;
  }
  if (pan.y > yMax) {
    pan.y = yMax;
  }

  // adjust pan position //
  const board = document.querySelector(".board");
  // add transition to smoothen adjustment
  board.style.setProperty("--pan-transition", PAN_TRANSITION);
  // adjust pan position
  board.style.setProperty("--move-x", `${pan.x}px`);
  board.style.setProperty("--move-y", `${pan.y}px`);
  // remove transition if no active keyboard panning when adjustment ends
  setTimeout(() => {
    if (!keys.d && !keys.a && !keys.w && !keys.s) {
      board.style.setProperty("--pan-transition", "none");
    }
  }, PAN_TRANSITION_DURATION);
};

/**
 * Adds listeners for view panning.
 */
const listenPan = () => {
  // initialize css variables //
  applyPan();

  // keyboard controls //
  // pan according to keys currently pressed
  const move = () => {
    if (keys.d && !keys.a && !keys.w && !keys.s) {
      decreaseX();
      applyPan();
    }
    if (keys.a && !keys.d && !keys.w && !keys.s) {
      increaseX();
      applyPan();
    }
    if (keys.w && !keys.d && !keys.a && !keys.s) {
      increaseY();
      applyPan();
    }
    if (keys.s && !keys.d && !keys.a && !keys.w) {
      decreaseY();
      applyPan();
    }
    if (keys.d && keys.w && !keys.a && !keys.s) {
      decreaseX();
      increaseY();
      applyPan();
    }
    if (keys.d && keys.s && !keys.a && !keys.w) {
      decreaseX();
      decreaseY();
      applyPan();
    }
    if (keys.a && keys.w && !keys.d && !keys.s) {
      increaseX();
      increaseY();
      applyPan();
    }
    if (keys.a && keys.s && !keys.d && !keys.w) {
      increaseX();
      decreaseY();
      applyPan();
    }
  };
  let currentInterval = setInterval(move, KEYBOARD_PAN_INTERVAL);

  document.addEventListener("keydown", (e) => {
    // update keys pressed
    if (e.key === "d") {
      keys.d = true;
    }
    if (e.key === "a") {
      keys.a = true;
    }
    if (e.key === "w") {
      keys.w = true;
    }
    if (e.key === "s") {
      keys.s = true;
    }

    // add keyboard pan transition
    if (keys.d || keys.a || keys.w || keys.s) {
      const board = document.querySelector(".board");
      board.style.setProperty("--pan-transition", PAN_TRANSITION);
    }
  });

  document.addEventListener("keyup", (e) => {
    // update keys pressed
    if (e.key === "d") {
      keys.d = false;
    }
    if (e.key === "a") {
      keys.a = false;
    }
    if (e.key === "w") {
      keys.w = false;
    }
    if (e.key === "s") {
      keys.s = false;
    }

    if (!keys.d && !keys.a && !keys.w && !keys.s) {
      // reset move interval to prevent delay in response
      clearInterval(currentInterval);
      currentInterval = setInterval(move, KEYBOARD_PAN_INTERVAL);

      // remove keyboard transition if no keys are pressed when transition ends
      setTimeout(() => {
        if (!keys.d && !keys.a && !keys.w && !keys.s) {
          const board = document.querySelector(".board");
          board.style.setProperty("--pan-transition", "none");
        }
      }, PAN_TRANSITION_DURATION);
    }
  });

  const viewBox = document.querySelector(".view-box");
  // mouse contorls //
  let dragStartX = 0;
  let dragStartY = 0;
  let dragDeltaX = 0;
  let dragDeltaY = 0;

  viewBox.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  viewBox.addEventListener("mousedown", (startEvent) => {
    dragStartX = startEvent.clientX;
    dragStartY = startEvent.clientY;
    viewBox.addEventListener("mousemove", handleDrag);
    viewBox.addEventListener("mouseup", handleDragEnd);
    viewBox.addEventListener("mouseleave", handleDragEnd);
  });

  const handleDrag = (dragEvent) => {
    const { xMin, xMax, yMin, yMax } = pan.getLimits();
    dragDeltaX = dragEvent.clientX - dragStartX;
    dragDeltaY = dragEvent.clientY - dragStartY;

    if ((dragDeltaX > 0 && pan.x < xMax) || (dragDeltaX < 0 && pan.x > xMin)) {
      pan.changeX(dragDeltaX);
      dragStartX = dragEvent.clientX;
    }
    if ((dragDeltaY > 0 && pan.y < yMax) || (dragDeltaY < 0 && pan.y > yMin)) {
      pan.changeY(dragDeltaY);
      dragStartY = dragEvent.clientY;
    }

    applyPan();
  };

  const handleDragEnd = () => {
    dragDeltaX = 0;
    dragDeltaY = 0;
    viewBox.removeEventListener("mousemove", handleDrag);
    viewBox.removeEventListener("mouseup", handleDragEnd);
    viewBox.removeEventListener("mouseleave", handleDragEnd);
  };

  // touch controls //
  let touchStartX = 0;
  let touchStartY = 0;
  let touchDeltaX = 0;
  let touchDeltaY = 0;

  viewBox.addEventListener("touchstart", (startEvent) => {
    startEvent.preventDefault();
    touchStartX = startEvent.touches[0].clientX;
    touchStartY = startEvent.touches[0].clientY;
    viewBox.addEventListener("touchmove", handleTouchMove);
    viewBox.addEventListener("touchend", handleTouchEnd);
  });

  const handleTouchMove = (moveEvent) => {
    const { xMin, xMax, yMin, yMax } = pan.getLimits();
    touchDeltaX = moveEvent.touches[0].clientX - touchStartX;
    touchDeltaY = moveEvent.touches[0].clientY - touchStartY;

    if (
      (touchDeltaX > 0 && pan.x < xMax) ||
      (touchDeltaX < 0 && pan.x > xMin)
    ) {
      pan.changeX(touchDeltaX);
      touchStartX = moveEvent.touches[0].clientX;
    }
    if (
      (touchDeltaY > 0 && pan.y < yMax) ||
      (touchDeltaY < 0 && pan.y > yMin)
    ) {
      pan.changeY(touchDeltaY);
      touchStartY = moveEvent.touches[0].clientY;
    }

    applyPan();
  };

  const handleTouchEnd = () => {
    touchDeltaX = 0;
    touchDeltaY = 0;
    viewBox.removeEventListener("touchmove", handleTouchMove);
    viewBox.removeEventListener("touchend", handleTouchEnd);
  };
};

export { listenPan, updatePan };
