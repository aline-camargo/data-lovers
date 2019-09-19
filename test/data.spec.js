const sum = (a, b) => a + b;
const filterYears = src.window.data.filterYears;

test("filterYears", () => {
  expect(filterYears(2001, 2001)).toBe(3);
});

test("sum 1 - 2", () => {
  expect(sum(1, 2)).toBe(3);
});

//   it("returns `example`", () => {
//     expect(example()).toBe("example");
//   });
// });
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });
