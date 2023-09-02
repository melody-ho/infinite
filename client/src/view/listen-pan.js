/// Imports ///
import { pan } from "../model/view-data";

/// Constants ///
/**
 * Speed of pan with keyboard, in pixels.
 */
const SPEED = 20;

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
    pan.changeX(SPEED);
  }
};

/**
 * Decrease x of pan value if within bounds.
 */
const decreaseX = () => {
  if (pan.x > pan.getLimits().xMin) {
    pan.changeX(-SPEED);
  }
};

/**
 * Increase y of pan value if within bounds.
 */
const increaseY = () => {
  if (pan.y < pan.getLimits().yMax) {
    pan.changeY(SPEED);
  }
};

/**
 * Decrease y of pan value if within bounds.
 */
const decreaseY = () => {
  if (pan.y > pan.getLimits().yMin) {
    pan.changeY(-SPEED);
  }
};

/// Public ///
/**
 * Adds listeners for view panning.
 */
const listenPan = () => {
  // initialize css variables //
  applyPan();

  // keyboard controls //
  // track keys pressed
  let d = false;
  let a = false;
  let w = false;
  let s = false;

  document.addEventListener("keydown", (e) => {
    if (e.key === "d") {
      d = true;
    }
    if (e.key === "a") {
      a = true;
    }
    if (e.key === "w") {
      w = true;
    }
    if (e.key === "s") {
      s = true;
    }
    if (d && !a && !w && !s) {
      decreaseX();
      applyPan();
    }
    if (a && !d && !w && !s) {
      increaseX();
      applyPan();
    }
    if (w && !d && !a && !s) {
      increaseY();
      applyPan();
    }
    if (s && !d && !a && !w) {
      decreaseY();
      applyPan();
    }
    if (d && w && !a && !s) {
      decreaseX();
      increaseY();
      applyPan();
    }
    if (d && s && !a && !w) {
      decreaseX();
      decreaseY();
      applyPan();
    }
    if (a && w && !d && !s) {
      increaseX();
      increaseY();
      applyPan();
    }
    if (a && s && !d && !w) {
      increaseX();
      decreaseY();
      applyPan();
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "d") {
      d = false;
    }
    if (e.key === "a") {
      a = false;
    }
    if (e.key === "w") {
      w = false;
    }
    if (e.key === "s") {
      s = false;
    }
  });

  const board = document.querySelector(".board");

  // mouse contorls //
  let dragStartX = 0;
  let dragStartY = 0;
  let dragDeltaX = 0;
  let dragDeltaY = 0;

  board.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  board.addEventListener("mousedown", (startEvent) => {
    dragStartX = startEvent.clientX;
    dragStartY = startEvent.clientY;
    board.addEventListener("mousemove", handleDrag);
    board.addEventListener("mouseup", handleDragEnd);
    board.addEventListener("mouseleave", handleDragEnd);
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
    board.removeEventListener("mousemove", handleDrag);
    board.removeEventListener("mouseup", handleDragEnd);
    board.removeEventListener("mouseleave", handleDragEnd);
  };

  // touch controls //
  let touchStartX = 0;
  let touchStartY = 0;
  let touchDeltaX = 0;
  let touchDeltaY = 0;

  board.addEventListener("touchstart", (startEvent) => {
    startEvent.preventDefault();
    touchStartX = startEvent.touches[0].clientX;
    touchStartY = startEvent.touches[0].clientY;
    board.addEventListener("touchmove", handleTouchMove);
    board.addEventListener("touchend", handleTouchEnd);
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
    board.removeEventListener("touchmove", handleTouchMove);
    board.removeEventListener("touchend", handleTouchEnd);
  };
};

export default listenPan;
