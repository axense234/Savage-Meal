"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mealImageTag = document.getElementById("meal-image-tag");
const mealTitleTag = document.getElementById("meal-info-title");
const mealCategoryTag = document.getElementById("meal-category-tag");
const mealAreaTag = document.getElementById("meal-area-tag");
const mealInstructionsTag = document.getElementById("meal-instructions");
const mealIngredientsUsedTag = document.getElementById("meal-ingredients-list");
const mealVideoTutorialTag = document.getElementById("meal-video");
const sidebarMenuTag = document.getElementById("sidebar-menu");
const favoriteStar = document.getElementById("favorite-star");
// Populating search results content
const PopulateIndividualMealPage = () => __awaiter(void 0, void 0, void 0, function* () {
    const location = window.location.href;
    const mealId = location.split("=")[1];
    let res;
    if (Number(mealId)) {
        res = yield fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const favMeals = JSON.parse(localStorage.getItem("Favorite Meals")) || [];
        const favoriteMealBool = favMeals.find((meal) => meal === mealId);
        console.log(favoriteMealBool);
        // If meal id is found in Favorite Meals,set the star to fullfilled
        if (favoriteMealBool) {
            favoriteStar.setAttribute("src", "https://icons.veryicon.com/png/o/miscellaneous/regular-icon-1/star-filled-1.png");
        }
        favoriteStar.addEventListener("click", () => {
            var _a;
            // If star is not fullfilled
            if (!((_a = favoriteStar.getAttribute("src")) === null || _a === void 0 ? void 0 : _a.endsWith("png"))) {
                localStorage.setItem("Favorite Meals", JSON.stringify([...favMeals, mealId]));
                favoriteStar.setAttribute("src", "https://icons.veryicon.com/png/o/miscellaneous/regular-icon-1/star-filled-1.png");
            }
            else {
                const favoriteMealsFiltered = favMeals.filter((meal) => {
                    return meal !== mealId;
                });
                localStorage.setItem("Favorite Meals", JSON.stringify(favoriteMealsFiltered));
                favoriteStar.setAttribute("src", "https://imgs.search.brave.com/w3ga8Pux3PkQOzhaseyp9xAWWSY-1OoBB176nZbuN5U/rs:fit:981:982:1/g:ce/aHR0cDovL2Nkbi5v/bmxpbmV3ZWJmb250/cy5jb20vc3ZnL2lt/Z18yODc1NTgucG5n");
            }
        });
    }
    else if (mealId === "random") {
        favoriteStar.remove();
        res = yield fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    }
    const { meals } = yield (res === null || res === void 0 ? void 0 : res.json());
    const meal = meals[0];
    if (meal) {
        const { strMeal, strCategory, strArea, strMealThumb, strInstructions, strYoutube, } = meal;
        mealImageTag.setAttribute("src", strMealThumb);
        mealTitleTag.innerText = strMeal;
        mealAreaTag.innerText = `Meal Area: ${strArea}`;
        mealCategoryTag.innerText = `Meal Category: ${strCategory}`;
        mealInstructionsTag.innerText = strInstructions;
        // Get Meal Ingredients
        let mealIngredients = [];
        let i = 1;
        while (meal[`strIngredient${i}`]) {
            mealIngredients.push(meal[`strIngredient${i}`]);
            i++;
        }
        // Get Meal Ingredients Measures
        let mealIngredientsMeasures = [];
        let j = 1;
        while (meal[`strMeasure${j}`]) {
            mealIngredientsMeasures.push(meal[`strMeasure${j}`]);
            j++;
        }
        console.log(mealIngredients, mealIngredientsMeasures);
        // Populating Ingredients List
        const populatedIngredientsContent = mealIngredients
            .map((ingredient, index) => {
            return `
      <li class="meal-list-li">
          <img src="https://www.themealdb.com/images/ingredients/${ingredient}.png" alt="${ingredient}"/>
          <h2>${ingredient}</h2>
          <p>${mealIngredientsMeasures[index]}</p>
      </li> 
      `;
        })
            .toString()
            .replace(/,/g, "");
        mealIngredientsUsedTag.innerHTML = populatedIngredientsContent;
        // Changing iframe(tutorial video)
        const newIframeSRC = strYoutube.replace("watch?v=", "embed/");
        mealVideoTutorialTag.setAttribute("src", newIframeSRC);
    }
});
PopulateIndividualMealPage();
// Open/Close Sidebar
sidebarMenuTag.addEventListener("click", () => {
    const sidebarComp = document.getElementById("sidebar");
    console.log("open");
    const sidebarCloseButtonComp = document.getElementById("sidebar-close");
    sidebarComp.style.transform = "translateX(0)";
    sidebarCloseButtonComp.addEventListener("click", () => {
        console.log("close");
        sidebarComp.style.transform = "translateX(100%)";
    });
});
