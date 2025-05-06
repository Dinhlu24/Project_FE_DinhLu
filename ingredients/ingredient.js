let curPage = 1;
let maxItemPage = 9;

let originalData = foodList.slice();
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

// Đóng mở side bar
function openSideBar() {
  let leftEl = document.querySelector(".ingredients_container .left")
  let rightEl = document.querySelector(".ingredients_container .right")

  leftEl.classList.toggle("sidebar-collapsed");
  rightEl.classList.toggle("main-expanded");
}

// Đóng Form
function closeForm(formStatus) {
  document.querySelector(".food_form_container").style.display = (formStatus) ? 'none' : 'flex' // true đóng - false bật
}

// Mở Form
function openForm(formType, id) {
  document.querySelector(".food_form_container").innerHTML = `
        <div class="black_box" onclick="closeForm(true)"></div>
        <div class="food_form ${formType == 'add' ? 'food_add' : 'food_info'}">
          <div class="form_quote">
            <div class="close_form" onclick="closeForm(true)">
              <i class="fa-solid fa-xmark"></i>
            </div>
            <div class="form_title">${formType == 'add' ? 'Add new food' : 'Food information'}</div>
            <div>${formType == 'add' ? 'Fill in the fields below with the food information' : 'Check and update the information about the food'}</div>
          </div>
          <div class="food_form_header">
            <form id="food_input">
              <div class="header_left input_column">
                <div class="input-group">
                  <span class="input-group-text w-30">Name</span>
                  <input type="text" class="form-control w-70" name="name" />
                </div>
                <div class="input-group">
                  <span class="input-group-text w-30">Category</span>
                  <input
                    type="text"
                    class="form-control w-70"
                    name="category"
                  />
                </div>
              </div>
              <div class="header_right input_column">
                <div class="input-group">
                  <span class="input-group-text w-40">Source</span>
                  <input
                    type="text"
                    class="form-control w-60"
                    name="source"
                    placeholder="My foods"
                    style="background-color: #eeeeee"
                  />
                </div>
                <div class="input-group">
                  <span class="input-group-text w-40">Quantity</span>
                  <input
                    type="text"
                    class="form-control w-30"
                    style="background-color: white"
                    value="100"
                    name="quantity"
                  />
                  <div class="info_box form-control w-30">grams</div>
                </div>
              </div>
            </form>
          </div>
          <div class="hr_info">
            <div class="hr_text">Nutritional value per 100 g</div>
          </div>
          <div class="form_main">
            <div class="form_quote">
              <div class="form_title">Macronutrients</div>
            </div>
            <div class="form_main_top">
              <form id="food_input">
                <div class="main_left input_column">
                  <div class="input-group">
                    <span class="input-group-text w-30">Energy</span>
                    <input
                      type="text"
                      class="form-control w-62"
                      name="energy"
                    />
                    <div class="info_box form-control w-8">kcal</div>
                  </div>
                  <div class="input-group">
                    <span class="input-group-text w-30">Carbohydrate</span>
                    <input
                      type="text"
                      class="form-control w-62"
                      name="carbohydrate"
                    />
                    <div class="info_box form-control w-8">g</div>
                  </div>
                </div>
                <div class="main_right input_column">
                  <div class="input-group">
                    <span class="input-group-text w-30">Fat</span>
                    <input type="text" class="form-control w-62" name="fat" />
                    <div class="info_box form-control w-8">g</div>
                  </div>
                  <div class="input-group">
                    <span class="input-group-text w-30">Protein</span>
                    <input
                      type="text"
                      class="form-control w-62"
                      name="protein"
                    />
                    <div class="info_box form-control w-8">g</div>
                  </div>
                </div>
              </form>
            </div>
            <div class="form_main_bottom">
              <div class="form_quote">
                <div class="form_title">Micronutrients</div>
              </div>
              <form id="food_input">
                <div class="grid text-center" style="display:flex;gap:10px">
                  <div class="input_column">
                    <div class="input-group">
                      <span class="input-group-text w-30">Cholesterol</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="cholesterol"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Water</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="water"
                      />
                      <div class="info_box form-control w-8">g</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Vitamin B-12</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="vitamin_b12"
                      />
                      <div class="info_box form-control w-8">ug</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Vitamin E</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="vitamin_e"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Lactose</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="lactose"
                      />
                      <div class="info_box form-control w-8">g</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Sugars</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="sugars"
                      />
                      <div class="info_box form-control w-8">g</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Magnesium</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="magnesium"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Zinc</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="zinc"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Manganese</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="manganese"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Riboflavin</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="riboflavin"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Folate, total</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="folate_total"
                      />
                      <div class="info_box form-control w-8">ug</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30"
                        >Fatty acids, total saturated</span
                      >
                      <input
                        type="text"
                        class="form-control w-62"
                        name="fatty_acids_saturated"
                      />
                      <div class="info_box form-control w-8">g</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Chloride</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="chloride"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                  </div>
                  <div class="input_column">
                    <div class="input-group">
                      <span class="input-group-text w-30">Fiber</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="fiber"
                      />
                      <div class="info_box form-control w-8">g</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Vitamin A</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="vitamin_a"
                      />
                      <div class="info_box form-control w-8">ug</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Vitamin C</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="vitamin_c"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Vitamin K</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="vitamin_k"
                      />
                      <div class="info_box form-control w-8">ug</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Alcohol</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="alcohol"
                      />
                      <div class="info_box form-control w-8">g</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Calcium</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="calcium"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Phosphorus</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="phosphorus"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Copper</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="copper"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Selenium</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="selenium"
                      />
                      <div class="info_box form-control w-8">ug</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Niacin</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="niacin"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Follic acid</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="follic_acid"
                      />
                      <div class="info_box form-control w-8">ug</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30"
                        >Fatty acids, total monounsaturated</span
                      >
                      <input
                        type="text"
                        class="form-control w-62"
                        name="fatty_acids_monounsaturated"
                      />
                      <div class="info_box form-control w-8">g</div>
                    </div>
                  </div>
                  <div class="input_column">
                    <div class="input-group">
                      <span class="input-group-text w-30">Sodium</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="sodium"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Vitamin B-6</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="vitamin_b6"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30"
                        >Vitamin D (D2 + D3)</span
                      >
                      <input
                        type="text"
                        class="form-control w-62"
                        name="vitamin_d"
                      />
                      <div class="info_box form-control w-8">ug</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Starch</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="starch"
                      />
                      <div class="info_box form-control w-8">g</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Caffeine</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="caffeine"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Iron</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="iron"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Potassium</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="potassium"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Fluoride</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="fluoride"
                      />
                      <div class="info_box form-control w-8">ug</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30">Thiamin</span>
                      <input
                        type="text"
                        class="form-control w-62"
                        name="thiamin"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30"
                        >Pantothenic acid</span
                      >
                      <input
                        type="text"
                        class="form-control w-62"
                        name="pantothenic_acid"
                      />
                      <div class="info_box form-control w-8">mg</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30"
                        >Fatty acids, total trans</span
                      >
                      <input
                        type="text"
                        class="form-control w-62"
                        name="fatty_acids_trans"
                      />
                      <div class="info_box form-control w-8">g</div>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text w-30"
                        >Fatty acids, total polyunsaturated</span
                      >
                      <input
                        type="text"
                        class="form-control w-62"
                        name="fatty_acids_polyunsaturated"
                      />
                      <div class="info_box form-control w-8">g</div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="button_place">
              <button
                type="button"
                class="btn cancel_button"
                onclick="closeForm(true)"
              >
                Cancel
              </button>
              <button type="button" class="btn save_button" ${formType == 'info' ? `onclick="updateFood(${id})"` : `onclick="addNewFood()"`}>
                Save and close
              </button>
            </div>
          </div>
        </div>
    `

  if (formType == 'info')
    fillForm('.food_form.food_info', id)
}

