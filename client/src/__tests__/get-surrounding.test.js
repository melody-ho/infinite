import getSurrounding from "../helpers/get-surrounding";

test("center index 0,0", () => {
  expect(getSurrounding("0,0")).toEqual([
    "0,1",
    "1,0",
    "1,-1",
    "0,-1",
    "-1,-1",
    "-1,0",
  ]);
});

test("positive center index with even x", () => {
  expect(getSurrounding("2,3")).toEqual([
    "2,4",
    "3,3",
    "3,2",
    "2,2",
    "1,2",
    "1,3",
  ]);
});

test("positive center index with odd x", () => {
  expect(getSurrounding("5,2")).toEqual([
    "5,3",
    "6,3",
    "6,2",
    "5,1",
    "4,2",
    "4,3",
  ]);
});

test("negative center index with even x", () => {
  expect(getSurrounding("-4,-6")).toEqual([
    "-4,-5",
    "-3,-6",
    "-3,-7",
    "-4,-7",
    "-5,-7",
    "-5,-6",
  ]);
});

test("negative index with odd x", () => {
  expect(getSurrounding("-1, -11")).toEqual([
    "-1,-10",
    "0,-10",
    "0,-11",
    "-1,-12",
    "-2,-11",
    "-2,-10",
  ]);
});
