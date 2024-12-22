
            function f1(){
                const name=prompt("enter your user name");
                prompt("enter your email id");
                Number(prompt("enter your password"));
                alert("you are logined succesfully welcome "+name+" to our website");

            }
            const searchbox=document.querySelector(".searchbox");
            const searchbtn=document.querySelector(".searchbtn");
            const recipebox=document.querySelector(".recipebox");
            const recipeDetailsContent=document.querySelector(".recipe-details-content");
            const recipeContent=document.querySelector(".recipe-details");
            const recipeCloseButton=document.querySelector(".recipe-close-btn");

            const fetchRecipes=async (query)=>{
                // functions to fetch the recipes
                const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
                console.log("fetching url:",url);
                const data= await fetch(url);// we can use any variable to axcess it
                const response= await data.json();// converting the data to json format;
                response.meals.forEach(meal=>{
                   // console.log(meals);//it means each meals will give in a seprate array 
                   const recipediv=document.createElement("div");
                   recipediv.classList.add("recipe");
                   recipediv.innerHTML=`
                              <img src="${meal.strMealThumb}">
                              <h3>${meal.strMeal}</h3>
                              <p><span>${meal.strArea}</span> Dish</p>
                              <p>Belongs to <span>${meal.strCategory}<span> catageory</p>

                    `
                    const button=document.createElement("button");
                    button.textContent="Veiw recipe";
                    recipediv.appendChild(button);
                    // adding event listener
                    button.addEventListener('click',()=>{
                        openrecipepopup(meal);
                    })
                   recipebox.appendChild(recipediv);

                });
                console.log(response);
            }
            const fetchIngredients=(meal)=>{
                console.log(meal);
                let ingredientslist="";
                for(let i=1;i<=20;i++){
                    const ingredient=meal[`strIngredient${i}`];
                    if(ingredient){
                        const measure=meal[`strMeasure${i}`];
                        ingredientslist+=`<li>${measure} ${ingredient}</li>`
                    }
                    else{
                        break;
                    }
                }
                return ingredientslist;
            } 
            const openrecipepopup=(meal)=>{
                recipeDetailsContent.innerHTML=`
                  <h2 class="recipename">${meal.strMeal}</h2>
                  <h3>Ingredents:<h3>
                  <ul class="ingredients">${fetchIngredients(meal)}</ul>
                  <div>
                  <h3 class="instructions">Instructions:</h3>
                  <p>${meal.strInstructions}</p>
                  </div>

                ` 
                recipeDetailsContent.parentElement.style.display="block";

            }
            recipeCloseButton.addEventListener("click",()=>{
                recipeDetailsContent.parentElement.style.display="none";
            })
            searchbtn.addEventListener("click",(e)=>{
                e.preventDefault();//prevents the plage relod once the button is clicked
                const searchInput=searchbox.value.trim();//to trim the extra spaces
                fetchRecipes(searchInput);
                console.log(searchInput);

            })
            


     
