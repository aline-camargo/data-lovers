const injurieAccidents = INJURIES;
import helpers from "./data.js";

const getInjuries = () => {
  return fetch("https://raw.githubusercontent.com/aline-camargo/SAP003-data-lovers/master/src/data/injuries/injuries.json")
    .then(response => response.json())
    .then(data => {
      const finalData = data.filter(injurie => {
        const selectedYears = injurie.Year.slice(0, 4);
        return selectedYears >= 2000 && selectedYears <= 2015;
      });

      return finalData.map(element => {
        const cars = element.Total_Injured_Persons_Passenger_Car_Occupants + element.Total_Injured_Persons_Passenger_Or_Occupant;
        const moto = element.Total_Injured_Persons_Motorcyclists;
        const total = cars + moto;
        return { cars, moto, total, year: element.Year.slice(0, 4) };
      });  
    });
};

const showTotalTable = (injuries) => {
  const totalInjuries = injuries.reduce((acc, cur) => ({
    cars: acc.cars + cur.cars,
    moto: acc.moto + cur.moto,
    total: acc.total + cur.total,
  }), { cars: 0, moto: 0, total: 0 })
  
  document.getElementById("initial-total-results").innerHTML = `
    <td>${totalInjuries.cars}</td>
    <td>${totalInjuries.moto}</td>
    <td>${totalInjuries.total}</td>
  `;
};

const disable = () =>{
  document.getElementById("final-year").setAttribute("disabled", "");
  document.getElementById("final-year-label").style.color = "grey";
  document.getElementById("initial-year-label").textContent = "Ano";
};

const enable = () =>{
  document.getElementById("final-year").removeAttribute("disabled", "");
  document.getElementById("final-year-label").style.color = "white";
  document.getElementById("initial-year-label").textContent = "Ano Inicial";
};

const checkRadio = (adicionalFilters, initialYear, finalYear) =>{
  if (document.getElementById("one-year").checked) {
    adicionalFilters.forEach(element => element.setAttribute("hidden", ""));
    return initialYear;
  } else if (finalYear === initialYear) {
    document.getElementById("error-message").textContent = "Selecione \"Apenas um ano\"";
    adicionalFilters.forEach(element => element.setAttribute("hidden", ""));
  } else {
    adicionalFilters.forEach(element => element.removeAttribute("hidden", ""));
  }
  return finalYear;
};

const cleanMain = () => {
  document.getElementById("main-table").setAttribute("hidden", "");
  document.getElementById("error-message").textContent = "";
};

const search = () =>{
  cleanMain();

  const initialYear = +document.getElementById("initial-year").value;
  const finalYear = +document.getElementById("final-year").value;
  const selectTransport = document.getElementById("transport").value;
  const order = document.getElementById("order").value;
  const hideElements = document.getElementsByName("hide");
  const checkedFinalYear = checkRadio(hideElements, initialYear, finalYear);

  const injuries = JSON.parse(localStorage.getItem("injuries"));
  const period = helpers.filterPeriod(injuries, initialYear, checkedFinalYear);

  if (typeof period === "string") {
    document.getElementById("table-results").setAttribute("hidden", "");
    hideElements.forEach(element => element.setAttribute("hidden", ""));
    document.getElementById("error-message").textContent = period;
  }

  const periodAndTransport = helpers.filterTransport(period, selectTransport);

  if (typeof periodAndTransport === "string") {
    document.getElementById("table-results").setAttribute("hidden", "");
    document.getElementById("error-message").textContent = periodAndTransport;
  }
  
  const accidentsTotal = helpers.totalAccidentsPeriodTransport(periodAndTransport);
  const years = helpers.filterYears(period);
  const tableBase = helpers.tableBaseMaker(years, periodAndTransport, selectTransport, period);
  const allTableOrderChoice = checkRadioOfOrder();

  helpers.orderAccidents(tableBase, order, allTableOrderChoice);

  if (document.getElementById("error-message").textContent != "") {
    document.getElementById("table-results").setAttribute("hidden", "");
  } else if (selectTransport == "Todos") {
    moreThanOneTable(tableBase, order);
  } else {
    resultTable(tableBase, accidentsTotal, selectTransport, order);
  }
};

const checkRadioOfOrder = () =>{
  if (document.getElementById("car-order-choice").checked) {
    return "car";
  } else if (document.getElementById("moto-order-choice").checked) {
    return "moto";
  } else if (document.getElementById("all-order-choice").checked) {
    return "all";
  }
};

const resultTable = (tableBase, accidentsTotal, selectTransport) =>{

  const hideChoice = document.getElementsByName("hide-choice");
  hideChoice.forEach(element => element.setAttribute("hidden", ""));
  const rowsTemplate = tableBase.map(element => `<tr><td>${element[0]}</td><td>${element[1]}</td></tr>`).join("");
  document.getElementById("table-results").removeAttribute("hidden", "");
  document.getElementById("t-head").innerHTML = `<th colspan="2">Acidentes de ${selectTransport}</th>`;
  document.getElementById("t-body").innerHTML = `
    <tr class="main-table-subtitle"><td>Ano</td><td>Número de Acidentes</td></tr>
    ${rowsTemplate}
    <tr><td class="total">Total</td><td>${accidentsTotal}</td></tr>
  `;
};

const moreThanOneTable = (tableBase) =>{

  const hideChoice = document.getElementsByName("hide-choice");
  if (document.getElementById("one-year").checked) {
    hideChoice.forEach(element => element.setAttribute("hidden", ""));
  } else {
    hideChoice.forEach(element => element.removeAttribute("hidden", ""));
  };

  const rowsTemplate = tableBase.map(element => `
  <tr><td>${element[0]}</td><td>${element[1]}</td><td>${element[2]}</td><td>${element[3]}</td></tr>
  `).join("");
  document.getElementById("table-results").removeAttribute("hidden", "");
  document.getElementById("t-head").innerHTML = "<th colspan=\"4\">Total de Acidentes</th>";
  document.getElementById("t-body").innerHTML = `
  <tr class="main-table-subtitle"><td>Ano</td><td>Carro</td><td>Moto</td><td>Todos</td></tr>
  ${rowsTemplate}
  `;  
};

const averageGetter = () =>{
  const initialYear = +document.getElementById("initial-year").value;
  const finalYear = +document.getElementById("final-year").value;
  const selectTransport = document.getElementById("transport").value;

  const resultAverage = helpers.average(injurieAccidents, initialYear, finalYear, selectTransport);

  if (selectTransport === "Todos") {
    document.getElementById("t-body").innerHTML += `<tr><td class="total">Médias</td><td>${resultAverage[0]}</td>
      <td>${resultAverage[1]}</td><td>${resultAverage[2]}</td></tr>`;
  } else {
    document.getElementById("t-body").innerHTML += `<tr><td class="total">Média</td><td>${resultAverage}</td></tr>`;
  }
};

window.addEventListener("load", () => {
  const injuries = JSON.parse(localStorage.getItem("injuries"));
  if (injuries) {
    showTotalTable(injuries);
  } else {
    getInjuries()
      .then(data => {
        showTotalTable(data);
        localStorage.setItem("injuries", JSON.stringify(data));
      });
  }
});
document.getElementById("one-year").addEventListener("change", disable);
document.getElementById("period").addEventListener("change", enable);
document.getElementById("search").addEventListener("click", search);

document.getElementById("average").addEventListener("click", averageGetter);
document.getElementById("order").addEventListener("change", search);
