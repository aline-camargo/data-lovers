const initialTable = () =>{
  carsTd();
  motosTd();
  allTd();
}

const allTd = () =>{
  const allAccidents = window.carsTotalAccidents() + window.motosTotalAccidents();
  const newTd = document.createElement("td");
  newTd.innerHTML = allAccidents;
  document.getElementById("total-results").appendChild(newTd);
}

const carsTd = () =>{
  const carAccidents = window.carsTotalAccidents();
  const newTd = document.createElement("td");
  newTd.innerHTML = carAccidents;
  document.getElementById("total-results").appendChild(newTd);
}

const motosTd = () =>{
  const motosAccidents = window.motosTotalAccidents();
  const newTd = document.createElement("td");
  newTd.innerHTML = motosAccidents;
  document.getElementById("total-results").appendChild(newTd);
}

const disable = () =>{
  document.getElementById("final-year").setAttribute("disabled", "");
  document.getElementById("final-year-label").style.color = "grey";
  document.getElementById("initial-year-label").innerHTML = "Ano";
};

const enable = () =>{
  document.getElementById("final-year").removeAttribute("disabled", "");
  document.getElementById("final-year-label").style.color = "white";
  document.getElementById("initial-year-label").innerHTML = "Ano Inicial";
};

const search = () =>{
  const initialYear = Number(document.getElementById("initial-year").value);
  let finalYear = Number(document.getElementById("final-year").value);
  const selectTransport = document.getElementById("transport").value;

  if (finalYear === 0) {
    finalYear = initialYear;
  }
  const result = window.filterPeriod(initialYear, finalYear, selectTransport);

  console.log(result);
};

window.addEventListener("load", initialTable);
document.getElementById("one-year").addEventListener("click", disable);
document.getElementById("period").addEventListener("click", enable);
document.getElementById("search").addEventListener("click", search);
