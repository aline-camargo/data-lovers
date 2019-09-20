const origin = require("../src/data.js");

const arrData = [{Year: "1960-01-04"}, {Year: "2000-01-04"}, {Year: "2001-01-04"}, {Year: "2019-01-04"}, {Year: "2011-01-04"}];
// const filterYears = src.window.data.filterYears;
describe("testando filterYears", () =>{
  it("filterYears retorna array filtrada", () => {
    expect(origin.filterPeriod(arrData, 2000, 2011)).toEqual([{Year: "2000-01-04"}, {Year: "2001-01-04"}, {Year: "2011-01-04"}]);
  });

  it("exibe mensagem quando year é letra", () =>{
    expect(origin.filterPeriod(arrData, 0, 2010)).toEqual("Inválido");
  });

});
//   it("returns `example`", () => {
//     expect(example()).toBe("example");
//   });
// });
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });
