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

  if (finalYear === 0) {
    finalYear = initialYear;
  }
  //chamar função filtrar
};

document.getElementById("search").addEventListener("click", search);
