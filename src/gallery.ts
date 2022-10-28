const sidebarMenuGallery = document.getElementById("sidebar-menu")!;
const searchResultsRootGallery = document.getElementById("sr-root-gallery")!;

// Populating search results content
const PopulateSearchResultsGallery = async (query: string = "") => {
  // Getting data from TheMealDB
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const { meals } = await response.json();
  // Rendering The Meals
  console.log(meals);
  if (meals) {
    const renderedMeals = await meals
      .map(
        (meal: {
          idMeal: string;
          strMeal: string;
          strCategory: string;
          strArea: string;
          strMealThumb: string;
        }) => {
          return `
           <a class="meal-container" href="/meal.html?meal_id=${meal.idMeal}">
           <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
           <div class="meal-container-info">
           <h2>${meal.strMeal}</h2>
           <p>Category: ${meal.strCategory}</p>
           <p>Area: ${meal.strArea}</p>
           </div>
           </a>
           `;
        }
      )
      .toString()
      .replace(/,/g, "");

    // Inserting the meals into the search results root and the new found title in search results title
    searchResultsRootGallery.innerHTML = renderedMeals;
    return query;
  } else {
    searchResultsRootGallery.innerHTML = "";
  }
};

// Populating Gallery Search Results
const PopulateOnLoad = async () => {
  console.log("load");
  await PopulateSearchResultsGallery();
};

PopulateOnLoad();

// Open/Close Sidebar
sidebarMenuGallery.addEventListener("click", () => {
  const sidebarComp = document.getElementById("sidebar")!;
  console.log("open");
  const sidebarCloseButtonComp = document.getElementById("sidebar-close")!;
  sidebarComp.style.transform = "translateX(0)";
  sidebarCloseButtonComp.addEventListener("click", () => {
    console.log("close");
    sidebarComp.style.transform = "translateX(100%)";
  });
});
