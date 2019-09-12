const disable = () =>{
  document.getElementById("final-year").setAttribute("disabled", "");
};

document.getElementById("one-year").addEventListener("click", disable);

const enable = () =>{
  document.getElementById("final-year").removeAttribute("disabled", "");
};

document.getElementById("period").addEventListener("click", enable);
