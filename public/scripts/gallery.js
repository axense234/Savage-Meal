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
const sidebarMenuGallery = document.getElementById("sidebar-menu");
const searchResultsRootGallery = document.getElementById("sr-root-gallery");
// Populating search results content
const PopulateSearchResultsGallery = (query = "") => __awaiter(void 0, void 0, void 0, function* () {
    // Getting data from TheMealDB
    const response = yield fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const { meals } = yield response.json();
    // Rendering The Meals
    console.log(meals);
    if (meals) {
        const renderedMeals = yield meals
            .map((meal) => {
            return `
           <a class="meal-container" href="/meal.html?meal_id=${meal.idMeal}">
           <img src="${meal.strMealThumb}" alt="${meal.idMeal}"/>
           <div class="meal-container-info">
           <h2>${meal.strMeal}</h2>
           <p>Category: ${meal.strCategory}</p>
           <p>Area: ${meal.strArea}</p>
           </div>
           </a>
           `;
        })
            .toString()
            .replace(/,/g, "");
        // Inserting the meals into the search results root and the new found title in search results title
        searchResultsRootGallery.innerHTML = renderedMeals;
        return query;
    }
    else {
        searchResultsRootGallery.innerHTML = "";
    }
});
// Populating Gallery Search Results
const PopulateOnLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("load");
    yield PopulateSearchResultsGallery();
});
PopulateOnLoad();
// Open/Close Sidebar
sidebarMenuGallery.addEventListener("click", () => {
    const sidebarComp = document.getElementById("sidebar");
    console.log("open");
    const sidebarCloseButtonComp = document.getElementById("sidebar-close");
    sidebarComp.style.transform = "translateX(0)";
    sidebarCloseButtonComp.addEventListener("click", () => {
        console.log("close");
        sidebarComp.style.transform = "translateX(100%)";
    });
});
