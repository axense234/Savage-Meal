const searchResultsRootIngredients = document.getElementById(
  "sr-root-ingredients"
)!;
const sidebarMenuIngredients = document.getElementById("sidebar-menu")!;

// Populating search results content
const PopulateSearchResultsIngredients = async () => {
  // Getting data from TheMealDB
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const { meals: ingredients } = await response.json();
  const ingredientsLimited = ingredients.slice(0, 50);
  // Rendering The Meals
  if (ingredients) {
    const renderedIngredients = await ingredientsLimited
      .map(
        (ingredient: {
          idIngredient: string;
          strIngredient: string;
          strDescription: string;
        }) => {
          return `
           <a class="meal-container" href="/ingredient.html?i_id=${
             ingredient.idIngredient
           }">
           <img src="https://www.themealdb.com/images/ingredients/${
             ingredient.strIngredient
           }.png" alt="${ingredient.strIngredient}"/>
           <div class="meal-container-info">
           <h2>${ingredient.strIngredient}</h2>
           <p>Description: ${
             ingredient.strDescription?.slice(0, 125) || "No description"
           }...</p>
           </div>
           </a>
           `;
        }
      )
      .toString()
      .replace(/,/g, "");

    // Inserting the meals into the search results root and the new found title in search results title
    searchResultsRootIngredients.innerHTML = renderedIngredients;
  } else {
    searchResultsRootIngredients.innerHTML = "";
  }
};

const PopulateIngredients = async () => {
  console.log("lol");
  await PopulateSearchResultsIngredients();
};

PopulateIngredients();

// Open/Close Sidebar
sidebarMenuIngredients.addEventListener("click", () => {
  const sidebarComp = document.getElementById("sidebar")!;
  console.log("open");
  const sidebarCloseButtonComp = document.getElementById("sidebar-close")!;
  sidebarComp.style.transform = "translateX(0)";
  sidebarCloseButtonComp.addEventListener("click", () => {
    console.log("close");
    sidebarComp.style.transform = "translateX(100%)";
  });
});
