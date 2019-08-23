const appState = {
  data: undefined,
}
const fetchResults = (input) => {
      const url = new URL('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json');
      
    
    if(!appState.data){     
      fetch(url)
      .then(response => {        
        return response.json();
      })
      .then(body => {
        appState.data = body;
        searchAlgo(body, input);
      })
      .catch(error => {
        console.error(error);
      });
    }else{
      searchAlgo(appState.data, input);
    }    
  };
  
  const searchAlgo = (body, input) => {
    const searchQuery = input.value.toLowerCase();    
    const node = document.querySelector('div#search-results');
    appState.data = body.filter(city => {
      return (city.state.toLowerCase().startsWith(searchQuery) || city.city.toLowerCase().startsWith(searchQuery));
    });

    cleanDom(); // cleans dom for mounting new matches

    appState.data.forEach((field) => {
      // adds matched cities/states from a filtered list data      
      searchFunc(field);           
    });    
    

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
 
  const cleanDom = () => {
    let myDivs = document.querySelectorAll('div#search-results div');
    for(let i = 0; i < myDivs.length; i++) {
      let div = myDivs[i];
      div.remove();      
    }
  };

  const searchFunc = (field) => {
    
    let divHasChildren = document.querySelector('div#search-results').hasChildNodes();    

      if(divHasChildren) {
        let divsArray = document.querySelectorAll('div#search-results div');
        for(let i = 0; i < divsArray.length; i++) {
          let div = divsArray[i];
          if(div.childNodes[0].textContent === 'Sorry! No cities found!') {
            div.remove();
          }
        }
      }

    
        let newDiv = document.createElement('div'),
            p1 = document.createElement('p'),
            p2 = document.createElement('p'),
            p3 = document.createElement('p'),
            p4 = document.createElement('p'),
            p6 = document.createElement('p'),
            p7 = document.createElement('p')

            city = document.createTextNode('City: ' + field.city),
            state = document.createTextNode('State: ' + field.state),
            population = document.createTextNode('Population: ' + field.population),
            rank = document.createTextNode('Rank: ' + field.rank),
            longitude = document.createTextNode('Longitude: ' + field.longitude),
            percentageGrowth = document.createTextNode
            ('Growth Percentage(2000 to 2013): ' + field.growth_from_2000_to_2013);
        
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
        document.querySelector('div#search-results').appendChild(newDiv);   
  };

  const city404 = () => {
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
  };
  
  const eventListeningFunctn = () => {
    const inputField = document.querySelector('#input-search input');
    inputField.addEventListener('keyup', (event) => {
       //key up gives us the key pressed immediately, keydown is fired before value is written to field    
      
      if(event.key === 'Backspace' || event.key === 'Delete') appState.data = undefined; // refetch data once we delete part of the search string

      if(((event.key === 'Backspace' || event.key === 'Delete') && event.target.value === '') ||inputField.value === '') {
        cleanDom();         
        city404();
      }
      else {
        fetchResults(inputField);
      }
    });
  };

  const startApp = () => {
    document.querySelector('#input-search input').focus();
    eventListeningFunctn();
  };

  startApp();
 
  
  
  