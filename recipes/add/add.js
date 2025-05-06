let data = {
  id: undefined,
  coverSrc: undefined,
  name: undefined,
  description: undefined,
  author: undefined,
  totalTime: undefined,
  preparationTime: undefined,
  finalWeight: undefined,
  portions: undefined,
  hearts: undefined,
  ingredients: [],
  cookingMethods: [],
  category: [],
}

let curPage = 1;
let maxItemPage = 5;

let originalData = foodList.slice();
let filteredData = originalData.slice();
let searchedData = [];
let curData = [];

let curIngredients = []
let curNutrientSum = sumFoodData(foodList, curIngredients)

getUserLoginData()

function openSideBar() {
  let leftEl = document.querySelector(".detail_container .left");
  let rightEl = document.querySelector(".detail_container .right");

  leftEl.classList.toggle("sidebar-collapsed");
  rightEl.classList.toggle("main-expanded");
}

if (!checkAuthen()) {
  window.location.href = '../../index.html'
}

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

function showSelect() {
  document.getElementById('categoryFooter').outerHTML = `
               <select
                  id="categorySelect"
                  onchange="selectOption()"
                >
                  ${populateSelectOptions()}
                </select>
  `
}

function populateSelectOptions() {
  let optionsHTML = `
  <option selected value="Thêm mới hoặc chọn từ dropdown">
  Thêm mới hoặc chọn từ dropdown
  </option>`;

  recipeCategory.forEach(category => {
    optionsHTML += `<option value="${category.name.toLowerCase()}">${capitalizeWords(category.name)}</option>`;
  });
  return optionsHTML
}

function selectOption() {
  let selectedValue = document.getElementById('categorySelect').value
  document.getElementById('categorySelect').outerHTML = `
              <div
                  class="card_footer"
                  id="categoryFooter"
                  onclick="showSelect()"
                >
                  <img src="../../assets/tag.svg" alt="" />
                  <div class="card_categories_info" id="categoryText">
                    ${capitalizeWords(selectedValue)}
                  </div>
                </div>
  `;

  data.category.push({ id: data.category.length, name: selectedValue })
}

function addNewRecipe() {
  let formEl = document.querySelector('#form_input')
  let newData = getFormData(formEl)
  if (isEmtyData(newData)) {
    alert("Vui lòng không bỏ trống các thông tin cơ bản")
    return;
  }

  let textAreaEl = document.getElementById('cookingMethod').value
  data.cookingMethods = textAreaEl.split('\n')
  data = { ...data, ...newData }
  data.id = recipeList.length + 1
  data.hearts = 0
  alert("Thêm recipe mới thành công !!!")
  data.ingredients = [...curIngredients
  ]

  recipeList.push(data)
  localStorage.removeItem("recipeList")
  localStorage.setItem("recipeList", JSON.stringify(recipeList))
  window.location.href = '../index.html'
}

// Thêm ingredient
function addIngredients(id) {
  const index = curData.findIndex(item => item.id == id);
  if (index === -1) return;

  const item = curData[index];
  curIngredients.push(item);

  originalData = originalData.filter(food => food.id !== id);
  filteredData = filteredData.filter(food => food.id !== id);

  curNutrientSum = sumFoodData(foodList, curIngredients);

  applySearchAndSort();
  renderIngredients();
  renderCurIngredientsData();
}


// Xóa ingredient
function removeIngredeints(id) {
  const index = curIngredients.findIndex(item => item.id == id);
  if (index === -1) return;

  const item = curIngredients[index];
  curIngredients.splice(index, 1);

  originalData.push(item);
  filteredData.push(item);

  curNutrientSum = sumFoodData(foodList, curIngredients);

  applySearchAndSort();
  renderIngredients();
  renderCurIngredientsData();
}


