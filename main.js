
const button = document.getElementById("plus");

//Permits to appear the form
appearForm = () =>{
  const form = document.querySelector(".management-form");
  form.classList.replace("management-form", "show-form");
}

//Permits to appear the Section of the Planet
function appearSection() {
  var planet = document.getElementById("planet");
  var system = document.getElementById("system");
  planet.style.display = "block";
  system.style.display = "none";
}

//Permits to switch from the Section of the planet to the System
function appearSystem() {
  var planet = document.getElementById("planet");
  var system = document.getElementById("system");
  planet.style.display = "none";
  system.style.display = "block";
}

function addElement() {
  var planet= document.querySelector("input").value;
  var size = document.querySelector("select").value;
  console.log(size);
}
