window.INJURIES = INJURIES;

const filterPeriod = (initialYear, finalYear) => {
  const period = INJURIES.filter(injurie => (injurie.Year.slice(0, 4) >= initialYear && injurie.Year.slice(0, 4) <= finalYear));
  return period;
};

const filterYears = (period) => {
  const years = period.map(item => item.Year.slice(0, 4));
  return years;
};

const filterTransport = (period, selectTransport) => {
  if (selectTransport == "car") {
    const injuriecar = period.map(injurie => injurie[carAccidents[0]] + injurie[carAccidents[1]]);
    return injuriecar;

  } else if (selectTransport == "motorcycle") {
    const injuriemoto = period.map(injurie => injurie.Total_Injured_Persons_Motorcyclists);
    return injuriemoto;

  } else if (selectTransport == "all") {
    const injuriecar = period.map(injurie => injurie[carAccidents[0]] + injurie[carAccidents[1]]);
    const injuriemoto = period.map(injurie => injurie.Total_Injured_Persons_Motorcyclists);
    return injuriecar.concat(injuriemoto);
  }
};

const totalAccidentsPeriodTransport = (injurie) => {
  const carsTotalPeriod = injurie.reduce((total, year) => total + year, 0);
  return carsTotalPeriod;
};

const carAccidents = ["Total_Injured_Persons_Passenger_Car_Occupants",
"Total_Injured_Persons_Passenger_Or_Occupant"];

const carsTotalAccidents = () =>{
  const cars = INJURIES.reduce(
    (total, year) => total + year[carAccidents[0]] + year[carAccidents[1]],
    0);
  return cars;
};

const motosTotalAccidents = () =>{
  const motos = INJURIES.reduce(
    (total, year) => total + year.Total_Injured_Persons_Motorcyclists,
    0);
  return motos;
};

window.filterPeriod = filterPeriod;
window.carsTotalAccidents = carsTotalAccidents;
window.motosTotalAccidents = motosTotalAccidents;
window.filterTransport = filterTransport;
window.totalAccidentsPeriodTransport = totalAccidentsPeriodTransport;
window.filterYears = filterYears;
