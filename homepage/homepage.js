function openSideBar() {
  let leftEl = document.querySelector(".homepage_container .left")
  let rightEl = document.querySelector(".homepage_container .right")
  console.log(rightEl.style)

  leftEl.classList.toggle("sidebar-collapsed");
  rightEl.classList.toggle("main-expanded");
}

function renderData(recipesData) {
  const mainEl = document.querySelector(".main_border");
  let rowEl = ``;

  const startIndex = (curPage - 1) * maxItemPage;
  const endIndex = startIndex + maxItemPage;

  for (let i = startIndex; i < endIndex; i += 2) {
    let colEl = ``;

    for (let j = i; j < i + 2; j++) {
      if (!recipesData[j]) continue;

      const recipe = recipesData[j];
      const food = recipe.foodData;

      colEl += `
        <div class="col-12 col-md-6 mb-3">
          <div class="recipes_card d-flex">
            <div class="card_left me-2">
              <div class="community_recipes">
                <img src="../assets/Group.svg" alt="" />
                <div>Community Recipes</div>
              </div>
            </div>
            <div class="card_right">
              <div class="card_header">
                <div class="card_title">
                  ${recipe.name}
                </div>
                <div class="card_user_info">
                  <div>${recipe.author}</div>
                  <div class="heart_box">
                    <i class="fa-regular fa-heart"></i>
                    <div class="heart_count">${recipe.hearts}</div>
                  </div>
                </div>
                <div class="card_container">
                  <img src="../assets/tag.svg" alt="" />
                  <div class="card_categories_info">
                    Vegetarian dishes
                  </div>
                </div>
              </div>
              <div class="card_paragraph">
                <div class="card_by">
                  <div class="info_title">by</div>
                  <span class="info_title info_quote">${food?.quantity || "Unknown"}</span>
                </div>
                <div class="card_energy">
                  <div class="info_title">Energy</div>
                  <span class="info_quote">${food?.macronutrients.energy || 0} kcal</span>
                </div>
                <div class="card_fat">
                  <div class="info_title">Fat</div>
                  <span class="info_quote">${food?.macronutrients.fat || 0} g</span>
                </div>
                <div class="card_carb">
                  <div class="info_title">Carbohydrate</div>
                  <span class="info_quote">${food?.macronutrients.carbohydrate || 0} g</span>
                </div>
                <div class="card_protein">
                  <div class="info_title">Protein</div>
                  <span class="info_quote">${food?.macronutrients.protein || 0} g</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    rowEl += `<div class="row">${colEl}</div>`;
  }

  mainEl.innerHTML = rowEl;
}

function searchRecipe() {
  const input = document.querySelector(".search input").value
  renderData(recipeList.filter(recipe => recipe.name.toLowerCase().includes(input)))
}

function sortByNutrient() {
  const sortValue = document.querySelector("#nutrient_sort").value;

  if (sortValue) {
    renderData(recipeListWithFood.slice().sort((a, b) => {
      return a.foodData.macronutrients[sortValue] - b.foodData.macronutrients[sortValue]
    }))
    return
  }

  renderData(recipeListWithFood)
}

function populateCategoryOptions() {
  const selectElement = document.querySelector('.sort_by_category');

  let optionsHTML = `
  <option selected value=''>All categories</option>
  `;

  recipeCategory.forEach(category => {
    optionsHTML += `<option value="${category.name.toLowerCase()}">${capitalizeWords(category.name)}</option>`;
  });


  selectElement.innerHTML = `
  <div class="custom-select-wrapper">
      <select class="form-select custom-select" id="category_sort"
      onchange="filterByCategory()">
      ${optionsHTML}
      </select>
      <i class="fa-solid fa-angle-down select-icon"></i>
    </div>
  `;
}

function filterByCategory() {
  let selectEl = document.querySelector("#category_sort")

  renderData(recipeListWithFood.filter(recipe => {
    return recipe.category.some(categoryItem => categoryItem.name.includes(selectEl.value))
  }))
}

// Phân trang
let curPage = 1
let maxItemPage = 8

function renderPagin() {
  let countPage = Math.ceil(recipeList.length / maxItemPage)
  let paginBoxEl = document.querySelector("#pagin_box")
  let paginButtonHtml = ``

  for (let i = 1; i <= countPage; i++) {
    paginButtonHtml += `
      <button class="page_button ${i == curPage ? 'page_choice' : ''}" onclick="setPage(${i})">${i}</button>
      `
  }

  paginBoxEl.innerHTML = `
    <button class="page_button" id="pre" onclick="setPage(${curPage - 1})">
                <i class="fa-solid fa-forward fa-flip-horizontal"></i>
    </button>
    ${paginButtonHtml}
    <button class="page_button" id="next" onclick="setPage(${curPage + 1})">
                <i class="fa-solid fa-forward"></i>
    </button>
    `
}

function setPage(number) {
  let countPage = Math.ceil(recipeList.length / maxItemPage)
  if (number < 1 || number > countPage) return

  curPage = number
  renderData(recipeListWithFood)
  renderPagin()
}

renderPagin()
populateCategoryOptions();
renderData(recipeListWithFood)