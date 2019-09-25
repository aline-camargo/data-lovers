/* eslint camelcase: "off"*/

const origin = require("../src/data.js");

const arrDataYears = [{Year: "1960-01-04"}, {Year: "2000-01-04"}, {Year: "2001-01-04"}, {Year: "2019-01-04"}, {Year: "2011-01-04"}];
const arrDataTransport = [{Total_Injured_Persons_Passenger_Car_Occupants: 2051609, Total_Injured_Persons_Passenger_Or_Occupant: null, Total_Injured_Persons_Motorcyclists: 57723},
  {Total_Injured_Persons_Passenger_Car_Occupants: 1474536, Total_Injured_Persons_Passenger_Or_Occupant: 15702, Total_Injured_Persons_Motorcyclists: 88652},
  {Total_Injured_Persons_Passenger_Car_Occupants: 1378000, Total_Injured_Persons_Passenger_Or_Occupant: 18895, Total_Injured_Persons_Motorcyclists: 88000}];
const arrayAcc = [2051609, 88652, 1378000, 18895, 87676];
const arrayYears = ["1960", "2000", "2001", "2019", "2011"];

describe("Testando filterPeriod", () =>{
  test("Retorna um objeto", () =>{
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
  test("Retorna um objeto", () =>{
    expect(typeof origin.filterTransport(arrDataTransport, "Carro")).toEqual("object");
  });

  test("Filtra por transporte", () =>{
    expect(origin.filterTransport(arrDataTransport, "Carro")).toEqual([2051609, 1490238, 1396895]);
  });

  test("Exibe mensagem quando não é selecionado um transporte", () =>{
    expect(origin.filterTransport(arrDataTransport, "identificator")).toEqual("Selecione um Transporte");
  });
});

describe("Testando totalAccidentsPeriodTransport", () =>{
  test("Retorna um número", () =>{
    expect(typeof origin.totalAccidentsPeriodTransport(arrayAcc)).toEqual("number");
  });

  test("Pega total do Array", () =>{
    expect(origin.totalAccidentsPeriodTransport(arrayAcc)).toEqual(3624832);
  });
});

describe("Testando filterYears", () =>{
  test("Retorna um objeto", () =>{
    expect(typeof origin.filterYears(arrDataYears)).toEqual("object");
  });

  test("Retorna array com os anos", ()=>{
    expect(origin.filterYears(arrDataYears)).toEqual(["1960", "2000", "2001", "2019", "2011"]);
  });
});

describe("Testando tableBaseMaker", () =>{
  test("Retorna um objeto", () =>{
    const arrDataYears = [{Year: "1960-01-04"}, {Year: "2000-01-04"}, {Year: "2001-01-04"}, {Year: "2019-01-04"}, {Year: "2011-01-04"}];
    const arrDataTransport = [{Total_Injured_Persons_Passenger_Car_Occupants: 2051609, Total_Injured_Persons_Passenger_Or_Occupant: null, Total_Injured_Persons_Motorcyclists: 57723},
      {Total_Injured_Persons_Passenger_Car_Occupants: 1474536, Total_Injured_Persons_Passenger_Or_Occupant: 15702, Total_Injured_Persons_Motorcyclists: 88652},
      {Total_Injured_Persons_Passenger_Car_Occupants: 1378000, Total_Injured_Persons_Passenger_Or_Occupant: 18895, Total_Injured_Persons_Motorcyclists: 88000}];
    const arrayAcc = [2051609, 88652, 1378000, 18895, 87676];
    const arrayYears = ["1960", "2000", "2001", "2019", "2011"];
    expect(typeof origin.tableBaseMaker(arrayYears, arrayAcc, "Carro", arrDataYears)).toEqual("object");
  });

  test("Retorna array c/ anos e acidentes", () =>{
    const arrDataYears = [{Year: "1960-01-04"}, {Year: "2000-01-04"}, {Year: "2001-01-04"}, {Year: "2019-01-04"}, {Year: "2011-01-04"}];
    const arrDataTransport = [{Total_Injured_Persons_Passenger_Car_Occupants: 2051609, Total_Injured_Persons_Passenger_Or_Occupant: null, Total_Injured_Persons_Motorcyclists: 57723},
      {Total_Injured_Persons_Passenger_Car_Occupants: 1474536, Total_Injured_Persons_Passenger_Or_Occupant: 15702, Total_Injured_Persons_Motorcyclists: 88652},
      {Total_Injured_Persons_Passenger_Car_Occupants: 1378000, Total_Injured_Persons_Passenger_Or_Occupant: 18895, Total_Injured_Persons_Motorcyclists: 88000}];
    const arrayAcc = [2051609, 88652, 1378000, 18895, 87676];
    const arrayYears = ["1960", "2000", "2001", "2019", "2011"];
    expect(origin.tableBaseMaker(arrayYears, arrayAcc, "Carro", arrDataYears)).toEqual([["1960", "2051609"], ["2000", "88652"], ["2001", "1378000"], ["2019", "18895"], ["2011", "87676"]]);
  });
});

describe("Testando average", () =>{
  test("Retorna um objeto se selectTransport = \"Todos\"", () =>{
    expect(typeof origin.average(arrDataYears, 2001, 2004, "Todos")).toEqual("object");
  });

  test("Retorna número selectTransport != \"Todos\"", () =>{
    expect(typeof origin.average(arrDataYears, 2001, 2004, "Carro")).toEqual("number");
  });

  test("Retorna array com médias por ano", () =>{
    const testAverage = {Year: "1960-01-04", Total_Injured_Persons_Passenger_Car_Occupants: 2051609, Total_Injured_Persons_Passenger_Or_Occupant: null, Total_Injured_Persons_Motorcyclists: 57723},
    {Year: "2000-01-04", Total_Injured_Persons_Passenger_Car_Occupants: 1474536, Total_Injured_Persons_Passenger_Or_Occupant: 15702, Total_Injured_Persons_Motorcyclists: 88652},
    {Year: "2011-01-04", Total_Injured_Persons_Passenger_Car_Occupants: 1378000, Total_Injured_Persons_Passenger_Or_Occupant: 18895, Total_Injured_Persons_Motorcyclists: 88000}];

    expect(origin.average(testAverage, 2000, 2011, "Todos")).toEqual([1443566, 88326, 1531892]);
  });
});
