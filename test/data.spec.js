/* eslint camelcase: "off"*/

import {
  filterPeriod,
  validatePeriod,
  totalAccidents,
  orderAccidents,
  average
} from "../src/data.js";

const arrDataYears = [
  { total: 19861, motos: 6236, carros: 20519, year: "1960" },
  { total: 19841, motos: 636, carros: 205134609, year: "2000" },
  { total: 19861, motos: 6036, carros: 209, year: "2001" },
  { total: 1986861, motos: 60436, carros: 2051609, year: "2019" },
  { total: 1986861, motos: 60676, carros: 208, year: "2011" }
];

const arrayAcc = [2051609, 88652, 1378000, 18895, 87676];

describe("Testando filterPeriod", () => {
  test("É uma função", () => {
    expect(typeof filterPeriod).toEqual("function");
  });

  test("Retorna um objeto", () => {
    expect(typeof filterPeriod(arrDataYears, 2000, 2001)).toEqual("object");
  });

  test("Retorna array com o período selecionado", () => {
    expect(filterPeriod(arrDataYears, 2000, 2001)).toEqual([
      { total: 19841, motos: 636, carros: 205134609, year: "2000" },
      { total: 19861, motos: 6036, carros: 209, year: "2001" }
    ]);
  });

});

describe("Testando validatePeriod", () => {
  test("É uma função", () => {
    expect(typeof validatePeriod).toEqual("function");
  });

  test("Retorna um objeto se período for válido", () => {
    expect(typeof validatePeriod(arrDataYears, 2000, 2001)).toEqual("object");
  });

  test("Retorna uma string se período não for válido", () => {
    expect(typeof validatePeriod(arrDataYears, 20, 11)).toEqual("string");
  });

  test("Retorna uma string se período for igual a 0", () => {
    expect(validatePeriod(arrDataYears, 0, 11)).toEqual("Caractere Inválido");
  });

});

describe("Testando totalAccidents", () => {
  test("É uma função", () => {
    expect(typeof totalAccidents).toEqual("function");
  });

  test("Retorna um número", () => {
    expect(typeof totalAccidents(arrDataYears, "Carros")).toEqual("number");
  });

  test("Retorna total de acidentes de apenas um transporte", () => {
    expect(totalAccidents(arrDataYears, "Carros")).toEqual(207207154);
  });

  test("Retorna total de acidentes de todos os transportes", () => {
    expect(totalAccidents(arrDataYears, "Total")).toEqual(4033285);
  });

});

describe("Testando orderAccidents", () => {
  test("É uma função", () => {
    expect(typeof orderAccidents).toEqual("function");
  });

  test("Retorna um objeto", () => {
    expect(typeof orderAccidents(arrDataYears, "recent", "total", "carros")).toEqual("object");
  });

  test("Ordena do mais recente para o mais antigo", () => {
    expect(orderAccidents(arrDataYears, "recent", "total", "carros")).toEqual([
      { "carros": 205134609, "motos": 636, "total": 19841, "year": "2000" },
      { "carros": 2051609, "motos": 60436, "total": 1986861, "year": "2019" },
      { "carros": 20519, "motos": 6236, "total": 19861, "year": "1960" },
      { "carros": 209, "motos": 6036, "total": 19861, "year": "2001" },
      { "carros": 208, "motos": 60676, "total": 1986861, "year": "2011" }
    ]);
  });

  test("Ordena do mais antigo para o mais recente", () => {
    expect(orderAccidents(arrDataYears, "older", "total", "carros")).toEqual([
      {"carros": 208, "motos": 60676, "total": 1986861, "year": "2011"},
      {"carros": 209, "motos": 6036, "total": 19861, "year": "2001"},
      {"carros": 20519, "motos": 6236, "total": 19861, "year": "1960"},
      {"carros": 2051609, "motos": 60436, "total": 1986861, "year": "2019"},
      {"carros": 205134609, "motos": 636, "total": 19841, "year": "2000"}
    ]);
  });
});

describe("Testando average", () => {
  test("É uma função", () => {
    expect(typeof average).toEqual("function");
  });

  test("Retorna um objeto", () => {
    expect(typeof average(arrayAcc, 2)).toEqual("object");
  });

  test("Retorna um objeto com as médias de mais de um transporte", () => {
    expect(average(arrayAcc, 2)).toEqual([1025804, 44326, 689000, 9447, 43838]);
  });

  test("Retorna um objeto com as médias de um transporte", () => {
    expect(average(1025804, 2)).toEqual(512902);
  });

});