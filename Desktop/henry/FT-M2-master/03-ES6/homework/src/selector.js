var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
if (matchFunc(startEl)) resultSet.push(startEl)
  
for (let i = 0; i < startEl.children.length; i++) {
 let childrenResult = traverseDomAndCollectElements(matchFunc, startEl.children[i])

 resultSet.push(...resultSet, ...childrenResult)
}

return resultSet
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  
  if (selector[0] === "#") return "id"
  if (selector[0] === ".") return "class"
  if (selector.includes(".")) return "tag.class"
  return "tag"
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
    matchFunction = (el) => {
      if (("#" + el.id) === selector){
        return true
      }else false
    }
   
  } else if (selectorType === "class") {
    matchFunction = (el) => {
      for (let i = 0; i < el.classList.length; i++) {
        if ("." + el.classList[i] === selector) return true   
      }
    }
    
  } else if (selectorType === "tag.class") {

    matchFunction = (el) => {
    let [tag, clase] = selector.split(".")
    return matchFunctionMaker(tag) && matchFunctionMaker(clase)(el)
    
  }
} else if (selectorType === "tag") {
    
    matchFunction = (el) => {
      return el.tagName.toLowerCase() === selector
    }
  }
  return matchFunction; 
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
