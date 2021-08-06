import { 
  filterPeriod,
  validatePeriod,
  totalAccidents,
  orderAccidents,
  average } from "./data.js"

const selectTransport = document.getElementById("transport")

const getInjuries = () => {
  return fetch("https://raw.githubusercontent.com/aline-camargo/SAP003-data-lovers/master/src/data/injuries/injuries.json")
    .then(response => response.json())
    .then(data => {
      const finalData = data.filter(injurie => {
        const selectedYears = injurie.Year.slice(0, 4)
        return selectedYears >= 2000 && selectedYears <= 2015
      })

      return finalData.map(element => {
        const carros = element.Total_Injured_Persons_Passenger_Car_Occupants + element.Total_Injured_Persons_Passenger_Or_Occupant
        const motos = element.Total_Injured_Persons_Motorcyclists
        const total = carros + motos
        return { carros, motos, total, year: element.Year.slice(0, 4) }
      })  
    })
}

const showTotalTable = (injuries) => {
  const totalInjuries = injuries.reduce((acc, cur) => ({
    carros: acc.carros + cur.carros,
    motos: acc.motos + cur.motos,
    total: acc.total + cur.total,
  }), { carros: 0, motos: 0, total: 0 })
  
  document.getElementById("initial-total-results").innerHTML = `
    <td>${totalInjuries.carros}</td>
    <td>${totalInjuries.motos}</td>
    <td>${totalInjuries.total}</td>
  `
}

const disable = () => {
  document.getElementById("final-year").setAttribute("disabled", "")
  document.getElementById("final-year-label").style.color = "grey"
  document.getElementById("initial-year-label").textContent = "Ano"
}

const enable = () => {
  document.getElementById("final-year").removeAttribute("disabled", "")
  document.getElementById("final-year-label").style.color = "white"
  document.getElementById("initial-year-label").textContent = "Ano Inicial"
}

const checkRadio = (initialYear, finalYear) => {
  if (document.getElementById("one-year").checked) {
    toggleSection()
    return initialYear
  } else if (finalYear === initialYear) {
    document.getElementById("error-message").textContent = "Selecione \"Apenas um ano\""
    toggleSection()
  } else {
    toggleSection(false)
  }
  return finalYear
}

const toggleSection = (hide = true) => {
  const hideSection = document.getElementById("hide")
  if (hide) {
    hideSection.setAttribute("hidden", "")
    return
  }

  hideSection.removeAttribute("hidden", "")
}

const cleanMain = () => {
  document.getElementById("main-table").setAttribute("hidden", "")
  document.getElementById("error-message").textContent = ""
}

const search = () => {
  cleanMain()

  const initialYear = +document.getElementById("initial-year").value
  const finalYear = +document.getElementById("final-year").value
  const order = document.getElementById("order").value
  const checkedFinalYear = checkRadio(initialYear, finalYear)

  const injuries = JSON.parse(localStorage.getItem("injuries"))
  const period = validatePeriod(injuries, initialYear, checkedFinalYear)

  if (typeof period === "string") {
    document.getElementById("table-results").setAttribute("hidden", "")
    toggleSection()
    document.getElementById("error-message").textContent = period
    return
  }

  if (!selectTransport.value) {
    document.getElementById("table-results").setAttribute("hidden", "")
    document.getElementById("error-message").textContent = "Escolha um transporte"
    return
  }
  
  const accidentsTotal = totalAccidents(period, selectTransport.value)

  const allTableOrderChoice = document.querySelector("input[name='hide-choice']:checked").value
  orderAccidents(period, order, selectTransport.value.toLowerCase(), allTableOrderChoice)
  
  if (document.getElementById("error-message").textContent != "") {
    document.getElementById("table-results").setAttribute("hidden", "")
  } else if (selectTransport.value == "total") {
    moreThanOneTable(period, accidentsTotal)
  } else {
    resultTable(period, accidentsTotal, selectTransport.value)
  }
}

const resultTable = (period, accidentsTotal, transport) => {
  const hideChoice = document.getElementsByName("hide-choice")
  hideChoice.forEach(element => element.setAttribute("hidden", ""))
  const rowsTemplate = period.map(element => `<tr><td>${element.year}</td><td>${element[transport.toLowerCase()]}</td></tr>`).join("")
  document.getElementById("table-results").removeAttribute("hidden", "")
  document.getElementById("t-head").innerHTML = `<th colspan="2">Acidentes de ${transport}</th>`
  document.getElementById("t-body").innerHTML = `
    <tr class="main-table-subtitle"><td>Ano</td><td>Número de Acidentes</td></tr>
    ${rowsTemplate}
    <tr><td class="total">Total</td><td id="totalDeAcidentes">${accidentsTotal}</td></tr>
  `
}

const moreThanOneTable = (tableBase, totalAccidents) => {

  const hideChoice = document.getElementsByName("hide-choice")
  if (document.getElementById("one-year").checked) {
    hideChoice.forEach(element => element.setAttribute("hidden", ""))
  } else {
    hideChoice.forEach(element => element.removeAttribute("hidden", ""))
  }

  const rowsTemplate = tableBase.map(element => `
  <tr><td>${element.year}</td><td>${element.carros}</td><td>${element.motos}</td><td>${element.total}</td></tr>
  `).join("")
  document.getElementById("table-results").removeAttribute("hidden", "")
  document.getElementById("t-head").innerHTML = "<th colspan=\"4\">Total de Acidentes</th>"
  document.getElementById("t-body").innerHTML = `
  <tr class="main-table-subtitle">
    <td>Ano</td><td>Carro</td>
    <td>Moto</td>
    <td>Todos</td>
  </tr>
  ${rowsTemplate}
  <tr>
    <td class="total">Total</td>
    <td class="total-accidents">${totalAccidents.carros}</td>
    <td class="total-accidents">${totalAccidents.motos}</td>
    <td class="total-accidents">${totalAccidents.total}</td>
  </tr>
  `  
}

const averageGetter = () => {
  const initialYear = +document.getElementById("initial-year").value
  const finalYear = +document.getElementById("final-year").value
  const divider = finalYear - initialYear + 1

  if (selectTransport.value === "total") {
    const totalDeAcidentes = Array.from(document.querySelectorAll(".total-accidents")).map(element => Number(element.textContent))
    const resultAverage = average(totalDeAcidentes, divider)
    document.getElementById("t-body").innerHTML += `<tr><td class="total">Médias</td><td>${resultAverage[0]}</td>
      <td>${resultAverage[1]}</td><td>${resultAverage[2]}</td></tr>`      
  } else {
    const totalDeAcidentes = +document.querySelector("#totalDeAcidentes").textContent
    const resultAverage = average(totalDeAcidentes, divider)
    document.getElementById("t-body").innerHTML += `<tr><td class="total">Média</td><td>${resultAverage}</td></tr>`
  }
}

window.addEventListener("load", () => {
  const injuries = JSON.parse(localStorage.getItem("injuries"))
  if (injuries) {
    showTotalTable(injuries)
  } else {
    getInjuries()
      .then(data => {
        showTotalTable(data)
        localStorage.setItem("injuries", JSON.stringify(data))
      })
  }
})

document.getElementById("one-year").addEventListener("change", disable)
document.getElementById("period").addEventListener("change", enable)
document.getElementById("search").addEventListener("click", search)
document.getElementById("average").addEventListener("click", averageGetter)
document.getElementById("order").addEventListener("change", search)
