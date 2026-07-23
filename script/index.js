let themeToggle = document.querySelector('.theme-toggle');
let promptInput = document.querySelector('.prompt-input');
let promptFrom = document.querySelector('.prompt-form');
let promptBtn = document.querySelector('.prompt-btn');
let modelSelect = document.getElementById('model-select');
let countSelect = document.getElementById('count-select');
let ratioSelect = document.getElementById('ratio-select');
let gridGallery = document.querySelector('.gallery-grid')



let examplePrompts=[
    "A magic forest with glowing plants and fairy homes among giant mushrooms",
    "An old steampunk airship floating through golden clouds at sunset",
    "A future Mars colony with glass domes and gardens against red mountains",
    "A dragon sleeping on gold coins in a crystal cave",
    "An underwater kingdom with merpeople and glowing coral buildings",
    "A floating island with waterfalls pouring into clouds below",
    "A witch's cottage in fall with magic herbs in the garden",
    "A robot painting in a sunny studio with art supplies around it",
    "A magical library with floating glowing books and spiral staircases",
    "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
    "A cosmic beach with glowing sand and an aurora in the night sky",
    "A medieval marketplace with colorful tents and street performers",
    "A cyberpunk city with neon signs and flying cars at night",
    "A peaceful bamboo forest with a hidden ancient temple",
    "A giant turtle carrying a village on its back in the ocean",
];


// set theme based on saved preference or system default
(()=>{
    let savedTheme = localStorage.getItem('theme')
    let systemPrefersDark = window.matchMedia('(prefers-color-scheme : dark)').matches;

    let isDarkTheme = savedTheme === 'dark' || (!savedTheme && systemPrefersDark)
    document.body.classList.toggle('dark-theme', isDarkTheme);
    themeToggle.querySelector('i').classList = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
} )()


// light & dark theme
let toggleTheme = ()=>{
    let isDarkTheme = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light')
    themeToggle.querySelector('i').classList = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
};

let generateImages = async (selectedModel , imageCount, aspectRatio, promptText)=>{
    let MODEL_URL = `https://api-inference.huggingface.co/models/${selectedModel}`;

    try{
        let response = await fetch(MODEL_URL,{
            headers: {
                Authorization : `Bearer ${APY_KEY}`,
                "Content-Type": "application/json",
            },
            method : "POST",
            body: JSON.stringify(data),
        })

        let result = await response.blob();
    } catch(error){
        console.log(error)
    }
}

// create placeholder cards with loading spinners
let createImageCards =(selectedModel , imageCount, aspectRatio, promptText) =>{

    gridGallery.innerHTML = "";

    for(let i=0; i<imageCount; i++){
        gridGallery.innerHTML += `
            <div class="img-card loading" id ="img-card-${i}" style = "aspect-ratio: ${aspectRatio}">
                        <div class="status-container">
                            <div class="spinner"></div>
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            <p class="status-text">Generate...</p>
                        </div>
                        <img src="image/IMG_3913.jpg" alt="" class="result-img">
                    </div>
        `;
    }
    generateImages(selectedModel , imageCount, aspectRatio, promptText)
}

// handle from submission
let handleFromSubmit = (e)=>{
    e.preventDefault();

    // get from value
    let selectedModel = modelSelect.value;
    let imageCount = parseInt(countSelect.value) || 1;
    let aspectRatio = ratioSelect.value || "1/1";
    let promptText = promptInput.value.trim();

    createImageCards(selectedModel , imageCount, aspectRatio, promptText)
}

// fill prompt input with random example
promptBtn.addEventListener('click', ()=>{
    let prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)]
    promptInput.value = prompt;
    promptInput.focus();
})
promptFrom.addEventListener("submit", handleFromSubmit);
themeToggle.addEventListener('click',toggleTheme);