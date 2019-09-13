window.INJURIES = INJURIES;

const filterPeriod = (initialYear, finalYear, selectTransport) => {
  const period = INJURIES.filter(injurie => (injurie.Year.slice(0, 4) >= initialYear && injurie.Year.slice(0, 4) <= finalYear));

  if (selectTransport == "car") {
    const injuriecar = period.map(injurie => injurie[carAccidents[0]] + injurie[carAccidents[1]]);
    return injuriecar;

  } else if (selectTransport == "motorcycle") {
    const injuriemoto = period.map(injurie => injurie.Total_Injured_Persons_Motorcyclists);
    return injuriemoto;
  }
  // } else if (selectTransport == "all") {
  //   return injurieTransportCar(period) + injurieTransportMoto(period);
  // }
};



const carAccidents = ["Total_Injured_Persons_Passenger_Car_Occupants",
"Total_Injured_Persons_Passenger_Or_Occupant"];

const carsTotalAccidents = () =>{
  const cars = INJURIES.reduce(
    (total, year) => total + year[carAccidents[0]] + year[carAccidents[1]],
    0);
  return cars;
}

const motosTotalAccidents = () =>{
  const motos = INJURIES.reduce(
    (total, year) => total + year.Total_Injured_Persons_Motorcyclists,
    0);
  return motos;
};

window.filterPeriod = filterPeriod;
window.carsTotalAccidents = carsTotalAccidents;
window.motosTotalAccidents = motosTotalAccidents;
