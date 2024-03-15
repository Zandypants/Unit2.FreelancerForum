// State
const stateKeys = ["name", "occupation", "price"];
const freelancerOptions = { // options for randomizer
  name: [
    "Alex", "Alice", 
    "Betty", "Bob", 
    "Carl", "Carol", 
    "Damian", "Donna", 
    "Egor", "Emma", 
    "Jack", "Jess", 
    "Noah", "Natalie", 
    "Mia", "Mike", 
    "Sam", "Simon", 
    "Tammy", "Tom", 
    "Wesley"],
  lastName: ["Berkley", "Bradford", "Cooper", "Doe", "Frumpkin", "Garfunkle", "Gibson", "Smith"],
  occupation: ["Writer", "Teacher", "Programmer", "Musician", "Painter", "Actor", "Trainer", "Clown", "Landscaper"],
  price: [15, 250], // min, max(inclusive)
};
const freelancers = [];
const maxFreelancers = 25;
const numUniqueNameCombinations = freelancerOptions.name.length * freelancerOptions.lastName.length;

// References
const averagePriceNode = document.querySelector("#averagePrice");
const unorderedLists = {};
for(key of stateKeys) {
  const ul = document.querySelector(`#freelancer${capitalize(key)}s > ul`);
  if (!ul) continue;

  unorderedLists[key] = ul;
}

// Init page
addFreeLancers(2);

// Update page
const intervalID = setInterval(addFreeLancer, 3000);

/**
 * Returns a copy of the input word with the first letter capitalized
 * @param {string} word to be capitalized (first letter)
 * @returns {string} capitalized word
 */
function capitalize(word) {
  // validation
  if (typeof(word) !== "string" || word.length < 1) 
    return "";

  return word[0].toUpperCase() + word.slice(1);
}

/**
 * Returns a random integer between min and max
 * expects integers, but will convert decimals to integers before randomization
 * @param {number} min (inclusive) integer
 * @param {number} max (exclusive) integer
 * @returns {number} random integer between min and max, NaN with bad arguments or min with bad range
 */
function randomInt(min, max) {
  // validation
  if (isNaN(min) || isNaN(max)) return NaN;
  if (max < min) return Math.round(min);
  // convert to integer before randomizing, for more reliable integer distribution
  min = Math.floor(min);
  max = Math.ceil(max);

  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Return a random element from an array, with even distribution across range
 * @param {Array} array to get random element from
 * @returns {any} element in array, or null with bad argument
 */
function randomElement(array) {
  // validation
  if (!Array.isArray(array)) return null;

  return array[randomInt(0,array.length)];
}

/**
 * Replaces elements under a given node with new elements derived from given contents and tag
 * @param {Node} node to add new DOM elements to
 * @param {Array} contents to fill each element with
 * @param {string} tag (html) for element creation
 */
function replaceChildren(node, contents, tag) {
  const elements = contents.map((content) => {
    const newElement = document.createElement(tag);
    newElement.textContent = content;
    return newElement;
  });

  node.replaceChildren(...elements);
}

/** Translates javascript data into html, then adds it to DOM in order to display on page */
function render() {
  for(key in unorderedLists) {
    const contents = [];
    for (let i = 0; i < freelancers.length; i++) {
      contents.push(freelancers[i][key]);
      if (key === "price") contents[i] = "$" + contents[i];
    }

    const tag = "li";
    replaceChildren(unorderedLists[key], contents, tag);
  }
}

/**
 * @returns {number} average price as an integer
 */
function calculateAveragePrice() {
  if (freelancers.length < 1) return 0;

  const totalPrice = freelancers.reduce((sum, freelancer) => sum + freelancer.price, 0);
  return Math.round(totalPrice / freelancers.length);
}

/**
 * Takes the newly calculated average price and inserts it into the relevant DOM string
 */
function updateAveragePrice() {
  const prevText = averagePriceNode.textContent;
  const samePrefix = prevText.slice(0, prevText.indexOf("$")+1); // up to $, which is a unique character in this string
  averagePriceNode.textContent = samePrefix + calculateAveragePrice() + '.'; // '.' is simple enough that readding it is easier than trying to slice or save a suffix
}

/**
 * Generate a randomized string in the format of "FirstName LastName", taken from freelancerOptions .name & .lastName
 * Note: tries to be unique relative to freelancers[every].name, but is not guaranteed
 * @returns {string} randomized string
 */
function generateUniqueFreelancerName() {
  let tryRandomName;
  const maxTries = (freelancers.length >= numUniqueNameCombinations) ? 1 : numUniqueNameCombinations * 2;

  for(let i=0; i < maxTries; i++) {
    // generate
    tryRandomName = `${randomElement(freelancerOptions.name)} ${randomElement(freelancerOptions.lastName)}`;
    // check uniqueness
    if (!freelancers.find(obj => obj.name === tryRandomName)) break;
  }

  return tryRandomName;
}

/**
 * Randomly generates a new freelancer object
 * @returns {object} freelancer {name: string, occupation: string, price: number}
 */
function generateFreelancer() {
  const freelancer = {};
  
  freelancer.name = generateUniqueFreelancerName();
  freelancer.occupation = randomElement(freelancerOptions.occupation);
  freelancer.price = randomInt(freelancerOptions.price[0], freelancerOptions.price[1]+1); // +1 makes max inclusive

  return freelancer;
}

/**
 * Adds one or more randomly generated freelancer objects to the stored list of freelancers, then updates DOM (also enforces maximum freelancer amount)
 * @param {number} amount of freelancers to add
 */
function addFreeLancers(amount) {
  for (let i = 0; i < amount; i++) {
    if (freelancers.length >= maxFreelancers) {
      clearInterval(intervalID);
      return;
    }

    freelancers.push(generateFreelancer());
  }
  updateAveragePrice();
  render();
}

/**
 * Adds one freelancer
 * Helper function for supplying the interval callback
 */
function addFreeLancer() {
  addFreeLancers(1);
}