// Hiển thị nguyên liệu đã được chọn
function renderIngredients() {
  let divEl = document.querySelector('.render_place')
  let renderBoxEl = ``
  curIngredients.map(ingre => {
    renderBoxEl += `
      <div class="render_box">
                    <div class="input-group">
                      <div class="form-control" style="border-radius: 0">
                        1 ${ingre.name} (${ingre.quantity})
                      </div>
                    </div>
                    <div class="input-group">
                      <span
                        class="input-group-text"
                        style="color: #1ab394; border-radius: 0; padding: 11px"
                      >
                        <i class="fa-solid fa-plus"></i>
                      </span>
                      <div
                        class="form-control"
                        style="border-radius: 0; color: #676a6c"
                      >
                        Add new food equivalent
                      </div>
                    </div>
                    <div class="input_group_icon" style="cursor:pointer" onclick="removeIngredeints(${ingre.id})">
                      <i class="fa-solid fa-trash"></i>
                    </div>
                  </div>
    `
  })
  divEl.innerHTML = renderBoxEl
}
renderIngredients()

// Hiển thị danh sách nguyên liệu
function renderData(dataList) {
  let tbodyEl = document.querySelector(".table tbody")
  let trEl = ``

  const startIndex = (curPage - 1) * maxItemPage;
  const endIndex = Math.min(startIndex + maxItemPage, dataList.length);

  for (let i = startIndex; i < endIndex; i++) {
    const food = dataList[i]
    trEl += `
    <tr class="ingredient_item">
                            <td>
                              <div class="ingredient_container">
                                <div class="ingredient_name">
                                ${food.name}
                                </div>
                                <div
                                  class="ingredient_quote"
                                  style="
                                    color: rgba(0, 0, 0, 0.4);
                                    font-size: 14px;
                                  "
                                >
                                  Community Recipes
                                </div>
                              </div>
                              <div class="ingredient_info">
                                <div class="input-group flex-nowrap">
                                  <div class="input-group-text portion-number">
                                    1
                                  </div>
                                  <div class="input-group-text portion-info">
                                    portion (${food.quantity} grams)
                                  </div>
                                  <div class="input-group-text portion-gram">
                                    ${food.quantity}g
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td><div class="td-flex-wrapper">${food.macronutrients.energy} kcal</div></td>
                            <td><div class="td-flex-wrapper">${food.macronutrients.fat} g</div></td>
                            <td><div class="td-flex-wrapper">${food.macronutrients.carbohydrate} g</div></td>
                            <td><div class="td-flex-wrapper">${food.macronutrients.protein} g</div></td>
                            <td class="add_button"
                            onclick="addIngredients(${food.id})">
                              <div>+</div>
                            </td>
                          </tr>
    `
  }

  tbodyEl.innerHTML = trEl
}

renderData(curData)

