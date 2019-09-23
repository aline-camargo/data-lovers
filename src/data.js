const carAccidents = ["Total_Injured_Persons_Passenger_Car_Occupants", "Total_Injured_Persons_Passenger_Or_Occupant"];
const motoAccidents = ["Total_Injured_Persons_Motorcyclists"];

const filterPeriod = (data, initialYear, finalYear) => {

  if (initialYear === 0 || finalYear === 0) {
    return "Caractere Inválido";
  } else if (initialYear < 2000 || finalYear > 2015 || finalYear < initialYear) {
    return "Período Inválido";
  } else {
    const period = data.filter(injurie => (injurie.Year.slice(0, 4) >= initialYear
    && injurie.Year.slice(0, 4) <= finalYear));
    return period;
  }
};

const filterYears = (period) => {
  const years = period.map(item => item.Year.slice(0, 4));
  return years;
};

const filterTransport = (period, selectTransport) => {
  if (selectTransport == "identificator") {
    return "Selecione um Transporte";

  } else if (selectTransport == "Carro") {
    const injuriecar = period.map(injurie => injurie[carAccidents[0]] + injurie[carAccidents[1]]);
    return injuriecar;

  } else if (selectTransport == "Moto") {
    const injuriemoto = period.map(injurie => injurie[motoAccidents]);
    return injuriemoto;

  } else if (selectTransport == "Todos") {
    const injurieCarAndMoto = period.map(injurie => injurie[carAccidents[0]] + injurie[carAccidents[1]] + injurie[motoAccidents]);
    return injurieCarAndMoto;
  }
};

const totalAccidentsPeriodTransport = (injurie) => {
  const carsTotalPeriod = injurie.reduce((total, year) => total + year, 0);
  return carsTotalPeriod;
};

// const average = (injurieAccidents, initialYear, finalYear, selectTransport) =>{
//   const period = filterPeriod(injurieAccidents, initialYear, finalYear);
// }

const tableBaseMaker = (years, periodAndTransport, selectTransport, period) =>{
  const tableBase = [];

  if (selectTransport === "Todos") {
    const carAccidents = filterTransport(period, "Carro");
    const motoAccidents = filterTransport(period, "Moto");
    const allAccidents = filterTransport(period, "Todos");

    for (let i=0; i < years.length; i) {
      const concat = years.shift() + " " + carAccidents.shift() + " " + motoAccidents.shift() + " " + allAccidents.shift();
      tableBase.push(concat.split(" "));
    }
  } else {
    for (let i=0; i < years.length; i) {
      const concat = years.shift() + " " + periodAndTransport.shift();
      tableBase.push(concat.split(" "));
    }
  };
  return tableBase;
};

const orderAccidents = (tableBase, order) =>{
  console.log(order);
  console.log(tableBase);
  const compare = (a, b) =>{ if (a[1] > b[1]) console.log(a[1]); return 1;};
  const compare2 =(a, b) =>{ if (a[1] < b[1]) return 1;};

  if (order == "crescent") {
    console.log (tableBase.sort(compare));
  } else if (order == "decrescent") {
    console.log (tableBase.sort(compare2));
  }
};

app = {
  filterPeriod,
  filterTransport,
  totalAccidentsPeriodTransport,
  filterYears,
  tableBaseMaker,
  orderAccidents,
};

module.exports = {
  filterPeriod,
  filterTransport,
  totalAccidentsPeriodTransport,
  filterYears,
};
