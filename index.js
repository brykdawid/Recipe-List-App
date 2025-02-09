const query = "salad"
const appID = `53319cac`
const apiKey = `604df2e2f90ef7ebeb487a0b67df7cc5`

const content = document.querySelector(".content");
const recipeForm = document.querySelector(".recipeForm");
const generateDiv = document.getElementById("generateDiv");
const keyword = document.getElementById("keyword");
const mainContainer = document.getElementById("mainContainer");
recipeForm.addEventListener("submit", async event =>{
    event.preventDefault();

    const keywordValue = keyword.value;
    console.log(keywordValue)
    if(keywordValue){
        try{
            const recipeData = await getRecipeData(keywordValue);
            displayRecipeData(recipeData);

        }
        catch(error){
            errorMessageDisplay(error);
        }
    }
    else{
        errorMessageDisplay("Provide recipe keyword")
    }
})

async function getRecipeData(keywordValue) {
    const apiUrl = `https://api.edamam.com/search?q=${keywordValue}&app_id=${appID}&app_key=${apiKey}`
    
        const response = await fetch(apiUrl)
        console.log(response)
        
        if(!response.ok){
            errorMessageDisplay(error)
        }
        return await response.json();
}

function displayRecipeData(data){

    console.log(data)

    const hits = data.hits;
    console.log(hits)
    
    content.textContent = "";
    mainContainer.style.display = "block";
    //petla na podstawie dlugosci tablicy hits, w kazdej iteracji pobieramy nowe dane na temat przepisów
    //i tworzymy div ze wszystkimi pareamtremi w html
    for(let i = 0; i < hits.length ; i++){
        const { recipe: {label, image, url, mealType}

        } = hits[i]

        console.log("kjhakhad")
        
        //Create recipeCard
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipeCard");
        content.appendChild(recipeCard);

        //Create Img
        const dishImg = document.createElement("img");
        dishImg.classList.add("dishImg");
        dishImg.src = image;
        console.log(`Img url: ${image}`)
        recipeCard.appendChild(dishImg)

        //Create Title
        const dishTitle = document.createElement("h3");
        dishTitle.classList.add("dishTitle")
        dishTitle.textContent = label;
        recipeCard.appendChild(dishTitle)
        

        //Create Meal Type
        const mealTypeDisplay = document.createElement("h4");
        mealTypeDisplay.classList.add("mealTypeDisplay");
        mealTypeDisplay.textContent = mealType;
        recipeCard.appendChild(mealTypeDisplay);

        //Create Link to recipe
        const dishLink = document.createElement("a");
        dishLink.classList.add("dishLink")
        dishLink.textContent = "Check the recipe here!"
        dishLink.href = url;
        recipeCard.appendChild(dishLink)

    } 
}


function errorMessageDisplay(message){
    keyword.textContent = "";
    keyword.placeholder = message
}
 