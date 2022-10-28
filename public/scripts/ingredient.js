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
const backgroundImages = document.getElementsByClassName("image-abs");
const ingredientTitle = document.getElementById("ingredient-title");
const ingredientImage = document.getElementById("ingredient-image");
const mealsRoot = document.getElementById("ingredients-list");
const sidebarMenuIngredient = document.getElementById("sidebar-menu");
const PopulateRelatedMeals = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ingredientsRes = yield fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    const { meals: ingredients } = yield ingredientsRes.json();
    const location = window.location.href;
    const ingredientId = location.split("=")[1];
    if (ingredientId) {
        const { strIngredient } = ingredients.find((ingredient) => ingredient.idIngredient === ingredientId);
        const imageSrc = `https://www.themealdb.com/images/ingredients/${strIngredient}.png`;
        const mealsRelatedRes = yield fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`);
        const { meals: mealsRelated } = yield mealsRelatedRes.json();
        // Changing background images
        let i = 0;
        do {
            (_a = backgroundImages.item(i)) === null || _a === void 0 ? void 0 : _a.setAttribute("src", imageSrc);
            i++;
        } while (backgroundImages.item(i));
        // Changing ingredient title and image
        ingredientTitle.innerText = strIngredient;
        ingredientImage.setAttribute("src", imageSrc);
        // Dynamically inserting related meals into the respective root
        console.log(mealsRelated);
        const mealsRelatedFiltered = mealsRelated.slice(0, 5);
        console.log(mealsRelatedFiltered);
        const renderedMealsRelated = mealsRelatedFiltered
            .map((mealRelated, index) => {
            return `
     <li class="ingredient-in-list-li">
      <a href="/meal.html?meal_id=${mealRelated.idMeal}">
       <h2>${index + 1}.${mealRelated.strMeal}</h2>
       <img src="${mealRelated.strMealThumb}" alt=${mealRelated.strMeal}/>
      <a/>
     </li>
     `;
        })
            .toString()
            .replace(/,/g, "");
        mealsRoot.innerHTML = renderedMealsRelated;
    }
});
PopulateRelatedMeals();
// Open/Close Sidebar
sidebarMenuIngredient.addEventListener("click", () => {
    const sidebarComp = document.getElementById("sidebar");
    console.log("open");
    const sidebarCloseButtonComp = document.getElementById("sidebar-close");
    sidebarComp.style.transform = "translateX(0)";
    sidebarCloseButtonComp.addEventListener("click", () => {
        console.log("close");
        sidebarComp.style.transform = "translateX(100%)";
    });
});