// Thêm dữ liệu vào Form
function fillForm(formAdress, id) {
  const index = findIndexByID(id, foodList)
  const form = document.querySelector(formAdress)
  const inputs = form.querySelectorAll('input[name]');

  for (let i = 0; i < inputs.length; i++) {
    const name = inputs[i].name;
    let value = null;

    if (foodList[index].hasOwnProperty(name)) {
      value = foodList[index][name];
    } else if (foodList[index].macronutrients && foodList[index].macronutrients.hasOwnProperty(name)) {
      value = foodList[index].macronutrients[name];
    } else if (foodList[index].micronutrients && foodList[index].micronutrients.hasOwnProperty(name)) {
      value = foodList[index].micronutrients[name];
      if (typeof value === 'number') {
        value = value.toFixed(1);
      }
    }

    if (value !== null && value !== undefined) {
      inputs[i].value = value;
    }
  }
}


// Thêm danh sách food mới
function addNewFood() {
  let formEl = document.querySelectorAll("#food_input")
  let data = getFormData(formEl[0])
  if (isEmtyData(data)) {
    alert("Vui lòng không bỏ trống các thông tin cơ bản")
    return
  }

  data.id = foodList.length + 1
  data.macronutrients = getFormData(formEl[1])
  data.micronutrients = getFormData(formEl[2])

  foodList.push(data)

  init()
  localStorage.removeItem("foodList")
  localStorage.setItem("foodList", JSON.stringify(foodList))
  originalData = foodList.slice()
  closeForm(true)
  populateCategoryOptions()
  renderPagin()
  renderData(foodList)
}

