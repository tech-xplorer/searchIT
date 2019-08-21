const fetchResults = (event) => {
    const url = new URL('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json');
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(body => {
      searchAlgo(body, event);
    })
    .catch(error => {
      console.log(`fetch error occured: ${error}!`);
    });
  };
  
  const searchAlgo = (body, event) => {
    const searchQuery = event.target.value;
    const regex = new RegExp(searchQuery, "i"),
          divArray = document.querySelectorAll('div#seach-results div'),
          node = document.querySelector('div#search-results');
    body.forEach((field) => {
      searchFunc(field, regex);
    });
    
    for(let i = 0; i < divArray.length; i++) {
      let originalDiv = divArray[i];
      for(let x = 0; x < divArray.length; x++) {
        let duplicateDiv = divArray[x];
        if(divArray.indexOf(originalDiv) !== divArray.indexOf(duplicateDiv)) {
          if(originalDiv.childNodes[2].textContent === duplicateDiv.childNodes[2].textContent) {
            duplicateDiv.remove();
          }
        }
      }
    }

    if(node.children.length === 0) {
        let myDiv = document.createElement('div'),
            p1 = document.createElement('p'),
            p2 = document.createElement('p'),
            text1 = document.createTextNode('Sorry! No cities found!'),
            text2 = document.createTextNode('Refine your search.');

        p1.appendChild(text1);
        p2.appendChild(text2);
        myDiv.appendChild(p1);
        myDiv.appendChild(p2);
        document.querySelector('div#search-results').appendChild(myDiv);
    }
    else {
      colorText();
    }
  };

  const colorText = () => {
    let divsArray = document.querySelectorAll('#search-results div');
    divsArray.forEach((div)=> {
      if(div.childNodes[3].textContent.indexOf('-') !== -1) {
        let string = div.childNodes[3].textContent;
            redText = string.slice(33, string.indexOf('%')) + '%',
            firstLetters = string.slice(0, 33),
            spanStart = '<span id="red-text">',
            spanEnd = '</span>',
            spanStartPlusRedText = spanStart.concat(redText),
            greenNumber = spanStartPlusRedText.concat(spanEnd);
            completeSpan = firstLetters.concat(greenNumber);
            div.childNodes[3].innerHTML = completeSpan;
      }
      else {
        let string = div.childNodes[3].textContent;
            redText = string.slice(33, string.indexOf('%')) + '%',
            firstLetters = string.slice(0, 33),
            spanStart = '<span id="green-text">',
            spanEnd = '</span>',
            spanStartPlusRedText = spanStart.concat(redText),
            redNumber = spanStartPlusRedText.concat(spanEnd);
            completeSpan = firstLetters.concat(redNumber);
            div.childNodes[3].innerHTML = completeSpan;
      }
    })
  }

  const nodeNotInDom = (field) => {
    let myDivs = document.querySelectorAll('div#search-results div');
    for(let i = 0; i < myDivs.length; i++) {
      let div = myDivs[i];
      if(div.childNodes[2].textContent === 'Population: '+field.population) {
        return false;
      }
      else {
        return true;
      }
    }
  };

  const searchFunc = (field, regex) => {
    let citySearchString = field.city,
        divHasChildren = document.querySelector('div#search-results').hasChildNodes();
        stateSearchString = field.state,
        cityMatch = citySearchString.match(regex),
        stateMatch = stateSearchString.match(regex);

    if((cityMatch !== null || stateMatch !== null)) {

      if(divHasChildren) {
        let divsArray = document.querySelectorAll('div#search-results div');
        for(let i = 0; i < divsArray.length; i++) {
          let div = divsArray[i];
          if(div.childNodes[0].textContent === 'Sorry! No cities found!') {
            div.remove();
          }
        }
      }

      if(document.querySelector('div#search-results').childNodes.length === 1 || nodeNotInDom(field)) {
        let newDiv = document.createElement('div'),
            p1 = document.createElement('p'),
            p2 = document.createElement('p'),
            p3 = document.createElement('p'),
            p4 = document.createElement('p'),
            p6 = document.createElement('p'),
            p7 = document.createElement('p')

            city = document.createTextNode('City: '+field.city),
            state = document.createTextNode('State: '+field.state),
            population = document.createTextNode('Population: '+field.population),
            rank = document.createTextNode('Rank: '+field.rank),
            longitude = document.createTextNode('Longitude: '+field.longitude),
            percentageGrowth = document.createTextNode
            ('Growth Percentage(2000 to 2013): '+field.growth_from_2000_to_2013);
        
        p1.appendChild(city);
        p2.appendChild(state);
        p3.appendChild(population);
        p4.appendChild(percentageGrowth);
        p6.appendChild(rank);
        p7.appendChild(longitude);
        newDiv.appendChild(p1);
        newDiv.appendChild(p2);
        newDiv.appendChild(p3);
        newDiv.appendChild(p4);
        newDiv.appendChild(p6);
        newDiv.appendChild(p7);
        document.querySelector('div #search-results').appendChild(newDiv);

      }
    }
    else {
      //remove dynamic DOM node...
      let divsArray = document.querySelectorAll('div#search-results > div');
      divsArray.forEach((div) => {
        if(typeof div !== 'undefined') {
          if(div.childNodes[0].textContent === 'City: '+field.city) {
            div.remove();
          }
        }
      })
    }
  };
  
  const eventListeningFunctn = () => {
    const inputField = document.querySelector('#input-search input');
    inputField.addEventListener('keydown', (event) => {
      if((event.key === 'Backspace' && event.target.value === '')) {
        let myDiv = document.createElement('div'),
            p1 = document.createElement('p'),
            p2 = document.createElement('p'),
            text1 = document.createTextNode('Sorry! No cities found!'),
            text2 = document.createTextNode('Refine your search.');

        p1.appendChild(text1);
        p2.appendChild(text2);
        myDiv.appendChild(p1);
        myDiv.appendChild(p2);
        document.querySelector('div#search-results').appendChild(myDiv);
      }
      else {
        fetchResults(event);
      }
    });
  };

  const startApp = () => {
    document.querySelector('#input-search input').focus();
    eventListeningFunctn();
  };

  startApp();
 
  
  
  