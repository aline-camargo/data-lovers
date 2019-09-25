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
  const totalAccidents = injurie.reduce((total, accident) => total + accident, 0);
  return totalAccidents;
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
    do {
      const concat = years.shift() + " " + carAccidents.shift() + " " + motoAccidents.shift() + " " + allAccidents.shift();
      tableBase.push(concat.split(" "));
    } while (years.length != 0);
  } else {
    do {
      const concat = years.shift() + " " + periodAndTransport.shift();
      tableBase.push(concat.split(" "));
    } while (years.length != 0);
  };
  return tableBase;
};

const orderAccidents = (tableBase, order, allTableOrderChoice) =>{

  let index = 0;

  if (order === "crescent" || order === "decrescent") {
    if (allTableOrderChoice === "moto") {
      index = 2;
    } else if (allTableOrderChoice === "all") {
      index = 3;
    } else {
      index = 1;
    }
  } else if (order === "recent" || order === "older") {
    index = 0;
  }

  const compare = (a, b) =>{if (parseInt(a[index]) > parseInt(b[index])) {return 1;} else {return -1;}};
  const compare2 =(a, b) =>{if (parseInt(a[index]) < parseInt(b[index])) {return 1;} else {return -1;}};

  if (order === "crescent" || order === "recent") {
    return tableBase.sort(compare);
  } else if (order === "decrescent" || order === "older") {
    return tableBase.sort(compare2);
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
  tableBaseMaker,
  orderAccidents,
};
