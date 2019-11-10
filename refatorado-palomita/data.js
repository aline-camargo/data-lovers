const indicators = [
  "Total_Injured_Persons_Passenger_Car_Occupants", 
  "Total_Injured_Persons_Passenger_Or_Occupant",
  "Total_Injured_Persons_Motorcyclists"
];

const data = INJURIES.filter(injurie => {
  const year = injurie.Year.slice(0, 4);
  return year >= 2000 && year <= 2015; 
});

const injuries = () => {
  return data.map(elem => {
    return {
      carro: elem[indicators[0]] + elem[indicators[1]],
      moto: elem[indicators[2]], 
      allInjuries: elem[indicators[0]] + elem[indicators[1]] + elem[indicators[2]] ,
      year: elem.Year.slice(0, 4)
    }
  })
}

const validatePeriod = (data, initialYear, finalYear) => {
  if (initialYear === 0 || finalYear === 0) {
    return "Caractere Inválido";
  } else if (initialYear < 2000 || finalYear > 2015 || finalYear < initialYear) {
    return "Período Inválido";
  } else {
    return filterPeriod(data, initialYear, finalYear);
  }
}

const filterPeriod = (data, initialYear, finalYear) => {
  return data.filter(injurie => injurie.year >= initialYear && injurie.year <= finalYear);
}

const totalAccidentsPeriodTransport = (injurie) => {
  return injurie.reduce((total, accident) => total + accident, 0);
};

const filterByTransport = (period, transport) => {
  return period.filter(elem => elem[transport]);
}

app = {
  injuries,
  validatePeriod,
  filterPeriod,
  filterByTransport,
  totalAccidentsPeriodTransport
}