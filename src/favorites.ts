const sidebarMenuFavorites = document.getElementById("sidebar-menu")!;
const searchResultsRootFavorites =
  document.getElementById("sr-root-favorites")!;

// Populating search results content
const PopulateSearchResultsFavorites = async (query: string = "") => {
  let newMeals: any[] = [];
  const favMeals = JSON.parse(localStorage.getItem("Favorite Meals")!) || [];
  // Gettings the individual meals
  for (let i = 1; i <= favMeals.length; i++) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favMeals[i - 1]}`
    );
    const { meals } = await res.json();
    if (meals[0]) {
      newMeals.push(meals[0]);
    }
  }

  if (newMeals) {
    const renderedMeals = newMeals
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
           <img src="${meal.strMealThumb}"/>
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
    searchResultsRootFavorites.innerHTML = renderedMeals;
    return query;
  } else {
    searchResultsRootFavorites.innerHTML = "";
  }
};

PopulateSearchResultsFavorites();

// Open/Close Sidebar
sidebarMenuFavorites.addEventListener("click", () => {
  const sidebarComp = document.getElementById("sidebar")!;
  console.log("open");
  const sidebarCloseButtonComp = document.getElementById("sidebar-close")!;
  sidebarComp.style.transform = "translateX(0)";
  sidebarCloseButtonComp.addEventListener("click", () => {
    console.log("close");
    sidebarComp.style.transform = "translateX(100%)";
  });
});
