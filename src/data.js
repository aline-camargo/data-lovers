const validatePeriod = (data, initialYear, finalYear) => {
  if (initialYear === 0 || finalYear === 0) {
    return "Caractere Inválido";
  } else if (initialYear < 2000 || finalYear > 2015 || finalYear < initialYear) {
    return "Período Inválido";
  } else {
    return filterPeriod(data, initialYear, finalYear);
  }
};

const filterPeriod = (data, initialYear, finalYear) => {
  return data.filter(injurie => injurie.year >= initialYear && injurie.year <= finalYear);
};

const totalAccidents = (injurie, transport) => {
  if (transport != "total") {   
    return injurie.reduce((total, accident) => total + accident[transport.toLowerCase()], 0);
  } else {
    return injurie.reduce((acc, cur) => ({
      carros: acc.carros + cur.carros,
      motos: acc.motos + cur.motos,
      total: acc.total + cur.total,
    }), { carros: 0, motos: 0, total: 0 });
  }
};

const average = (totalAccidents, divider) => {
  if (typeof totalAccidents === "number") {
    return parseInt(totalAccidents / divider);
  } else {
    return totalAccidents.map(element => parseInt(element/divider));
  }
};

const orderAccidents = (tableBase, order, selectTransport, allTableOrderChoice) =>{
  const selectOrder = selectTransport === "total" ? allTableOrderChoice : selectTransport;

  const compare = (a, b) =>{if (parseInt(a[selectOrder]) < parseInt(b[selectOrder])) {return 1;} else {return -1;}};
  const compare2 =(a, b) =>{if (parseInt(a[selectOrder]) > parseInt(b[selectOrder])) {return 1;} else {return -1;}};

  if (order === "crescent" || order === "older") {
    return tableBase.sort(compare2);
  } else {
    return tableBase.sort(compare);
  }
};

export {
  filterPeriod,
  validatePeriod,
  totalAccidents,
  orderAccidents,
  average,
};
