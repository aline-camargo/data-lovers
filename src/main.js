const disable = () =>{
  document.getElementById("final-year").setAttribute("disabled", "");
};

document.getElementById("one-year").addEventListener("click", disable);

const enable = () =>{
  document.getElementById("final-year").removeAttribute("disabled", "");
};

document.getElementById("period").addEventListener("click", enable);

const search = () =>{
  const initialYear = document.getElementById("initial-year");
}
document.getElementById("search").addEventListener("click", search);
