/* eslint-disable no-alert */

/**************
 *   SLICE 1
 **************/

function updateCoffeeView(coffeeQty) {
  document.getElementById('coffee_counter').innerText = coffeeQty;
}

function clickCoffee(data) {
  data.coffee++;
  updateCoffeeView(data.coffee);
  renderProducers(data);
}

/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, coffeeCount) {
  return producers.forEach(producer => {
    if(coffeeCount >= producer.price/2){
      producer.unlocked = true;
    }
  });
}

function getUnlockedProducers(data) {
  return Object
    .values(data.producers)
    .filter(element => element.unlocked);
}

function makeDisplayNameFromId(id) {
  return id.split('_')
  .map(element =>
    element[0].toUpperCase() + element.slice(1))
  .join(' ');
}

// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeProducerDiv(producer) {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'producer';
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button type="button" id="buy_${producer.id}">Buy</button>
  </div>
  <div class="producer-column">
    <div>Quantity: ${producer.qty}</div>
    <div>Coffee/second: ${producer.cps}</div>
    <div>Cost: ${currentCost} coffee</div>
  </div>
  `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

function deleteAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderProducers(data) {
  let producerParent = document.getElementById('producer_container');
  deleteAllChildNodes(producerParent);

  unlockProducers(data.producers, data.coffee);

  let unlockedProducerArray = getUnlockedProducers(data);
  for(let i = 0; i < unlockedProducerArray.length; i++){
    producerParent
    .appendChild(makeProducerDiv(unlockedProducerArray[i]));
  }
}

/**************
 *   SLICE 3
 **************/

function getProducerById(data, producerId) {
  let producerArray = data.producers;
  return producerArray.filter(producerObject => producerObject.id === producerId)[0];
}

function canAffordProducer(data, producerId) {
  const producer = getProducerById(data, producerId);
  return (data.coffee >= producer.price);
}

function updateCPSView(cps) {
  const cookieDisplay = document.querySelector('#cps');
  cookieDisplay.innerText = cps;
  return cps;
}

function updatePrice(oldPrice) {
  return Math.floor(oldPrice*1.25);
}

function attemptToBuyProducer(data, producerId) {

  const producer = getProducerById(data, producerId);

  if(canAffordProducer(data, producerId)){
    producer.qty++;

    data.coffee -= producer.price;
    producer.price = updatePrice(producer.price);

    data.totalCPS += producer.cps;
    updateCPSView(data.totalCPS);

    return true;
  } else {
    window.alert('Not enough coffee!');
    return false;
  }
}

function buyButtonClick(event, data) {
  const eventTarget = event.target.id;
  if(event.target.tagName === 'BUTTON'){
    /**
     * must be event.target.tagName because setting event.target.nodeName
     * causes test specs to crash, even if the program runs properly
     */
    const producerName = eventTarget.slice(4);
    attemptToBuyProducer(data, producerName);

    renderProducers(data);
    updateCoffeeView(data.coffee);
  }
}

function tick(data) {
  data.coffee += data.totalCPS;
  updateCoffeeView(data.coffee);
  updateCPSView(data.totalCPS);

  renderProducers(data);

}
/***************************************
 *   Extra Credit Portion Starts Here
 ***************************************/

//Grabs a "fresh" save to be used for reset/save wipe. newSave file drawn from data.js
//try-catch used here to make sure mocha test specs still run with inclusion of localStorage
try {
  // eslint-disable-next-line no-undef
  window.localStorage.setItem('reset', JSON.stringify(newSave));
  //Draws current save file from localStorage to continue game after closing
  this.data = JSON.parse(window.localStorage.getItem('save'));
} catch(err){
  console.log('Mocha error bypassed using a cheeky try/catch method:');
}

function superTick(data){
  tick(data);
  window.localStorage.setItem('save', JSON.stringify(data));
  updateCoffeeMessage(data.coffee);
}

function compareKeys(importSave, data) {
  //checks to see if it's safe to import data by comparing keys to original
  var importedKeys = Object.keys(importSave).sort();
  var originalKeys = Object.keys(data).sort();
  return JSON.stringify(importedKeys) === JSON.stringify(originalKeys);
}

//Just a fun implementation I had that creates a funny message about coffee at intervals.
function updateCoffeeMessage(coffeeQty){
  const coffeeMessage = document.querySelector(".coffee-message");
  switch (true) {
    case coffeeQty <= 10:
      coffeeMessage.innerText =`Nobody wants to drink your coffee.`;
      break;
    case coffeeQty <= 100:
      coffeeMessage.innerText =`You try your coffee again. It's drinkable.`;
      break;
    case coffeeQty <= 500:
      coffeeMessage.innerText =`Your family accepts your coffee.`;
      break;
    case coffeeQty <= 1000:
      coffeeMessage.innerText =`Your coworkers like your coffee. Hooray!`;
      break;
    case coffeeQty <= 5000:
      coffeeMessage.innerText =`People in the neighborhood start talking about your coffee.`;
      break;
    case coffeeQty <= 10000:
      coffeeMessage.innerText =`Your coffee was feature in the local news!`;
      break;
    case coffeeQty <= 50000:
      coffeeMessage.innerText =`Your coffee is the official coffee of every sports team in your state!`;
      break;
    case coffeeQty <= 100000:
      coffeeMessage.innerText =`Your coffee is now considered a form of cryptocurrency.`;
      break;
    case coffeeQty <= 500000:
      coffeeMessage.innerText =`Starbucks wants to buy the rights to your coffee. You tell them to get lost.`;
      break;
    case coffeeQty <= 1000000:
      coffeeMessage.innerText =`Your coffee is noticed by a meme forum. Their value skyrockets.`;
      break;
    case coffeeQty <= 5000000:
      coffeeMessage.innerText =`Your coffee is now loved by every country in the world.`;
      break;
    case coffeeQty <= 10000000:
      coffeeMessage.innerText =`Jeff Bezos flies every single day just to drink your coffee.`;
      break;
    case coffeeQty <= 50000000:
      coffeeMessage.innerText =`Your coffee is now considered a global currency.`;
      break;
    case coffeeQty <= 100000000:
      coffeeMessage.innerText =`You should get back to grading other projects now.`;
      break;
    default:
      break;
  }
}

