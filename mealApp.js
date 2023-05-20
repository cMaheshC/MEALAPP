 //  ===================================================variables======================================
  let favList=[];                                             //Empty array to store the Favorite meals
  const home=document.getElementById('homee');                //Home-button
const searchInput = document.getElementById('in-search');     //Search-Bar
const searchButton = document.getElementById('s-img');        //search Button
const searchResults = document.getElementById('idd');         //Display space
const favButton=document.getElementById('favd');              //Favorite button

//====================================================Alert-Function=====================================
function showAlert(text){
  alert(text);
}
//========================================================Fetching-Api===================================
searchButton.addEventListener('click', () => {
  const search= searchInput.value;
  const k=search;
  if(!k.trim()){
    showAlert("Can not Search");
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)   //Api
    .then(response => response.json())
    .then(data => {
      if (data.meals === null) {
        showAlert('No meals found');
      } else {
        dResults(data.meals);
        // mealCount(data.meals);
      }
    })
    .catch(error => {
      console.error(error);
    });
});


// ============================================================Display-Results-Function======================
function dResults(meals) {
  searchResults.innerHTML = '';

  meals.forEach(meal => {                                  //Itrating over meals array         
    const divMeal = document.createElement('div');        //div .mealD
    divMeal.classList.add('mealD');

    const divCOMeal=document.createElement('div');           //div .mealCDO
    divCOMeal.classList.add('mealCDO');
    divMeal.appendChild(divCOMeal);

    const imgMeal = document.createElement('img');        //img .mealImg
    imgMeal.src = meal.strMealThumb;
    imgMeal.alt = meal.strMeal;
    imgMeal.classList.add('mealImg');
    divCOMeal.appendChild(imgMeal);

    const divCTMeal=document.createElement('div');           //div .mealCDT
    divCTMeal.classList.add('mealCDT');
    divMeal.appendChild(divCTMeal);

    const nameMeal = document.createElement('h2');        //h2  .mealName
    nameMeal.classList.add('mealName');
    nameMeal.innerText = meal.strMeal;
    divCTMeal.appendChild(nameMeal);
                                                  
    const jsFav = document.createElement('button');       //button .mealButton
    jsFav.classList.add('mealButton');
    jsFav.innerHTML = '<i class="fa-solid fa-heart fa-beat-fade"></i> Add to Favorites';
    jsFav.addEventListener('click', () => {                 //eventListner to detect the click of "AddToFavorite" button
      addToFavList(meal);                                  //Adding meal to Favorites by calling addToFavList function
    });
    divCTMeal.appendChild(jsFav);

    searchResults.appendChild(divMeal);                     //making divMeal as a child to searchResults

          // ----------------------------------(Creating a new Page when Search-Results is clicked)-------------------------------
          const clickElm = document.createElement('div');         //Created a new div to create a new page when meal is clicked
          clickElm.classList.add('elm');                          //div  .elm

                            //`````````````````````````````````.cHead````````````````````````````````````
          const clickHead=document.createElement('div');           //div   .cHead
          clickHead.classList.add('cHead'); 
                clickElm.appendChild(clickHead);

                //.........................................`cHeadO........................................

                const childO=document.createElement('div');           //div   .cHeadO
          childO.classList.add('cHeadO'); 
                clickHead.appendChild(childO);


                const ccName=document.createElement('h1');               //h1  .ccNames
                ccName.classList.add('ccNames');
                ccName.innerText = meal.strMeal;
                childO.appendChild(ccName);

                const ccImg=document.createElement('img');           //img   .cImg
              ccImg.classList.add('cImg');
                  ccImg.src = meal.strMealThumb;
                  ccImg.alt = meal.strMeal;
                  childO.appendChild(ccImg);


                //.........................................................................................

                //...................................`cHeadT`...............................................

                const childT=document.createElement('div');           //div   .cHeadT
          childT.classList.add('cHeadT'); 
                clickHead.appendChild(childT);

                const childTT=document.createElement('div');           //div   .cHeadTT
          childTT.classList.add('cHeadTT'); 
          childT.appendChild(childTT);

                const ingredients = document.createElement('ul');         //ul    .inrg
                ingredients.classList.add('inrg');
                for (let aa = 1; aa <= 30; aa++) {
                  if (meal[`strIngredient${aa}`]) {
                    const ingredient = document.createElement('li');
                    ingredient.innerText = `${meal[`strIngredient${aa}`]} - ${meal[`strMeasure${aa}`]}`;
                    childTT.appendChild(ingredient);
                  } 
                }
                const childTTT=document.createElement('div');           //div   .cHeadTTT
          childTTT.classList.add('cHeadTTT'); 
          childT.appendChild(childTTT);


                const jsFavU = document.createElement('button');       //button .mealButtonU
    jsFavU.classList.add('mealButtonU');
    jsFavU.innerHTML = '<i class="fa-solid fa-heart fa-beat-fade"></i> Add to Favorites';
    jsFavU.addEventListener('click', () => {                 //eventListner to detect the click of "AddToFavorite" button
      addToFavList(meal);                                  //Adding meal to Favorites by calling addToFavList function
    });
    childTTT.appendChild(jsFavU);

                //.........................................................................................

                
                            //``````````````````````````````````````````````````````````````````````````


          //`````````````````````````````````````````````````````````cTail```````````````````````````````````````````````
                            const clickTail=document.createElement('div');           //div   .cTail
                            clickHead.classList.add('cTail'); 
                                  clickElm.appendChild(clickTail);
              

                                  const descriptions = document.createElement('div');       //div   .descriptionss
                                  descriptions.classList.add('descriptionss');
                                   descriptions.innerText = meal.strInstructions;
                                   clickTail.appendChild(descriptions);

          //```````````````````````````````````````````````````````````````````````````````````````````````````````````````

          clickElm.appendChild(ingredients);                     

          //add click-Event listner 
          imgMeal.addEventListener('click',()=>{                  //EventListner to detect the click on image
            searchResults.innerHTML = '';
            searchResults.appendChild(clickElm);
          })
          nameMeal.addEventListener('click',()=>{                 //EventListner to detect the click on name
            searchResults.innerHTML = '';
            searchResults.appendChild(clickElm);
          })
    // ------------------------------------------------------------------------------------
  });
}
// ===========================================================================================================================
// ==================================addToFavList=============================================================================
  function addToFavList(data){                                     //addToFavList function to add meal to "favList"
    if (!favList.includes(data)) {
      favList.push(data);
      showAlert(`${data.strMeal} added to Favorites`);
    } else {
      showAlert(`${data.strMeal} is already in Favorites`);
    }
  }
  // =========================================================================================================================
  // ======================================fav-display========================================================================
  favButton.addEventListener('click',disFav);                         //eventListner to detect click of "favButton"


  function disFav(){                                                  //"disFav" function to Displey the Favorite meals
      searchResults.innerHTML='';
      if(favList.length===0){
          showAlert("You don't have any Favorites")
      }else{
        favList.forEach(meal => {
          const divMeal = document.createElement('div');        //div .mealD
    divMeal.classList.add('mealD');

    const divCOMeal=document.createElement('div');           //div .mealCDO
    divCOMeal.classList.add('mealCDO');
    divMeal.appendChild(divCOMeal);

    const imgMeal = document.createElement('img');        //img .mealImg
    imgMeal.src = meal.strMealThumb;
    imgMeal.alt = meal.strMeal;
    imgMeal.classList.add('mealImg');
    divCOMeal.appendChild(imgMeal);

    const divCTMeal=document.createElement('div');           //div .mealCDT
    divCTMeal.classList.add('mealCDT');
    divMeal.appendChild(divCTMeal);

    const nameMeal = document.createElement('h2');        //h2  .mealName
    nameMeal.classList.add('mealName');
    nameMeal.innerText = meal.strMeal;
    divCTMeal.appendChild(nameMeal);
  
         
      
          const jsUFav = document.createElement('button');
          jsUFav.classList.add('unFav');
          jsUFav.innerHTML = '<i class="fa-solid fa-trash fa-shake"></i> Remove from Favorites';
          jsUFav.addEventListener('click', () => {
            addToUnFavList(meal);
          });
          divCTMeal.appendChild(jsUFav);
      
          searchResults.appendChild(divMeal);
        })
      
      }

  }



