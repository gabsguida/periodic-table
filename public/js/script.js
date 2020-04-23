// this function will be use to show the element properties inside the function displayElement()
function writeOnHTMLElements(elementList, text){
    for (index = 0; index < elementList.length; index++){
        if (typeof text == "string" || typeof text == "number"){
            elementList[index].innerHTML = text;
        }else if (typeof text == "object" && Array.isArray(text)) {
            let topics = "";
            text.forEach(arrElement => {
                topics += `<li>${arrElement}</li>`;
            })
            elementList[index].innerHTML = topics;
        }
    }

}

// function that returns with element symbol
async function getPeriodicElement(symbol) {
    let response = await fetch("/api/element/" + symbol); 
    let elementJson = await response.json();
    console.log(elementJson);
    return elementJson;
}

// this function enable to click anywhere without giving error mesage 
async function clickCallback(event){
    if (event.target.tagName != "TD"){
        return false;
    }
    if (event.target.innerText == ""){
        return false;
    }
    document.getElementById("loading").className = "";
    document.getElementById("element_wrapper").className = "hidden";
    let el = await getPeriodicElement(event.target.innerText);
    document.getElementById("loading").className = "hidden";
    displayElement(el, event.target.className) // will show every element property when clicking on periodic table 
}

// call every class that represents the properties on JSON
function displayElement(element, elementClasses){
    var number = document.getElementsByClassName("element-number");
    writeOnHTMLElements(number, element.number);

    var symbol = document.getElementsByClassName("element-symbol");
    writeOnHTMLElements(symbol, element.symbol);
    
    var name = document.getElementsByClassName("element-name");
    writeOnHTMLElements(name, element.name);
    
    var weight = document.getElementsByClassName("element-weight");
    writeOnHTMLElements(weight, element.atomic_mass);
    
    var summary = document.getElementsByClassName("element-summary");
    writeOnHTMLElements(summary, element.summary);
    
    var phase = document.getElementsByClassName("element-phase");
    writeOnHTMLElements(phase, element.phase);
    
    var category = document.getElementsByClassName("element-category");
    writeOnHTMLElements(category, element.category);
    
    var boil = document.getElementsByClassName("element-boil");
    writeOnHTMLElements(boil, element.boil);
    
    var melt = document.getElementsByClassName("element-melt");
    writeOnHTMLElements(melt, element.melt);
    
    var density = document.getElementsByClassName("element-density");
    writeOnHTMLElements(density, element.density);
    
    var configuration = document.getElementsByClassName("element-configuration");
    console.log(element);
    // using regular expression (regex or regexp) to replace the electron configuration string
    var configurationReplaced = element.electron_configuration.replace(/(\d[spdf])(\d+)/g, "$1<sup>$2</sup>")
    writeOnHTMLElements(configuration, configurationReplaced);
    
    var affinity = document.getElementsByClassName("element-affinity");
    writeOnHTMLElements(affinity, element.electron_affinity);
    
    var electronegativity = document.getElementsByClassName("element-electronegativity");
    writeOnHTMLElements(electronegativity, element.electronegativity_pauling);
    
    var ionization = document.getElementsByClassName("element-ionization");
    var ionizationEnergies = element.ionization_energies.map(arrEl => {
        return arrEl + " kJ/mol";
    });
    writeOnHTMLElements(ionization, ionizationEnergies);
    
    document.getElementById("element_wrapper").className = "";
    document.getElementById("element_box").className = elementClasses;
}

document.addEventListener("click", clickCallback , false);
