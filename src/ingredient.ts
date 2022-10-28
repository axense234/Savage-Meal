const backgroundImages = document.getElementsByClassName("image-abs")!;
const ingredientTitle = document.getElementById("ingredient-title")!;
const ingredientImage = document.getElementById("ingredient-image")!;
const mealsRoot = document.getElementById("ingredients-list")!;
const sidebarMenuIngredient = document.getElementById("sidebar-menu")!;

const PopulateRelatedMeals = async () => {
  const ingredientsRes = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );

  const { meals: ingredients } = await ingredientsRes.json();

  const location = window.location.href;
  const ingredientId: string = location.split("=")[1];

  if (ingredientId) {
    const { strIngredient } = ingredients.find(
      (ingredient: { idIngredient: string }) =>
        ingredient.idIngredient === ingredientId
    );
    const imageSrc = `https://www.themealdb.com/images/ingredients/${strIngredient}.png`;
    const mealsRelatedRes = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`
    );
    const { meals: mealsRelated } = await mealsRelatedRes.json();
    // Changing background images
    let i = 0;
    do {
      backgroundImages.item(i)?.setAttribute("src", imageSrc);
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
      .map(
        (
          mealRelated: {
            strMeal: string;
            strMealThumb: string;
            idMeal: string;
          },
          index: number
        ) => {
          return `
     <li class="ingredient-in-list-li">
      <a href="/meal.html?meal_id=${mealRelated.idMeal}">
       <h2>${index + 1}.${mealRelated.strMeal}</h2>
       <img src="${mealRelated.strMealThumb}" alt=${mealRelated.strMeal}/>
      <a/>
     </li>
     `;
        }
      )
      .toString()
      .replace(/,/g, "");
    mealsRoot.innerHTML = renderedMealsRelated;
  }
};

PopulateRelatedMeals();

// Open/Close Sidebar
sidebarMenuIngredient.addEventListener("click", () => {
  const sidebarComp = document.getElementById("sidebar")!;
  console.log("open");
  const sidebarCloseButtonComp = document.getElementById("sidebar-close")!;
  sidebarComp.style.transform = "translateX(0)";
  sidebarCloseButtonComp.addEventListener("click", () => {
    console.log("close");
    sidebarComp.style.transform = "translateX(100%)";
  });
});
