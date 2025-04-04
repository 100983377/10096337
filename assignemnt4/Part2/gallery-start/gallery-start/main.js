const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

let images = [  
    "./images/pic1.jpg",  
    "./images/pic2.jpg",  
    "./images/pic3.jpg",  
    "./images/pic4.jpg",  
    "./images/pic5.jpg"  
];  

let imageAlt = [  
    "Close eye eye",  
    "Rocks",  
    "Purple and white flowers",  
    "Ancient Egyptian hieroglyphs",  
    "Butterfly on a leaf"  
];  

/* Looping through images */  
for (let i = 0; i < images.length; i++) {  
    const newImage = document.createElement("img");  
    newImage.setAttribute("src", images[i]);  
    newImage.setAttribute("alt", imageAlt[i]);  
    thumbBar.appendChild(newImage);  

    // Event listener to update the displayed image when a thumbnail is clicked
    newImage.addEventListener("click", function () {  
        displayedImage.setAttribute("src", images[i]);  
        displayedImage.setAttribute("alt", imageAlt[i]);  
    });  
}  

/* Wiring up the Darken/Lighten button */  
btn.addEventListener("click", function () {  
    if (btn.getAttribute("class") === "dark") {  
        btn.setAttribute("class", "light");  
        btn.textContent = "Lighten";  
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";  
    } else {  
        btn.setAttribute("class", "dark");  
        btn.textContent = "Darken";  
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";  
    }  
});  