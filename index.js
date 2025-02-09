const query = "salad"
const appID = `53319cac`
const apiKey = `604df2e2f90ef7ebeb487a0b67df7cc5`

const content = document.querySelector(".content");
const recipeForm = document.querySelector(".recipeForm");
const generateDiv = document.getElementById("generateDiv");
const keyword = document.getElementById("keyword");

recipeForm.addEventListener("submit", async event =>{
    event.preventDefault();

    const keywordValue = keyword.value.trim();
    console.log(keywordValue)
    if(keywordValue){
        try{
            const recipeData = await getRecipeData();
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
    

    //petla na podstawie dlugosci tablicy hits, w kazdej iteracji pobieramy nowe dane na temat przepisów
    //i tworzymy div ze wszystkimi pareamtremi w html
}


function errorMessageDisplay(message){
    keyword.textContent = "";
    keyword.placeholder = message
}
 