const initialTable = () =>{
  carsTd();
  motosTd();
  allTd();
};

const allTd = () =>{
  const allAccidents = window.data.carsTotalAccidents() + window.data.motosTotalAccidents();
  const newTd = document.createElement("td");
  newTd.innerHTML = allAccidents;
  document.getElementById("total-results").appendChild(newTd);
};

const carsTd = () =>{
  const carAccidents = window.data.carsTotalAccidents();
  const newTd = document.createElement("td");
  newTd.innerHTML = carAccidents;
  document.getElementById("total-results").appendChild(newTd);
};

const motosTd = () =>{
  const motosAccidents = window.data.motosTotalAccidents();
  const newTd = document.createElement("td");
  newTd.innerHTML = motosAccidents;
  document.getElementById("total-results").appendChild(newTd);
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
  const initialYear = Number(document.getElementById("initial-year").value);
  let finalYear = Number(document.getElementById("final-year").value);
  const selectTransport = document.getElementById("transport").value;

  if (finalYear === 0) {
    finalYear = initialYear;
  }

  const period = window.data.filterPeriod(initialYear, finalYear);
  const periodAndTransport = window.data.filterTransport(period, selectTransport);
  const accidentsTotal = window.data.totalAccidentsPeriodTransport(periodAndTransport);
  const years = window.data.filterYears(period);
  
  resultTable(periodAndTransport, accidentsTotal, years, selectTransport);
};

const resultTable = (periodAndTransport, accidentsTotal, years, selectTransport) =>{
  document.getElementById("tableHead").innerHTML = `Acidentes de ${selectTransport}`;

  for (let index in years) {
    document.getElementById("tableBody").innerHTML += `<tr><td>${years[index]}</td><td>${periodAndTransport[index]}</td></tr>`;
  }
  document.getElementById("tableBody").innerHTML += `<tr><td>Total</td><td>${accidentsTotal}</td></tr>`;
};

window.addEventListener("load", initialTable);
document.getElementById("one-year").addEventListener("click", disable);
document.getElementById("period").addEventListener("click", enable);
document.getElementById("search").addEventListener("click", search);