// ====================================================
// ============================================addToUnFavList==================================================
function addToUnFavList(meal){                                                  //"addToUnFavList" function to remove a meal from favorite list
  const index = favList.findIndex(fav => fav.idMeal === meal.idMeal);
  if (index !== -1) {
    favList.splice(index, 1);
    disFav();
    showAlert(`${meal.strMeal} has been removed from your favorites.`);
  }
}

// ===============================================Home=============================================================
home.addEventListener('click',cHome);



function cHome(){
  searchResults.innerHTML='';
  const homea=document.createElement('div');
homea.classList.add('homea');

const homeai=document.createElement('img');
homea.classList.add('homeai');
homeai.src="Meal-APP-FRONT.png";
homeai.alt="Home";
homea.appendChild(homeai);
searchResults.appendChild(homea);

}
// ============================================================new======================================


       
// =======================================================================================================
let names = [
  "Corba","Tamiya","Eggplant Adobo","Salmon Eggs Eggs Benedict","Stovetop Eggplant With Harissa, Chickpeas, and Cumin Yogurt","Roasted Eggplant With Tahini, Pine Nuts, and Lentils","Egg Drop Soup","Lasagne","Big Mac","Dal fry","Koshari","Kafteji","Kapsalon","Flamiche","Stamppot","Moussaka","Pancakes","Shawarma","Yaki Udon","Ribollita","Sugar Pie","Shakshuka","Rock Cakes","Pad See Ew","Ma Po Tofu","Beef Asado","Mulukhiyah","Nasi lemak","Rappie Pie","Apam balik","Burek","Bistek","Timbits","Beef Lo Mein","Leblebi Soup","Beef Wellington","Poutine"
	,"Kedgeree","Dal fry","Stuffed Lamb Tomatoes","Stuffed Bell Peppers with Quinoa and Black Beans","Creamy Tomato Soup","Beef Caldereta","Grilled Portuguese sardines","Grilled Mac and Cheese Sandwich","Vietnamese Grilled Pork (bun-thit-nuong)","Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber","Fish pie","Eton Mess","Tourtiere","Beef Mechado","Crispy Eggplant","Grilled eggplant with coconut milk","Tortang Talong","Irish stew","Mince Pies","Pumpkin Pie","Sushi","Kumpir","Timbits","Roti john","Fish fofos","Wontons"
];

//Sort names in ascending order
let sortedNames = names.sort();

//reference
let input = document.getElementById("in-search");

//Execute function on keyup
input.addEventListener("keyup", (e) => {
  //loop through above array
  //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
  removeElements();
  for (let i of sortedNames) {
    //convert input to lowercase and compare with each string

    if (
      i.toLowerCase().startsWith(input.value.toLowerCase()) &&
      input.value != ""
    ) {
      //create li element
      let listItem = document.createElement("li");
      //One common class name
      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.classList.add('v');
      listItem.setAttribute("onclick", "displayNames('" + i + "')");
      //Display matched part in bold
      let word = "<b>" + i.substr(0, input.value.length) + "</b>";
      word += i.substr(input.value.length);
      //display the value in array
      listItem.innerHTML = word;
      document.querySelector(".lists").appendChild(listItem);
    }
  }
});
function displayNames(value) {
  input.value = value;
  removeElements();
}
function removeElements() {
  //clear all the item
  let items = document.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
  });
}






  
