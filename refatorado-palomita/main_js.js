const dataInjuries = injuries();
const initialYear = document.getElementById("initial-year");
const finalYear = document.getElementById("final-year");
const selectTransport = document.getElementById("transport");
const order = document.getElementById("order");
const tableSection = document.getElementById("table-results")

const initialTable = () => {
  const car = dataInjuries.map(elem => elem.carro);
  const moto = dataInjuries.map(elem => elem.moto);

  const carAccidents = app.totalAccidentsPeriodTransport(car);
  const motoAccidents = app.totalAccidentsPeriodTransport(moto);
  const totalAccidentes = motoAccidents + carAccidents;

  return printInitialTable(carAccidents, motoAccidents, totalAccidentes)
}

const printInitialTable = (carAccidents, motoAccidents, totalAccidentes) => {
  return tableSection.innerHTML = `
  <thead>
    <th class="main-table-head" colspan="3">Número Total de Acidentes de 2000 a 2015</th>
  </thead>
  <tbody>
    <tr class="main-table-subtitle">
      <td>Carros</td>
      <td>Motos</td>
      <td>Ambos</td>
    </tr>
    <tr class="main-table-content">
      <td>${carAccidents}</td>
      <td>${motoAccidents}</td>
      <td>${totalAccidentes}</td>
    </tr>
  </tbody>
  `;
}

const search = () => {
  const period = app.validatePeriod(dataInjuries, initialYear.value, finalYear.value);
  const filtered = app.filterByTransport(period, selectTransport.value);

  return printTable(filtered, selectTransport.value);
}

const printTable = (data, selectTransport) => {
  const total = data.map(elem => elem[selectTransport]);

  tableSection.innerHTML = `   
    <thead class="table-title">
      <th colspan="2">Acidentes de ${selectTransport}</th>
    <thead>
    <tbody class="table-body">
      <tr class=\"main-table-subtitle\"><td>Ano</td><td>Número de Acidentes</td></tr>
      ${data.map(elem => `<tr><td>${elem.year}</td><td>${elem[selectTransport]}</td></tr>`).join("")}
      <tr><td class=\"total\">Total</td><td>${app.totalAccidentsPeriodTransport(total)}</td></tr>
    <tbody>
  `;
}

window.addEventListener("load", initialTable);
document.getElementById("search").addEventListener("click", search);