/*************************
 *  Start your engines!
 *************************/

// You don't need to edit any of the code below
// But it is worth reading so you know what it does!

// So far we've just defined some functions; we haven't actually
// called any of them. Now it's time to get things moving.

// We'll begin with a check to see if we're in a web browser; if we're just running this code in node for purposes of testing, we don't want to 'start the engines'.

// How does this check work? Node gives us access to a global variable /// called `process`, but this variable is undefined in the browser. So,
// we can see if we're in node by checking to see if `process` exists.
if (typeof process === 'undefined') {
  // Get starting data from the window object
  // (This comes from data.js)
  let data = window.data;

  // Add an event listener to the giant coffee emoji
  const bigCoffee = document.getElementById('big_coffee');
  bigCoffee.addEventListener('click', () => clickCoffee(data));

  // Add an event listener to the container that holds all of the producers
  // Pass in the browser event and our data object to the event listener
  const producerContainer = document.getElementById('producer_container');
  producerContainer.addEventListener('click', event => {
    buyButtonClick(event, data);
  });

  // Call the tick and save function simultaneously
  let globalTick = setInterval(() => superTick(data), 1000);


  //extra credit: adding button values
  const saveButton = document.getElementById('save');
  saveButton.addEventListener('click', function(){
    let SaveString = window.localStorage.getItem('save');
    //TODO: Encryption of string to make cheating harder
    window.prompt(`Below is your save key. Copy it and store it somewhere safe!`, SaveString);
  });

  const loadButton = document.getElementById('load');
  loadButton.addEventListener('click', function(){
    let result = window.prompt(`Please paste your save key here!`);

    //Small workaround solution to make sure that the load file is correctly parsed as an object
    //typeof does not work here because loadData needs to be able to hold a parsed variable
    try {
      JSON.parse(result);
    } catch(err){
      alert(`The save file wasn't valid... check to see if you copied it correctly.`);
      throw `Error: argument in loadButton was not an object`;
    }
    //..it was an object! Let's assign it a variable
    let loadData = JSON.parse(result);

    if(compareKeys(loadData, data)){
      //and just to be extra careful, let's make sure it's the same type of object...
      console.log('this is an object!');
        //Needed to find a way to "reset" the interval, workaround => delete and call new interval
        clearInterval(globalTick);
        data = loadData;
        tick(data); //calling tick function to reset visuals
        globalTick = setInterval(() => superTick(data), 1000);
    } else {
      alert(`Sorry, this format isn't valid, make sure you copied it correctly!`);
    }
  });

  const deleteButton = document.getElementById('delete-data');
  deleteButton.addEventListener('click', function(){
    //Adding warnings in case it was clicked by accident
    if(confirm(`Warning, doing this will COMPLETELY WIPE your save, starting anew. Are you sure?`)){
      let result = window.prompt(`If you are absolutely sure, please type in the following sentence (case sensitive): I hate coffee`);
      if(result === `I hate coffee`){
        //Needed to find a way to "reset" the interval, workaround => delete and call new interval
        clearInterval(globalTick);
        data = JSON.parse(window.localStorage.getItem('reset'));
        tick(data); //calling tick function to reset visuals
        setInterval(() => superTick(data), 1000);
      } else {
        alert(`You either changed your mind or didn't type it correctly. Either way, I'm happy you're here :]`);
      }
    }
  } );

}
// Meanwhile, if we aren't in a browser and are instead in node
// we'll need to exports the code written here so we can import and
// Don't worry if it's not clear exactly what's going on here;
// We just need this to run the tests in Mocha.


else if (process) {
  module.exports = {
    updateCoffeeView,
    clickCoffee,
    unlockProducers,
    getUnlockedProducers,
    makeDisplayNameFromId,
    makeProducerDiv,
    deleteAllChildNodes,
    renderProducers,
    updateCPSView,
    getProducerById,
    canAffordProducer,
    updatePrice,
    attemptToBuyProducer,
    buyButtonClick,
    tick
  };
}
