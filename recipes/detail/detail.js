const params = new URLSearchParams(window.location.search);
const id = params.get("id");

getUserLoginData()
if (!checkAuthen()) {
  window.location.href = '../../index.html'
}

function openSideBar() {
  let leftEl = document.querySelector(".detail_container .left");
  let rightEl = document.querySelector(".detail_container .right");

  leftEl.classList.toggle("sidebar-collapsed");
  rightEl.classList.toggle("main-expanded");
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

let recipeData = recipeListWithFood[findIndexByID(id, recipeListWithFood)]
function formData() {
  document.querySelector('main').innerHTML = `
  <div class="main_top">
    <div class="top_card">
      <div class="card">
        <div class="card_header">
          <div class="community_recipes">
            <img src="../../assets/Group.svg" alt="" />
            <div>Community Recipes</div>
          </div>
          <div class="heart_box">
            <i class="fa-regular fa-heart"></i>
            <div class="heart_count">${recipeData.hearts || 0}</div>
          </div>
        </div>
        ${!recipeData.coverSrc ? '' : `
          <div class="card_middle">
                  <img
                    width="100%"
                    src=${recipeData.coverSrc}
                    style="border-radius:5px"
                    alt=""
                  />
                </div>
          `}
        <div
          class="card_footer"
          id="categoryFooter"
        >
          <img src="../../assets/tag.svg" alt="" />
          <div class="card_categories_info" id="categoryText">
            ${recipeData.category.map(cat => capitalizeWords(cat.name)).join(', ')}
          </div>
        </div>
      </div>

      <div class="add_to_favorite">
        <div class="favorites_box" onclick="toggleAddFavoriteList(${recipeData.id}),favBoxFunc()">
          <i class="fa-solid fa-heart"></i>
          <div>Add to favourite</div>
        </div>
      </div>
    </div>

    <div class="box_basic_info">
      <div class="form_title">
        <div style="font-size: 22px">Basic information</div>
        <div style="font-size: 14px">
          Check and edit recipe's basic information
        </div>
      </div>

      <div class="form_inputs">
        <form id="form_input">
          <div class="input-group">
            <span class="input-group-text w-30">Name</span>
            <input
              type="text"
              value="${recipeData.name}"
              class="form-control w-70"
              name="name"
            />
          </div>
          <div class="input-group">
            <span class="input-group-text w-30" style="height: 62px"
              >Description</span
            >
            <textarea
              class="form-control w-70 single-break"
              name="description"
              rows="2"
            >${recipeData.description}</textarea>
          </div>
          <div class="input-group">
            <span class="input-group-text w-30">Author</span>
            <input
              type="text"
              value="${recipeData.author}"
              class="form-control w-70"
              name="author"
            />
          </div>
          <div class="input-group">
            <span class="input-group-text w-30">Total time</span>
            <input
              type="text"
              value="${recipeData.totalTime}"
              class="form-control w-70"
              name="totalTime"
            />
          </div>
          <div class="input-group">
            <span class="input-group-text w-30">Preparation time</span>
            <input
              type="text"
              value="${recipeData.preparationTime}"
              class="form-control w-70"
              name="preparationTime"
            />
          </div>
          <div class="input-group">
            <span class="input-group-text w-30">Final weight</span>
            <input
              type="text"
              value="${recipeData.finalWeight}"
              class="form-control w-70"
              name="finalWeight"
            />
          </div>
          <div class="input-group">
            <span class="input-group-text w-30">Portions</span>
            <input
              type="text"
              value="${recipeData.portions}"
              class="form-control w-70"
              name="portions"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="main_middle">
    <div class="middle_title">
      <div style="font-size: 22px; color: white">Creation</div>
      <div class="middle_quote">
        Create the recipe and choose the ingredients
      </div>
    </div>
  </div>
  <div class="main_bottom">
    <div class="bottom_left">
      <div class="left_top">
        <div class="left_title">
          <div style="font-size: 22px; color: black">Ingredients</div>
          <div>Search and add ingredients to the recipe</div>
        </div>
        <form id="form_input">
          ${recipeData.ingredients.map(ingredient => `
            <input
              type="text"
              name="ingredient"
              class="form-control"
              value="${ingredient.name}" // Assuming ingredients is an array of strings
            />
          `).join('')}
        </form>
      </div>
      <div class="left_bottom">
        <div class="cooking_method_box">
          <div class="left_title">
            <div style="font-size: 22px; color: black">
              Cooking method
            </div>
            <div>Give instructions to prepare this recipe</div>
          </div>
          <div class="text_box">
            <form id="form_input">
              <div class="input-group">
                <span class="input-group-text" style="height: 134px">1</span>
                <textarea
                  class="form-control single-break"
                  name="cookingMethod"
                  rows="5"
                >${recipeData.cookingMethods.map(method => method.content).join('\n')}</textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_right">
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
            ${recipeData.foodNutrientSum.macronutrients.energy} <span style="font-weight: 400">kcal</span>
          </div>
        </div>

        <div class="macronutrients">
          <div class="item">
            <div class="status" ${recipeData.foodNutrientSum.macronutrients.fat == 0 ? 'style="border: 5px solid #f3f3f4"' : 'style="border: 5px solid #db4965"'}>
              ${recipeData.foodNutrientSum.macronutrients.fat}g
            </div>
            <div style="font-weight: 300">Fat</div>
          </div>
          <div class="item">
            <div class="status"
            ${recipeData.foodNutrientSum.macronutrients.carbohydrate == 0 ? 'style="border: 5px solid #f3f3f4"' : 'style="border: 5px solid #ea9f77"'}>
              ${recipeData.foodNutrientSum.macronutrients.carbohydrate}g
            </div>
            <div style="font-weight: 300">Carbohydrate</div>
          </div>
          <div class="item">
            <div class="status" ${recipeData.foodNutrientSum.macronutrients.protein == 0 ? 'style="border: 5px solid #f3f3f4"' : 'style="border: 5px solid #1ab394"'}>
              ${recipeData.foodNutrientSum.macronutrients.protein}g
            </div>
            <div style="font-weight: 300">Protein</div>
          </div>
          <div class="item">
            <div class="status" ${!recipeData.nutrition?.fiber ? 'style="border: 5px solid #f3f3f4"' : 'style="border: 5px solid #6a7d93"'}>
              ${recipeData.nutrition?.fiber || 0}g
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
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.sodium || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin A</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.vitaminA || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin B-6</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.vitaminB6 || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin B-12</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.vitaminB12 || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin C</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.vitaminC || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin D (D2 + D3)</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.vitaminD || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin E</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.vitaminE || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Vitamin K</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.vitaminK || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Sugars</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.sugars || 0}</span> g</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Calcium</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.calcium || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Iron</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.iron || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Magnesium</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.magnesium || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Phosphorus</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.phosphorus || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Potassium</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.potassium || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Zinc</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.zinc || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Copper</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.copper || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Fluoride</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.fluoride || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Manganese</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.manganese || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Selenium</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.selenium || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Thiamin</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.thiamin || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Riboflavin</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.riboflavin || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Niacin</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.niacin || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Pantothenic acid</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.pantothenicAcid || 0}</span> mg</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Folate, total</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.folateTotal || 0}</span> ug</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Folic Acid</div>
              <div><span style="font-weight: 800">${recipeData.foodNutrientSum.micronutrients.folicAcid || 0}</span> ug</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
`;
}
formData()

function favBoxFunc() {
  if (favoriteList.some(item => item.id == recipeData.id)) {
    document.querySelector('.favorites_box').classList.add('heart_choice')
    document.querySelector('.favorites_box').classList.remove('heart_unchoice')
  }
  else {
    document.querySelector('.favorites_box').classList.add('heart_unchoice')
    document.querySelector('.favorites_box').classList.remove('heart_choice')
  }
  recipeData = recipeListWithFood[findIndexByID(id, recipeListWithFood)]
}
favBoxFunc()

const energy = recipeData.foodNutrientSum.macronutrients.energy
const fatP = ((recipeData.foodNutrientSum.macronutrients.fat * 9) / energy * 100).toFixed(1)
const carbP = ((recipeData.foodNutrientSum.macronutrients.carbohydrate * 4) / energy * 100).toFixed(1)
const proteinP = ((recipeData.foodNutrientSum.macronutrients.protein * 4) / energy * 100).toFixed(1)

var ctx = document.getElementById("myPieChart").getContext("2d");
var myPieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Fat", "Carbohydrate", "Protein"],
    datasets: [
      {
        data: [fatP, carbP, proteinP],
        backgroundColor: ["#DB4965", "#EA9F77", "#1AB394"],
        hoverBackgroundColor: ["#c5425c", "#c88765", "#15a286"],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true, // 👉 Hiển thị bằng point style
          pointStyle: "rect", // 👉 Dùng hình vuông (rect)
          padding: 20, // 👉 Khoảng cách giữa các legend
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
          return value > 5 ? value + "%" : "";
        },
      },
    },
  },
  plugins: [ChartDataLabels],
});