// State
const stateKeys = ["name", "occupation", "price"];
const freelancerOptions = {
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
  price: [15, 250],
};
const freelancers = [];
const maxFreelancers = 20;

// References
const unorderedLists = {};
for(key of stateKeys) {
  const ul = document.querySelector(`#freelancer${capitalize(key)}s > ul`);
  if (!ul) {
    console.log(`Couldn't find section > ul for key ${key}`);
    continue;
  }

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

function randomInt(min, max) {
  // validation TODO
  return Math.floor(Math.random() * (max - min) + min);
}
function randomElement(array) {
  // validation
  if (!Array.isArray(array)) return null;

  return array[randomInt(0,array.length)];
}

/**
 * Replaces elements under a given node with new elements derived from given contents and tag
 * @param {Node} node to add new html elements to
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

/** Translates javascript data into html in order to display on page */
function render() {
  for(key in unorderedLists) {
    const contents = [];
    for (let i = 0; i < freelancers.length; i++) {
      contents.push(freelancers[i][key]);
      if (key === "price") contents[i] = "$" + contents[i];
    }

    replaceChildren(unorderedLists[key], contents, "li");
  }
}

/**
 * Generate a randomized string in the format of "FirstName LastName", both taken from freelancerOptions.name 
 * Note: tries to be unique relative to freelancers[every].name, but is not guaranteed
 * @returns {string} randomized string
 */
function generateUniqueFreelancerName() {
  let tryRandomName;

  for(let i=0; i < 100; i++) {
    // generate
    tryRandomName = `${randomElement(freelancerOptions.name)} ${randomElement(freelancerOptions.lastName)}`;
    // check uniqueness
    if (!freelancers.find(obj => obj.name === tryRandomName)) break;
  }

  return tryRandomName;
}

function generateFreelancer() {
  const freelancer = {};
  
  freelancer.name = generateUniqueFreelancerName();
  freelancer.occupation = randomElement(freelancerOptions.occupation);
  freelancer.price = randomInt(freelancerOptions.price[0], freelancerOptions.price[1]+1); // +1 makes max inclusive

  return freelancer;
}

function addFreeLancers(amount) {
  for (let i = 0; i < amount; i++) {
    if (freelancers.length >= maxFreelancers) {
      clearInterval(intervalID);
      return;
    }

    freelancers.push(generateFreelancer());
  }
  render();
}

function addFreeLancer() {
  addFreeLancers(1);
}