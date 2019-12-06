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
    let result = injurie.reduce((total, accident) => total + accident[transport], 0);
    return result;
  } else {
    let result = injurie.reduce((acc, cur) => ({
      Carros: acc.Carros + cur.Carros,
      Motos: acc.Motos + cur.Motos,
      total: acc.total + cur.total,
    }), { Carros: 0, Motos: 0, total: 0 });
    return result;
  }
};

const average = (totalAccidents, divider) => {
  if (typeof totalAccidents === "number") {
    return parseInt(totalAccidents / divider);
  } else {
    return totalAccidents.map(element => parseInt(+element.textContent/divider));
  }
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

  const compare = (a, b) =>{if (parseInt(a[index]) < parseInt(b[index])) {return 1;} else {return -1;}};
  const compare2 =(a, b) =>{if (parseInt(a[index]) > parseInt(b[index])) {return 1;} else {return -1;}};

  if (order === "crescent" || order === "recent") {
    return tableBase.sort(compare2);
  } else if (order === "decrescent" || order === "older") {
    return tableBase.sort(compare);
  }
};

export default {
  filterPeriod,
  validatePeriod,
  totalAccidents,
  orderAccidents,
  average,
};
