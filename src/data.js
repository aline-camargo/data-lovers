window.INJURIES = INJURIES;


const filterPeriod = (initialYear, finalYear, selectTransport) => {
  const period = INJURIES.filter(injurie => (injurie.Year.slice(0, 4) >= initialYear && injurie.Year.slice(0, 4) <= finalYear));
  
  const injurieTransportMoto = (period) => {
    const injuriemoto = period.map(injurie => `${injurie.Total_Injured_Persons_Motorcyclists}`);
    console.log(injuriemoto);
  };
  
  const injurieTransportCar = (period) => {
    const injuriecar = period.map(injurie => `${injurie.Total_Injured_Persons_Passenger_Car_Occupants + injurie.Total_Injured_Persons_Passenger_Or_Occupant}`);
    console.log(injuriecar);
  };
  if (selectTransport == "car") {
    //console.log(injurieTransportCar(period))
    return injurieTransportCar(period);

  } else if (selectTransport == "motorcycle") {
    return injurieTransportMoto(period);

  } else if (selectTransport == "all") {
    return injurieTransportCar(period) + injurieTransportMoto(period);
  }
}; 

window.filterPeriod = filterPeriod;

const carAccidents = ["Total_Injured_Persons_Passenger_Car_Occupants",
"Total_Injured_Persons_Passenger_Or_Occupant"];

const carsTotalAccidents = () =>{
  const cars = INJURIES.reduce(
    (total, year) => total + year[carAccidents[0]] + year[carAccidents[1]],
    0,
    );
  return cars;
}

const motosTotalAccidents = () =>{
  const motos = INJURIES.reduce(
    (total, year) => total + year.Total_Injured_Persons_Motorcyclists,
    0,
    );
  return motos;
};

const filterPeriod = (initialYear, finalYear) => {
const period = INJURIES.filter(injurie => (injurie.Year.slice(0, 4) >= initialYear && injurie.Year.slice(0, 4) <= finalYear));

  return period;
};

window.filterPeriod = filterPeriod;
window.carsTotalAccidents = carsTotalAccidents;
window.motosTotalAccidents = motosTotalAccidents;

