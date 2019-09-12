window.INJURIES = INJURIES;

const filterPeriod = (initialYear, finalYear) => {
const period = INJURIES.filter(injurie => (injurie.Year.slice(0, 4) >= initialYear && injurie.Year.slice(0, 4) <= finalYear));

  return period;
}; 

window.filterPeriod = filterPeriod;