// Hiển thị thanh phân trang
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
      <button class="page_button" onclick="setPage(${curPage - 2})">
      <i class="fa-solid fa-forward-fast fa-flip-horizontal"></i>
    </button>
      <button class="page_button" onclick="setPage(${curPage - 1})">
      <i class="fa-solid fa-forward fa-flip-horizontal"></i>
    </button>
    `;
  }

  for (let i = start; i <= end; i++) {
    paginButtonHtml += `
      <button class="page_button ${i === curPage ? 'page_choice' : ''}" onclick="setPage(${i})">${i}</button>
    `;
  }

  if (end < countPage) {
    paginButtonHtml += `
      <button class="page_button" disabled>
      <i class="fa-solid fa-ellipsis"></i>
      </button>
    `;
  }

  paginBoxEl.innerHTML = `
    ${paginButtonHtml}
    <button class="page_button" onclick="setPage(${curPage + 1})">
      <i class="fa-solid fa-forward"></i>
    </button>
    <button class="page_button" onclick="setPage(${curPage + 2})">
      <i class="fa-solid fa-forward-fast"></i>
    </button>
  `;
}

// Kiểm tra trang hiện tại
function setPage(number) {
  const countPage = Math.ceil(curData.length / maxItemPage);
  if (number < 1 || number > countPage) return;

  curPage = number;
  renderPagin();
  renderData(curData);
}

function applySearchAndSort() {
  // Step 1: Search
  if (currentSearchKeyword) {
    searchedData = filteredData.filter(food =>
      food.name.toLowerCase().includes(currentSearchKeyword)
    );
  } else {
    searchedData = filteredData.slice();
  }

  // Step 2: Sort
  if (currentSortKey) {
    curData = searchedData.slice().sort((a, b) =>
      (a.macronutrients?.[currentSortKey] || 0) - (b.macronutrients?.[currentSortKey] || 0)
    );
  } else {
    curData = searchedData.slice();
  }

  renderPagin();
  renderData(curData);
}

// Tìm kiếm
function searchFood() {
  currentSearchKeyword = document.querySelector(".search input").value.trim().toLowerCase();
  curPage = 1;
  applySearchAndSort();
}

// Sắp xếp
function sortByNutrient() {
  currentSortKey = document.querySelector("#nutrient_sort").value;
  curPage = 1;
  applySearchAndSort();
}

// Lọc
function filterByCategory() {
  const selected = document.querySelector("#category_sort").value.trim().toLowerCase();
  curPage = 1;

  if (!selected) {
    filteredData = originalData.slice();
  } else {
    filteredData = originalData.filter(food =>
      food.category.toLowerCase().includes(selected)
    );
  }

  applySearchAndSort();
}

function populateCategoryOptions() {
  const selectElement = document.querySelector('#category_sort');

  let optionsHTML = `
  <option selected value=''>All categories</option>
  `;
  let mark = []

  for (let i = 0; i < foodList.length; i++) {
    if (!mark.some(m => m == foodList[i].category)) {
      optionsHTML += `<option value="${foodList[i].category.toLowerCase()}">${foodList[i].category}</option>`
      mark[i] = foodList[i].category
    }
  }

  selectElement.innerHTML = optionsHTML
}

const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('imgInput');

uploadBox.addEventListener('click', () => {
  fileInput.click()
})

// Handle file selection
fileInput.addEventListener('change', (e) => {
  handleFile(e.target.files[0])
})


function handleFile(file) {
  if (file && file.type.startsWith('image/')) {
    const previewImg = document.querySelector('.card_middle');
    const imageURL = URL.createObjectURL(file);
    data.coverSrc = imageURL
    previewImg.outerHTML = `
              <div class="card_middle">
                <img
                    width="100%"
                    style="border-radius:5px;object-fit: cover;cursor:pointer;max-height: 80% "
                    id="imgInput" 
                    onclick="uploadBox.click()"
                    src="${imageURL}"
                    alt=""
                  />
              </div>
    `
  } else {
    alert("Please select a valid image file.");
  }
}

function init() {
  currentSearchKeyword = "";
  currentSortKey = "";
  populateCategoryOptions();
  applySearchAndSort();
  document.querySelector("#category_sort").value = ''
  document.querySelector("#nutrient_sort").value = ''
  document.querySelector(".search input").value = ''
}

function pieChart() {
  const energy = curNutrientSum.macronutrients.energy || 1; // tránh chia 0
  const fat = curNutrientSum.macronutrients.fat || 0;
  const carb = curNutrientSum.macronutrients.carbohydrate || 0;
  const protein = curNutrientSum.macronutrients.protein || 0;

  const fatP = ((fat * 9) / energy * 100).toFixed(1);
  const carbP = ((carb * 4) / energy * 100).toFixed(1);
  const proteinP = ((protein * 4) / energy * 100).toFixed(1);

  const isAllZero = fat == 0 && carb == 0 && protein == 0;

  const data = isAllZero ? [1] : [fatP, carbP, proteinP];
  const labels = isAllZero ? ["No data"] : ["Fat", "Carbohydrate", "Protein"];
  const colors = isAllZero ? ["#CCCCCC"] : ["#DB4965", "#EA9F77", "#1AB394"];

  const ctx = document.getElementById("myPieChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "rect",
            padding: 20,
          },
        },
        tooltip: {
          enabled: true,
        },
        datalabels: {
          color: "#ffffff",
          font: {
            weight: "bold",
            size: 14,
          },
          formatter: (value, context) => {
            return isAllZero ? "" : value > 5 ? value + "%" : "";
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}


function renderCurIngredientsData() {
  let divEl = document.querySelector('.bottom_right')
  divEl.innerHTML = `
            <div class="right_top_box">
        <div class="right_tittle">
          <div style="font-size: 22px">Global analysis per portion</div>
          <div style="color: #888888">
            Energy, macronutrients and fiber distribution
          </div>
        </div>

        <div class="energy">
          <div>Energy</div>
          <div style="font-weight: 600">
            ${curNutrientSum.macronutrients.energy || 0} <span style="font-weight: 400">kcal</span>
          </div>
        </div>

        <div class="macronutrients">
          <div class="item">
            <div class="status" ${!curNutrientSum.macronutrients.fat ? 'style="border: 5px solid #f3f3f4"' : 'style="border: 5px solid #db4965"'}>
              ${curNutrientSum.macronutrients.fat || 0}g
            </div>
            <div style="font-weight: 300">Fat</div>
          </div>
          <div class="item">
            <div class="status"
            ${!curNutrientSum.macronutrients.carbohydrate ? 'style="border: 5px solid #f3f3f4"' : 'style="border: 5px solid #ea9f77"'}>
              ${curNutrientSum.macronutrients.carbohydrate || 0}g
            </div>
            <div style="font-weight: 300">Carbohydrate</div>
          </div>
          <div class="item">
            <div class="status" ${!curNutrientSum.macronutrients.protein ? 'style="border: 5px solid #f3f3f4"' : 'style="border: 5px solid #1ab394"'}>
              ${curNutrientSum.macronutrients.protein || 0}g
            </div>
            <div style="font-weight: 300">Protein</div>
          </div>
          <div class="item">
            <div class="status" ${!curNutrientSum.nutrition?.fiber ? 'style="border: 5px solid #f3f3f4"' : 'style="border: 5px solid #6a7d93"'}>
              ${curNutrientSum.nutrition?.fiber || 0}g
            </div>
            <div style="font-weight: 300">Fiber</div>
          </div>
        </div>
      </div>

      <div class="right_mid_box">
        <div class="mid_title">
          <div style="font-size: 22px">Macronutrients per portion</div>
          <div style="color: #888888">
            Macronutrients distribution of the recipe
          </div>
        </div>
        <canvas id="myPieChart"></canvas>
      </div>

      <div class="right_bottom_box">
        <div class="bottom_title">
          <div style="font-size: 22px">Micronutrients per portion</div>
          <div style="color: #888888">
            Micronutrients distribution of the recipe
          </div>
        </div>
        <table>
          <tr>
            <td>
              <div>Sodium</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.sodium || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin A</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.vitaminA || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin B-6</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.vitaminB6 || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin B-12</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.vitaminB12 || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin C</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.vitaminC || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin D (D2 + D3)</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.vitaminD || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin E</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.vitaminE || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin K</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.vitaminK || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Sugars</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.sugars || 0}</span> g</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Calcium</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.calcium || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Iron</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.iron || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Magnesium</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.magnesium || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Phosphorus</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.phosphorus || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Potassium</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.potassium || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Zinc</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.zinc || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Copper</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.copper || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Fluoride</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.fluoride || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Manganese</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.manganese || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Selenium</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.selenium || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Thiamin</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.thiamin || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Riboflavin</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.riboflavin || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Niacin</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.niacin || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Pantothenic acid</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.pantothenicAcid || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Folate, total</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.folateTotal || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Folic Acid</div>
              <div><span style="font-weight: 800">${curNutrientSum.micronutrients.folicAcid || 0}</span> ug</div>
            </td>
          </tr>
        </table>
      </div>
  `
  pieChart()
}

renderCurIngredientsData()

init();
renderHeader();