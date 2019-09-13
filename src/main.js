const disable = () =>{
  document.getElementById("final-year").setAttribute("disabled", "");
};

document.getElementById("one-year").addEventListener("click", disable);

const enable = () =>{
  document.getElementById("final-year").removeAttribute("disabled", "");
};

document.getElementById("period").addEventListener("click", enable);

const search = () =>{
  const initialYear = Number(document.getElementById("initial-year").value);
  let finalYear = Number(document.getElementById("final-year").value);
  const selectTransport = document.getElementById("transport").value;

  if (finalYear === 0) {
    finalYear = initialYear;
  }
  const result = window.filterPeriod(initialYear, finalYear, selectTransport); 

  console.log(result);
  //const console = result.map(console.log());
  //return console;
};

document.getElementById("search").addEventListener("click", search);

