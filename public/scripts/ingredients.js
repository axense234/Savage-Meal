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
const searchResultsRootIngredients = document.getElementById("sr-root-ingredients");
const sidebarMenuIngredients = document.getElementById("sidebar-menu");
// Populating search results content
const PopulateSearchResultsIngredients = () => __awaiter(void 0, void 0, void 0, function* () {
    // Getting data from TheMealDB
    const response = yield fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const { meals: ingredients } = yield response.json();
    const ingredientsLimited = ingredients.slice(0, 50);
    // Rendering The Meals
    if (ingredients) {
        const renderedIngredients = yield ingredientsLimited
            .map((ingredient) => {
            var _a;
            return `
           <a class="meal-container" href="/ingredient.html?i_id=${ingredient.idIngredient}">
           <img src="https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png" alt="${ingredient.strIngredient}"/>
           <div class="meal-container-info">
           <h2>${ingredient.strIngredient}</h2>
           <p>Description: ${((_a = ingredient.strDescription) === null || _a === void 0 ? void 0 : _a.slice(0, 125)) || "No description"}...</p>
           </div>
           </a>
           `;
        })
            .toString()
            .replace(/,/g, "");
        // Inserting the meals into the search results root and the new found title in search results title
        searchResultsRootIngredients.innerHTML = renderedIngredients;
    }
    else {
        searchResultsRootIngredients.innerHTML = "";
    }
});
const PopulateIngredients = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("lol");
    yield PopulateSearchResultsIngredients();
});
PopulateIngredients();
// Open/Close Sidebar
sidebarMenuIngredients.addEventListener("click", () => {
    const sidebarComp = document.getElementById("sidebar");
    console.log("open");
    const sidebarCloseButtonComp = document.getElementById("sidebar-close");
    sidebarComp.style.transform = "translateX(0)";
    sidebarCloseButtonComp.addEventListener("click", () => {
        console.log("close");
        sidebarComp.style.transform = "translateX(100%)";
    });
});
