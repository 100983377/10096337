const customName = document.getElementById("customname");  
const randomize = document.getElementById("randomize");  
const story = document.getElementById("story");  

let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";  

let insertX = [  
    "Willy the Goblin",  
    "Big Daddy",  
    "Father Christmas"  
];  

let inserty = [  
    "the soup kitchen",  
    "Disneyland",  
    "the White House"  
];  

let insertz = [  
    "spontaneously combusted",  
    "melted into a puddle on the sidewalk",  
    "turned into a slug and crawled away"  
];  

randomize.addEventListener("click", result);  

function result() {  
    let xItem = randomValueFromArray(insertX);  
    let yItem = randomValueFromArray(inserty);  
    let zItem = randomValueFromArray(insertz);  

    let newStory = storyText;  
    newStory = newStory.replaceAll(":insertx:", xItem);  
    newStory = newStory.replace(":inserty:", yItem);  
    newStory = newStory.replace(":insertz:", zItem);  

    if (customName.value !== "") {  
        const name = customName.value;  
        newStory = newStory.replace("Bob", name);  
    }  

    if (document.getElementById("uk").checked) {  
        const weight = Math.round(pndToStone(300)) + " stone";  
        const temperature = Math.round(farToCelcius(94)) + " centigrade";  
        newStory = newStory.replace("300 pounds", weight);  
        newStory = newStory.replace("94 fahrenheit", temperature);  
    }  

    story.innerText = newStory;  
    story.style.visibility = "visible";  
}  

function pndToStone(value) {  
    return value * 0.0714286;  
}  

function farToCelcius(value) {  
    return (value - 32) * (5 / 9);  
}  

function randomValueFromArray(array) {  
    const random = Math.floor(Math.random() * array.length);  
    return array[random];  
}  