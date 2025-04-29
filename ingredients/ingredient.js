function openSideBar() {
  let leftEl = document.querySelector(".ingredients_container .left")
  let rightEl = document.querySelector(".ingredients_container .right")

  leftEl.classList.toggle("sidebar-collapsed");
  rightEl.classList.toggle("main-expanded");
}

function closeForm(formStatus) {
  document.querySelector(".food_form_container").style.display = (formStatus) ? 'none' : 'flex' // true đóng - false bật
}

function fillForm(formAdress, id) {
  const index = findIndexByID(id, foodList)
  const form = document.querySelector(formAdress)
  const inputs = form.querySelectorAll('input[name]');

  for (let i = 0; i < inputs.length; i++) {
    if (foodList[index][inputs[i].name])
      inputs[i].value = foodList[index][inputs[i].name]

    if (foodList[index].micronutrients[inputs[i].name] != undefined)
      inputs[i].value = parseFloat(foodList[index].micronutrients[inputs[i].name]).toFixed(1)

    if (foodList[index].macronutrients[inputs[i].name])
      inputs[i].value = foodList[index].macronutrients[inputs[i].name]
  }

}

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
                <div class="grid text-center" style="--bs-columns: 3">
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

function renderData(foods) {
  let mainBorderEl = document.querySelector(".main_border")
  let mainCardEl = ``

  const startIndex = (curPage - 1) * maxItemPage;
  const endIndex = startIndex + maxItemPage;

  for (let i = startIndex; i < endIndex && i < foods.length; i++) {
    mainCardEl += `
            <div
                class="main_card"
                onclick="closeForm(false),openForm('info',${foods[i].id})"
              >
                <div class="card_info">
                  <div class="info">${foods[i].name}</div>
                  <div class="author">${foods[i].source}</div>
                </div>
                <!--  -->
                <div class="card_paragraph">
                  <div class="card_energy">
                    <span class="info_quote"> ${foods[i].macronutrients.energy} kcal </span>
                    <div class="info_title">Energy</div>
                  </div>
                  <div class="card_fat">
                    <span class="info_quote"> ${foods[i].macronutrients.fat} g </span>
                    <div class="info_title">Fat</div>
                  </div>
                  <div class="card_carb">
                    <span class="info_quote"> ${foods[i].macronutrients.carbohydrate} g </span>
                    <div class="info_title">Carbohydrate</div>
                  </div>
                  <div class="card_protein">
                    <span class="info_quote"> ${foods[i].macronutrients.protein} g </span>
                    <div class="info_title">Protein</div>
                  </div>
                </div>
            </div>
    `
  }

  mainBorderEl.innerHTML = `
  ${mainCardEl}
  <div
                class="main_card create_food"
                onclick="closeForm(false),openForm('add',undefined)"
              >
                <div class="create_icon">
                  <img src="../assets/create_icon.svg" alt="" />
                </div>
                <div class="create_quote">Create food</div>
              </div>
  `
}

function sortByNutrient() {
  const sortValue = document.querySelector("#nutrient_sort").value;

  if (sortValue) {
    renderData(foodList.slice().sort((a, b) => {
      return a.macronutrients[sortValue] - b.macronutrients[sortValue]
    }))
    return
  }

  renderData(foodList)
}

function searchFood() {
  const input = document.querySelector(".search input").value
  renderData(foodList.filter(food => food.name.toLowerCase().includes(input)))
}

function filterByCategory() {
  let selectEl = document.querySelector("#category_sort")

  renderData(foodList.filter(food => food.category.toLowerCase().includes(selectEl.value)))
}

function addNewFood() {
  console.log("hello")
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
  closeForm(true)
  renderPagin()
  renderData(foodList)
  populateCategoryOptions();
}

function updateFood(id) {
  let formEl = document.querySelectorAll("#food_input")
  let data = getFormData(formEl[0])
  if (isEmtyData(data)) {
    alert("Vui lòng không bỏ trống các thông tin cơ bản")
    return
  }
  data.id = foodList.length + 1

  data.macronutrients = getFormData(formEl[1])
  data.micronutrients = getFormData(formEl[2])

  foodList.splice(findIndexByID(id, foodList), 1, data)
  closeForm(true)
  renderPagin()
  renderData(foodList)
  populateCategoryOptions();
}

let curPage = 1
let maxItemPage = 9

function renderPagin() {
  let countPage = Math.ceil(foodList.length / maxItemPage)
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
  let countPage = Math.ceil(foodList.length / maxItemPage)
  if (number < 1 || number > countPage) return

  curPage = number
  renderData(recipeListWithFood)
  renderPagin()
}

renderPagin()
renderData(foodList)
populateCategoryOptions();