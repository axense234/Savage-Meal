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
const searchResultsRoot = document.getElementById("sr-root");
const searchInput = document.getElementById("meal-finder");
const searchResultsTitle = document.getElementById("search-results-title");
const sidebarMenu = document.getElementById("sidebar-menu");
// Populating search results content
const PopulateSearchResults = (query = "", searchResultsTitle, searchResultsRoot, page = "/") => __awaiter(void 0, void 0, void 0, function* () {
    // Getting data from TheMealDB
    const response = yield fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const { meals } = yield response.json();
    // Rendering The Meals
    if (meals) {
        const renderedMeals = yield meals
            .map((meal) => {
            return `
           <a class="meal-container" href="/meal.html?meal_id=${meal.idMeal}">
           <img src="${meal.strMealThumb}"/>
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
        if (page !== "Gallery") {
            searchResultsTitle.innerHTML = `Search Results for ${query}!`;
        }
        searchResultsRoot.innerHTML = renderedMeals;
        return query;
    }
    else {
        if (page !== "Gallery") {
            searchResultsTitle.innerHTML = `Could not find any recipes!Please try again!<a href="#top" id="top-anchor">Search!</a>`;
        }
        searchResultsRoot.innerHTML = "";
    }
});
// Event listener for change
searchInput.addEventListener("change", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    searchResultsTitle.innerHTML = `
    Search Results for ${e.target.value}
    `;
    yield PopulateSearchResults(e.target.value, searchResultsTitle, searchResultsRoot);
}));
// Open/Close Sidebar
sidebarMenu.addEventListener("click", () => {
    const sidebarComp = document.getElementById("sidebar");
    console.log("open");
    const sidebarCloseButtonComp = document.getElementById("sidebar-close");
    sidebarComp.style.transform = "translateX(0)";
    sidebarCloseButtonComp.addEventListener("click", () => {
        console.log("close");
        sidebarComp.style.transform = "translateX(100%)";
    });
});
