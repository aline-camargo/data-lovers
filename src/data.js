const injurieAccidents = INJURIES;

const filterPeriod = (initialYear, finalYear) => {
  const period = injurieAccidents.filter(injurie => (injurie.Year.slice(0, 4) >= initialYear && injurie.Year.slice(0, 4) <= finalYear));
  return period;
};

const filterYears = (period) => {
  const years = period.map(item => item.Year.slice(0, 4));
  return years;
};

const carAccidents = ["Total_Injured_Persons_Passenger_Car_Occupants", "Total_Injured_Persons_Passenger_Or_Occupant"];
const motoAccidents = ["Total_Injured_Persons_Motorcyclists"];

const filterTransport = (period, selectTransport) => {
  if (selectTransport == "Carro") {
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

const carsTotalAccidents = () =>{
  const cars = injurieAccidents.reduce(
    (total, year) => total + year[carAccidents[0]] + year[carAccidents[1]],
    0);
  return cars;
};

const motosTotalAccidents = () =>{
  const motos = injurieAccidents.reduce(
    (total, year) => total + year[motoAccidents], 0);
  return motos;
};

window.data = {
  filterPeriod,
  carsTotalAccidents,
  filterTransport,
  totalAccidentsPeriodTransport,
  filterYears,
  motosTotalAccidents
};