import { boardData, addTileData } from "../model/board-data";

test("add to empty board", () => {
  addTileData("0,0", "medium", "000000");

  expect(boardData).toEqual({
    "0,0": {
      status: "filled",
      background: "medium",
      foreground: "000000",
    },
    "0,1": {
      status: "available",
      background: null,
      foreground: null,
    },
    "1,0": {
      status: "available",
      background: null,
      foreground: null,
    },
    "1,-1": {
      status: "available",
      background: null,
      foreground: null,
    },
    "0,-1": {
      status: "available",
      background: null,
      foreground: null,
    },
    "-1,-1": {
      status: "available",
      background: null,
      foreground: null,
    },
    "-1,0": {
      status: "available",
      background: null,
      foreground: null,
    },
  });
});

test("add next to existing tile", () => {
  addTileData("1,0", "dark", "100000");

  expect(boardData).toEqual({
    "0,0": {
      status: "filled",
      background: "medium",
      foreground: "000000",
    },
    "0,1": {
      status: "available",
      background: null,
      foreground: null,
    },
    "1,0": {
      status: "filled",
      background: "dark",
      foreground: "100000",
    },
    "1,-1": {
      status: "available",
      background: null,
      foreground: null,
    },
    "0,-1": {
      status: "available",
      background: null,
      foreground: null,
    },
    "-1,-1": {
      status: "available",
      background: null,
      foreground: null,
    },
    "-1,0": {
      status: "available",
      background: null,
      foreground: null,
    },
    "1,1": {
      status: "available",
      background: null,
      foreground: null,
    },
    "2,1": {
      status: "available",
      background: null,
      foreground: null,
    },
    "2,0": {
      status: "available",
      background: null,
      foreground: null,
    },
  });
});
