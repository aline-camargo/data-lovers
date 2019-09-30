const injurieAccidents = INJURIES;

const initialTable = () =>{
  const initialPeriod = app.filterPeriod(injurieAccidents, 2000, 2015);
  const carAccidents = app.filterTransport(initialPeriod, "Carro");
  const motoAccidents = app.filterTransport(initialPeriod, "Moto");
  const totalCar = app.totalAccidentsPeriodTransport(carAccidents);
  const totalMoto = app.totalAccidentsPeriodTransport(motoAccidents);
  const accidentsTotal = totalCar + totalMoto;
  document.getElementById("initial-total-results").innerHTML = `<td>${totalCar}</td>
    <td>${totalMoto}</td><td>${accidentsTotal}</td>`;
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

const checkRadio = (array, initialYear, finalYear) =>{
  if (document.getElementById("one-year").checked) {
    finalYear = initialYear;
    for (let element of array) {
      element.setAttribute("hidden", "");
    };
  } else {
    for (let element of array) {
      element.removeAttribute("hidden", "");
    };
    if (finalYear === initialYear) {
      document.getElementById("error-message").innerHTML = "Selecione \"Apenas um ano\"";
      for (let element of array) {
        element.setAttribute("hidden", "");
      };
    };
  };
  return finalYear;
};

const cleanMain = () => {
  document.getElementById("main-table").setAttribute("hidden", "");
  document.getElementById("error-message").innerHTML = "";
};

const search = () =>{
  cleanMain();

  const initialYear = Number(document.getElementById("initial-year").value);
  const finalYear = Number(document.getElementById("final-year").value);
  const selectTransport = document.getElementById("transport").value;
  const order = document.getElementById("order").value;
  const hideElements = document.getElementsByName("hide");
  const checkedFinalYear = checkRadio(hideElements, initialYear, finalYear);

  const period = app.filterPeriod(injurieAccidents, initialYear, checkedFinalYear);

  try {
    if (period === "Caractere Inválido") throw "Caractere Inválido";
    if (period === "Período Inválido") throw "Período Inválido";
  } catch (error) {
    document.getElementById("table-results").setAttribute("hidden", "");
    document.getElementById("error-message").innerHTML = error;
    for (let element of hideElements) {
      element.setAttribute("hidden", "");
    };
  };

  const periodAndTransport = app.filterTransport(period, selectTransport);
  try {
    if (periodAndTransport === "Selecione um Transporte") throw "Selecione um Transporte";
  } catch (error) {
    document.getElementById("table-results").setAttribute("hidden", "");
    document.getElementById("error-message").innerHTML = error;
    for (let element of hideElements) {
      element.setAttribute("hidden", "");
    };
  };

  const accidentsTotal = app.totalAccidentsPeriodTransport(periodAndTransport);
  const years = app.filterYears(period);
  const tableBase = app.tableBaseMaker(years, periodAndTransport, selectTransport, period);
  const allTableOrderChoice = checkRadioOfOrder();

  app.orderAccidents(tableBase, order, allTableOrderChoice);

  if (document.getElementById("error-message").innerHTML != "") {
    document.getElementById("table-results").setAttribute("hidden", "");
    return;
  };

  if (selectTransport == "Todos") {
    moreThanOneTable(tableBase, order);
  } else {
    resultTable(tableBase, accidentsTotal, selectTransport, order);
  }
};

const checkRadioOfOrder = () =>{
  let allTableOrderChoice = "";

  if (document.getElementById("car-order-choice").checked) {
    allTableOrderChoice = "car";
  } else if (document.getElementById("moto-order-choice").checked) {
    allTableOrderChoice = "moto";
  } else if (document.getElementById("all-order-choice").checked) {
    allTableOrderChoice = "all";
  }
  return allTableOrderChoice;
};

const resultTable = (tableBase, accidentsTotal, selectTransport, order) =>{

  const hideChoice = document.getElementsByName("hide-choice");
  for (let element of hideChoice) {
    element.setAttribute("hidden", "");
  };

  document.getElementById("table-results").removeAttribute("hidden", "");
  document.getElementById("t-head").innerHTML = `<th colspan="2">Acidentes de ${selectTransport}</th>`;
  document.getElementById("t-body").innerHTML = "<tr class=\"main-table-subtitle\"><td>Ano</td><td>Número de Acidentes</td></tr>";

  for (let index in tableBase) {
    document.getElementById("t-body").innerHTML += `<tr><td>${tableBase[index][0]}</td><td>${tableBase[index][1]}</td></tr>`;
  }
  document.getElementById("t-body").innerHTML += `<tr><td class=\"total\">Total</td><td>${accidentsTotal}</td></tr>`;
};

const moreThanOneTable = (tableBase, order) =>{

  const hideChoice = document.getElementsByName("hide-choice");
  for (let element of hideChoice) {
    element.removeAttribute("hidden", "");
  };

  document.getElementById("t-head").innerHTML = "";
  document.getElementById("t-body").innerHTML = "";
  document.getElementById("table-results").removeAttribute("hidden", "");
  document.getElementById("t-head").innerHTML = "<th colspan=\"4\">Total de Acidentes</th>";
  document.getElementById("t-body").innerHTML += `<tr class="main-table-subtitle"><td>Ano</td><td>Carro</td>
    <td>Moto</td><td>Todos</td></tr>`;

  for (let index in tableBase) {
    document.getElementById("t-body").innerHTML += `<tr><td>${tableBase[index][0]}</td><td>${tableBase[index][1]}</td>
      <td>${tableBase[index][2]}</td><td>${tableBase[index][3]}</td></tr>`;
  }
};

const averageGetter = () =>{
  const initialYear = Number(document.getElementById("initial-year").value);
  const finalYear = Number(document.getElementById("final-year").value);
  const selectTransport = document.getElementById("transport").value;

  const resultAverage = app.average(injurieAccidents, initialYear, finalYear, selectTransport);

  if (selectTransport === "Todos") {
    document.getElementById("t-body").innerHTML += `<tr><td class=\"total\">Médias</td><td>${resultAverage[0]}</td>
      <td>${resultAverage[1]}</td><td>${resultAverage[2]}</td></tr>`;
  } else {
    document.getElementById("t-body").innerHTML += `<tr><td class=\"total\">Média</td><td>${resultAverage}</td></tr>`;
  }
};

window.addEventListener("load", initialTable);
document.getElementById("average").addEventListener("click", averageGetter);
document.getElementById("order").addEventListener("change", search);
document.getElementById("search").addEventListener("click", search);
document.getElementById("one-year").addEventListener("change", disable);
document.getElementById("period").addEventListener("change", enable);
