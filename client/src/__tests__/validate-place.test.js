import { boardData } from "../model/board-data";
import validatePlace from "../controller/validate-place";

jest.mock("../model/board-data", () => {
  const boardData = {
    "0,0": {
      status: "filled",
      background: "medium",
      foreground: "100000",
    },
    "0,1": {
      status: "available",
      background: null,
      foreground: null,
    },
    "1,0": {
      status: "filled",
      background: "dark",
      foreground: "100202",
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
  };

  return { boardData };
});

test("evaluates true for valid placement", () => {
  expect(validatePlace("0,1", "102120")).toBe(true);
});

test("evaluates false for invalid placement", () => {
  expect(validatePlace("0,1", "100010")).toBe(false);
});
