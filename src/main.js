const initialTable = () =>{
  const initialPeriod = window.data.filterPeriod(2000, 2016);
  const carAccidents = window.data.filterTransport(initialPeriod, "Carro");
  const motosAccidents = window.data.filterTransport(initialPeriod, "Moto");
  const totalCars = window.data.totalAccidentsPeriodTransport(carAccidents);
  const totalMotos = window.data.totalAccidentsPeriodTransport(motosAccidents);
  const accidentsTotal = totalCars + totalMotos
  document.getElementById("initial-total-results").innerHTML = `<td>${totalCars}</td>
    <td>${totalMotos}</td><td>${accidentsTotal}</td>`;
};

const disable = () =>{
  document.getElementById("final-year").setAttribute("disabled", "");
  document.getElementById("final-year-label").style.color = "grey";
  document.getElementById("initial-year-label").innerHTML = "Ano";
};

const enable = () =>{
  document.getElementById("final-year").removeAttribute("disabled", "");
  document.getElementById("final-year-label").style.color = "white";
  document.getElementById("initial-year-label").innerHTML = "Ano Inicial";
};

const search = () =>{
  document.getElementById("main-table").setAttribute("hidden", "");
  const initialYear = Number(document.getElementById("initial-year").value);
  let finalYear = Number(document.getElementById("final-year").value);
  const selectTransport = document.getElementById("transport").value;

  if (document.getElementById("one-year").checked) {
    finalYear = initialYear;
  }

  const period = window.data.filterPeriod(initialYear, finalYear);
  const periodAndTransport = window.data.filterTransport(period, selectTransport);
  const accidentsTotal = window.data.totalAccidentsPeriodTransport(periodAndTransport);
  const years = window.data.filterYears(period);

  if(selectTransport == "Todos"){
    moreThanOneTable(period, years);
  } else {
    resultTable(periodAndTransport, accidentsTotal, years, selectTransport);
  }
};

const resultTable = (periodAndTransport, accidentsTotal, years, selectTransport) =>{
  document.getElementById("tableHead").innerHTML = `<th colspan="2">Acidentes de ${selectTransport}</th>
  <tr><th>Ano</th><th>Nº de Acidentes</th></tr>`;

  for (let index in years) {
    document.getElementById("tableBody").innerHTML += `<tr><td>${years[index]}</td>
      <td>${periodAndTransport[index]}</td></tr>`;
  }

  document.getElementById("tableBody").innerHTML += `<tr><td>Total</td><td>${accidentsTotal}</td></tr>`;
};

const moreThanOneTable = (period, years) =>{

  const carAccidents = window.data.filterTransport(period, "Carro");
  const motosAccidents = window.data.filterTransport(period, "Moto");
  const allAccidents = window.data.filterTransport(period, "Todos");

  document.getElementById("table-head").innerHTML = `<tr><th>Ano</th><th>Carro</th>
    <th>Moto</th><th>Todos</th></tr>`;

  for (let index in years) {
    document.getElementById("table-body").innerHTML += `<tr><td>${years[index]}</td><td>${carAccidents[index]}</td>
      <td>${motosAccidents[index]}</td><td>${allAccidents[index]}</td></tr>`;
  }

};

window.addEventListener("load", initialTable);
document.getElementById("one-year").addEventListener("change", disable);
document.getElementById("period").addEventListener("change", enable);
document.getElementById("search").addEventListener("click", search);
