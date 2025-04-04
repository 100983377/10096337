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
