/* eslint camelcase: "off"*/

// const = require("../src/data.js");

import { 
  filterPeriod,
  validatePeriod,
  totalAccidents,
  orderAccidents,
  average } from "../src/data.js";

const arrDataYears = [{Year: "1960-01-04"}, {Year: "2000-01-04"}, {Year: "2001-01-04"}, {Year: "2019-01-04"}, {Year: "2011-01-04"}];
const arrayAcc = [2051609, 88652, 1378000, 18895, 87676];

describe("Testando filterPeriod", () =>{
  test("Retorna um objeto", () =>{
    expect(typeof filterPeriod(arrDataYears, 2000, 2001)).toEqual("object");
  });
});

//   test("Retorna array filtrada", () => {
//     expect(filterPeriod(arrDataYears, 2000, 2011)).toEqual([{Year: "2000-01-04"}, {Year: "2001-01-04"}, {Year: "2011-01-04"}]);
//   });

//   test("Exibe mensagem quando year é letra", () =>{
//     expect(filterPeriod(arrDataYears, 0, 2010)).toEqual("Caractere Inválido");
//   });

//   test("Exibe mensagem quando initialYear é menor que 2000 ou finalYear é maior que 2015", () =>{
//     expect(filterPeriod(arrDataYears, 1960, 2010)).toEqual("Período Inválido");
//   });

//   test("Período quando finalYear < initialYear", () => {
//     expect(filterPeriod(arrDataYears, 2001, 2000)).toEqual("Período Inválido");
//   });
// });

// describe("Testando totalAccidents", () =>{
//   test("Retorna um número", () =>{
//     expect(typeof totalAccidents(arrayAcc)).toEqual("number");
//   });

//   test("Pega total do Array", () =>{
//     expect(totalAccidents(arrayAcc)).toEqual(3624832);
//   });
// });

// describe("Testando average", () =>{
//   test("Retorna um objeto se selectTransport = \"Todos\"", () =>{
//     expect(typeof average(arrDataYears, 2001, 2004, "Todos")).toEqual("object");
//   });

//   test("Retorna número selectTransport != \"Todos\"", () =>{
//     expect(typeof average(arrDataYears, 2001, 2004, "Carro")).toEqual("number");
//   });

//   test("Retorna array com médias por ano", () =>{
//     const testAverage = [{Year: "1960-01-04", Total_Injured_Persons_Passenger_Car_Occupants: 2051609, Total_Injured_Persons_Passenger_Or_Occupant: null, Total_Injured_Persons_Motorcyclists: 57723},
//       {Year: "2000-01-04", Total_Injured_Persons_Passenger_Car_Occupants: 1474536, Total_Injured_Persons_Passenger_Or_Occupant: 15702, Total_Injured_Persons_Motorcyclists: 88652},
//       {Year: "2011-01-04", Total_Injured_Persons_Passenger_Car_Occupants: 1378000, Total_Injured_Persons_Passenger_Or_Occupant: 18895, Total_Injured_Persons_Motorcyclists: 88000}];

//     expect(average(testAverage, 2000, 2011, "Todos")).toEqual([1443566, 88326, 1531892]);
//   });
// });
