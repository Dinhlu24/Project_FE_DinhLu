let curPage = 1;
let maxItemPage = 8;

let originalData = recipeListWithFood.slice();
let filteredData = [];
let searchedData = [];
let curData = [];

let currentSearchKeyword = "";
let currentSortKey = "";

getUserLoginData()
if (!checkAuthen()) {
  window.location.href = '../index.html'
}

renderHeader()
function renderHeader() {
  document.querySelector('header nav').innerHTML = `
  <div class="nav_bars" onclick="openSideBar()">
              <i class="fa-solid fa-bars"></i>
            </div>
            <div class="user_info">
              ${userLogin?.name}
              <div class="small_box">-</div>
            </div>
  `
}

function openSideBar() {
  let leftEl = document.querySelector(".recipe_container .left");
  let rightEl = document.querySelector(".recipe_container .right");

  leftEl.classList.toggle("sidebar-collapsed");
  rightEl.classList.toggle("main-expanded");
}

function displayAllCategory(dataCategoryList) {
  return dataCategoryList.map(cat => capitalizeWords(cat.name)).join(', ');
}

function renderData(dataList) {
  const mainEl = document.querySelector(".main_border");
  let rowEl = ``;

  const startIndex = (curPage - 1) * maxItemPage;
  const endIndex = Math.min(startIndex + maxItemPage, dataList.length);

  for (let i = startIndex; i < endIndex; i += 2) {
    let colEl = ``;

    for (let j = i; j < i + 2 && j < endIndex; j++) {
      const recipe = dataList[j];
      const food = recipe.foodNutrientSum;

      colEl += `
      <div class="col-12 col-md-6 mb-3">
      <div class="recipes_card d-flex" onclick="window.location.href = './detail/?id=${recipe.id}'">
      <div class="card_left me-2">
      <div class="community_recipes">
      <img src="../assets/Group.svg" alt="" />
      <div>Community Recipes</div>
      </div>
      </div>
      <div class="card_right">
      <div class="card_header">
      <div class="card_title">${recipe.name}</div>
      <div class="card_user_info">
      <div>${recipe.author}</div>
      <div class="heart_box">
      <i class="fa-regular fa-heart"></i>
      <div class="heart_count">${recipe.hearts || 0}</div>
      </div>
      </div>
      <div class="card_container">
      <img src="../assets/tag.svg" alt="" />
      <div class="card_categories_info">${displayAllCategory(recipe.category)}</div>
      </div>
      </div>
      <div class="card_paragraph">
      <div class="card_by">
      <div class="info_title">by</div>
      <span class="info_title info_quote">100g</span>
      </div>
      <div class="card_energy">
      <div class="info_title">Energy</div>
     <span class="info_quote">
      ${food?.macronutrients?.energy !== undefined && food?.macronutrients?.energy !== null && !isNaN(Number(food.macronutrients.energy)) && recipe?.portions ?
          (Number(food.macronutrients.energy) / Number(recipe.portions)).toFixed(1) : '-'} kcal
      </span>
      </div>
      <div class="card_fat">
      <div class="info_title">Fat</div>
      <span class="info_quote">
        ${food?.macronutrients?.fat !== undefined && food?.macronutrients?.fat !== null && !isNaN(Number(food.macronutrients.fat)) && recipe?.portions ?
          (Number(food.macronutrients.fat) / Number(recipe.portions)).toFixed(1) : '-'} g
     </span>
      </div>
      <div class="card_carb">
      <div class="info_title">Carbohydrate</div>
      <span class="info_quote">
       ${food?.macronutrients?.carbohydrate !== undefined && food?.macronutrients?.carbohydrate !== null && !isNaN(Number(food.macronutrients.carbohydrate)) && recipe?.portions ?
          (Number(food.macronutrients.carbohydrate) / Number(recipe.portions)).toFixed(1) : '-'} g
      </span>
      </div>
      <div class="card_protein">
      <div class="info_title">Protein</div>
      <span class="info_quote">
        ${food?.macronutrients?.protein !== undefined && food?.macronutrients?.protein !== null && !isNaN(Number(food.macronutrients.protein)) && recipe?.portions ?
          (Number(food.macronutrients.protein) / Number(recipe.portions)).toFixed(1) : '-'} g
      </span>
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

// OriginalData -> filterByCategory() => filteredData -> searchRecipe() => searchedData -> sortByNutrient() -> renderData
function applySearchAndSort() {
  // Bước 1: Search
  if (currentSearchKeyword) {
    searchedData = filteredData.filter(recipe =>
      recipe.name.toLowerCase().includes(currentSearchKeyword)
    );
  } else {
    searchedData = filteredData.slice();
  }

  // Bước 2: Sort
  if (currentSortKey) {
    curData = searchedData.slice().sort((a, b) =>
      (a.foodNutrientSum?.macronutrients?.[currentSortKey] || 0) -
      (b.foodNutrientSum?.macronutrients?.[currentSortKey] || 0)

    );
  } else {
    curData = searchedData.slice();
  }

  renderPagin();
  renderData(curData);
}

function searchRecipe() {
  currentSearchKeyword = document.querySelector(".search input").value.trim().toLowerCase();
  curPage = 1;
  applySearchAndSort();
}

function sortByNutrient() {
  currentSortKey = document.querySelector("#nutrient_sort").value;
  curPage = 1;
  applySearchAndSort();
}

function filterByCategory() {
  const selected = document.querySelector("#category_sort").value.trim().toLowerCase();
  curPage = 1;

  if (!selected) {
    filteredData = originalData.slice();
  } else {
    filteredData = originalData.filter(recipe =>
      recipe.category.some(cat => cat.name.toLowerCase().includes(selected))
    );
  }

  applySearchAndSort();
}

function populateCategoryOptions() {
  const selectElement = document.querySelector('.sort_by_category');

  let optionsHTML = `<option selected value=''>All categories</option>`;

  recipeCategory.forEach(category => {
    optionsHTML += `<option value="${category.name.toLowerCase()}">${capitalizeWords(category.name)}</option>`;
  });

  selectElement.innerHTML = `
    <div class="custom-select-wrapper">
      <select class="form-select custom-select" id="category_sort" onchange="filterByCategory()">
        ${optionsHTML}
      </select>
      <i class="fa-solid fa-angle-down select-icon"></i>
    </div>
  `;
}

function renderPagin() {
  const countPage = Math.ceil(curData.length / maxItemPage);
  const showPageLimit = 4;
  const paginBoxEl = document.querySelector("#pagin_box");
  let paginButtonHtml = '';

  let start = 1;
  let end = countPage;

  if (countPage > showPageLimit) {
    if (curPage <= 1) {
      start = 1;
      end = showPageLimit;
    } else if (curPage >= countPage - showPageLimit + 2) {
      start = countPage - showPageLimit + 1;
      end = countPage;
    } else {
      start = curPage;
      end = curPage + showPageLimit - 1;

      if (end > countPage) {
        end = countPage;
        start = countPage - showPageLimit + 1;
      }
    }
  }

  if (start > 1) {
    paginButtonHtml += `
      <button class="page_button" onclick="setPage(1)">1</button>
      <button class="page_button" disabled>...</button>
    `;
  }

  for (let i = start; i <= end; i++) {
    paginButtonHtml += `
      <button class="page_button ${i === curPage ? 'page_choice' : ''}" onclick="setPage(${i})">${i}</button>
    `;
  }

  if (end < countPage) {
    paginButtonHtml += `
      <button class="page_button" disabled>...</button>
      <button class="page_button" onclick="setPage(${countPage})">${countPage}</button>
    `;
  }

  paginBoxEl.innerHTML = `
    <button class="page_button" onclick="setPage(${curPage - 1})">
      <i class="fa-solid fa-forward fa-flip-horizontal"></i>
    </button>
    ${paginButtonHtml}
    <button class="page_button" onclick="setPage(${curPage + 1})">
      <i class="fa-solid fa-forward"></i>
    </button>
  `;
}

function setPage(number) {
  const countPage = Math.ceil(curData.length / maxItemPage);
  if (number < 1 || number > countPage) return;

  curPage = number;
  renderPagin();
  renderData(curData);
}

// Dùng để khởi tạo dữ liệu ban đầu
function init() {
  originalData = recipeListWithFood.slice();
  filteredData = originalData.slice();
  currentSearchKeyword = "";
  currentSortKey = "";

  populateCategoryOptions();
  applySearchAndSort();
}

document.querySelector('.favorites_count').innerText = favoriteList.length
init();