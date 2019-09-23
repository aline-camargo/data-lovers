/* eslint camelcase: "off"*/

const origin = require("../src/data.js");

const arrDataYears = [{Year: "1960-01-04"}, {Year: "2000-01-04"}, {Year: "2001-01-04"}, {Year: "2019-01-04"}, {Year: "2011-01-04"}];
const arrDataTransport = [{Total_Injured_Persons_Passenger_Car_Occupants: 2051609, Total_Injured_Persons_Passenger_Or_Occupant: null, Total_Injured_Persons_Motorcyclists: 57723},
  {Total_Injured_Persons_Passenger_Car_Occupants: 1474536, Total_Injured_Persons_Passenger_Or_Occupant: 15702, Total_Injured_Persons_Motorcyclists: 88652},
  {Total_Injured_Persons_Passenger_Car_Occupants: 1378000, Total_Injured_Persons_Passenger_Or_Occupant: 18895, Total_Injured_Persons_Motorcyclists: 88000}];

describe("Testando filterPeriod", () =>{
  test("É um objeto", () =>{
    expect(typeof origin.filterPeriod(arrDataYears, 2000, 2001)).toEqual("object");
  });

  test("Retorna array filtrada", () => {
    expect(origin.filterPeriod(arrDataYears, 2000, 2011)).toEqual([{Year: "2000-01-04"}, {Year: "2001-01-04"}, {Year: "2011-01-04"}]);
  });

  test("Exibe mensagem quando year é letra", () =>{
    expect(origin.filterPeriod(arrDataYears, 0, 2010)).toEqual("Caractere Inválido");
  });

  test("Exibe mensagem quando initialYear é menor que 2000 ou finalYear é maior que 2015", () =>{
    expect(origin.filterPeriod(arrDataYears, 1960, 2010)).toEqual("Período Inválido");
  });

  test("Período quando finalYear < initialYear", () => {
    expect(origin.filterPeriod(arrDataYears, 2001, 2000)).toEqual("Período Inválido");
  });
});

describe("Testando filterTransport", () =>{
  test("É um objeto", () =>{
    expect(typeof origin.filterTransport(arrDataTransport, "Carro")).toEqual("object");
  });
  test("Filtra por transporte", () =>{
    expect(origin.filterTransport(arrDataTransport, "Carro")).toEqual([2051609, 1490238, 1396895]);
  });

});