// Cập nhật danh sách
function updateFood(id) {
  let formEl = document.querySelectorAll("#food_input")
  let data = getFormData(formEl[0])
  if (isEmtyData(data)) {
    alert("Vui lòng không bỏ trống các thông tin cơ bản")
    return
  }

  data.id = id
  data.macronutrients = getFormData(formEl[1])
  data.micronutrients = getFormData(formEl[2])

  const index = findIndexByID(id, foodList)
  if (index !== -1) {
    foodList.splice(index, 1, data)
  }

  localStorage.removeItem("foodList")
  localStorage.setItem("foodList", JSON.stringify(foodList))
  originalData = foodList.slice()
  closeForm(true)
  init()
  populateCategoryOptions()
}


// Để duyệt tất cả các lựa chọn danh mục hiện có để có thể lọc
function populateCategoryOptions() {
  const selectElement = document.querySelector('.sort_by_category');

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

// Hiển thị dữ liệu ra màn hình
function renderData(dataList) {
  let mainBorderEl = document.querySelector(".main_border");
  let mainCardEl = ``;

  const startIndex = (curPage - 1) * maxItemPage;
  const endIndex = Math.min(startIndex + maxItemPage, dataList.length);

  for (let i = startIndex; i < endIndex; i++) {
    const food = dataList[i];
    mainCardEl += `
      <div class="main_card" onclick="closeForm(false),openForm('info',${food.id})">
        <div class="card_info">
          <div class="info">${food.name}</div>
          <div class="author">${food.source}</div>
        </div>
        <div class="card_paragraph">
          <div class="card_energy">
            <span class="info_quote">${food.macronutrients.energy} kcal</span>
            <div class="info_title">Energy</div>
          </div>
          <div class="card_fat">
            <span class="info_quote">${food.macronutrients.fat} g</span>
            <div class="info_title">Fat</div>
          </div>
          <div class="card_carb">
            <span class="info_quote">${food.macronutrients.carbohydrate} g</span>
            <div class="info_title">Carbohydrate</div>
          </div>
          <div class="card_protein">
            <span class="info_quote">${food.macronutrients.protein} g</span>
            <div class="info_title">Protein</div>
          </div>
        </div>
      </div>
    `;
  }

  mainCardEl += `
    <div class="main_card create_food" onclick="closeForm(false),openForm('add',undefined)">
      <div class="create_icon"><img src="../assets/create_icon.svg" alt="" /></div>
      <div class="create_quote">Create food</div>
    </div>
  `;

  mainBorderEl.innerHTML = mainCardEl;
}

// Dùng để cập nhật dữ liệu sau khi tìm kiếm, sắp xếp
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

// Khởi tạo dữ liệu bạn đầu
function init() {
  originalData = foodList.slice();
  filteredData = originalData.slice();
  currentSearchKeyword = "";
  currentSortKey = "";
  populateCategoryOptions();
  applySearchAndSort();
  document.querySelector("#category_sort").value = ''
  document.querySelector("#nutrient_sort").value = ''
  document.querySelector(".search input").value = ''
}

init();
