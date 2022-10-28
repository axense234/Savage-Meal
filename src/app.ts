const searchResultsRoot = document.getElementById("sr-root")!;
const searchInput = document.getElementById("meal-finder")!;
const searchResultsTitle = document.getElementById("search-results-title")!;
const sidebarMenu = document.getElementById("sidebar-menu")!;

// Populating search results content
const PopulateSearchResults = async (
  query: string = "",
  searchResultsTitle: HTMLElement,
  searchResultsRoot: HTMLElement,
  page: string = "/"
) => {
  // Getting data from TheMealDB
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const { meals } = await response.json();
  // Rendering The Meals
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
    if (page !== "Gallery") {
      searchResultsTitle.innerHTML = `Search Results for ${query}!`;
    }
    searchResultsRoot.innerHTML = renderedMeals;
    return query;
  } else {
    if (page !== "Gallery") {
      searchResultsTitle.innerHTML = `Could not find any recipes!Please try again!<a href="#top" id="top-anchor">Search!</a>`;
    }
    searchResultsRoot.innerHTML = "";
  }
};

// Event listener for change
searchInput.addEventListener(
  "change",
  async (e: { preventDefault: () => void; target: any }) => {
    e.preventDefault();

    searchResultsTitle.innerHTML = `
    Search Results for ${e.target.value}
    `;

    await PopulateSearchResults(
      e.target.value,
      searchResultsTitle,
      searchResultsRoot
    );
  }
);

// Open/Close Sidebar
sidebarMenu.addEventListener("click", () => {
  const sidebarComp = document.getElementById("sidebar")!;
  console.log("open");
  const sidebarCloseButtonComp = document.getElementById("sidebar-close")!;
  sidebarComp.style.transform = "translateX(0)";
  sidebarCloseButtonComp.addEventListener("click", () => {
    console.log("close");
    sidebarComp.style.transform = "translateX(100%)";
  });
});
