import getForeground from "../view/get-foreground";

test("get foreground that doesn't require rotation", () => {
  expect(getForeground("222021")).toEqual(["222021", 0]);
});

test("get foreground that require rotation", () => {
  expect(getForeground("220221")).toEqual(["221220", 180]);
});
