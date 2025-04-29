// Dữ liệu người dùng
let userList = [
    {
        id: 0,
        name: "admin",
        email: "admin@gmail.com",
        password: "123",
        rememberMe: true
        // true -> ghi nhớ, false -> không cần ghi nhớ
    },
]

if (localStorage.getItem("userList")) {
    userList = JSON.parse(localStorage.getItem("userList"))
} else {
    localStorage.setItem("userList", JSON.stringify(userList))
}

// Dữ liệu recipes
let recipeList = [
    {
        id: 1,
        coverSrc: "https://nutriumstorageaccount.blob.core.windows.net/rails-active-storage/6qim5uox87nr22st6i7nzt8a",
        name: "Turmeric Roasted Cauliflower Salad (lowfodmap)",
        description: "Our roasted cauliflower salad with turmeric is low in calories and packed with punchy flavor.",
        author: "Joana Jardim",
        totalTime: "00:40",
        preparationTime: "00:40",
        finalWeight: "978.8 grams",
        portions: 4,
        hearts: 37,
        ingredients: [
            // { food }, { food_02 }, ...
        ],
        cookingMethods: [
            {
                id: 1,
                content: "STEP 1: Preheat the oven to 200°C (fan 180°C). Line a baking tray with parchment paper.",
            },
            {
                id: 2,
                content: "STEP 2: Toss cauliflower florets with olive oil, turmeric, salt, and pepper.",
            },
            {
                id: 3,
                content: "STEP 3: Spread the cauliflower evenly on the tray and roast for 25-30 minutes until golden.",
            },
            {
                id: 4,
                content: "STEP 4: Let it cool slightly, then mix with fresh greens and your choice of dressing.",
            },
        ],
        category: [
            {
                id: 1,
                name: "vegetarian",
            },
            {
                id: 2,
                name: "appetizer",
            },
        ],
    },
    {
        id: 2,
        coverSrc: "https://example.com/image2.jpg",
        name: "Vegan Spaghetti Bolognese",
        description: "A hearty vegan bolognese with a rich tomato base and delicious lentils.",
        author: "Jane Doe",
        totalTime: "00:45",
        preparationTime: "00:30",
        finalWeight: "800 grams",
        portions: 2,
        hearts: 56,
        ingredients: [
            { food: "Spaghetti" },
            { food: "Lentils" },
            { food: "Tomato" },
            { food: "Garlic" },
            { food: "Onion" },
            { food: "Olive oil" },
        ],
        cookingMethods: [
            {
                id: 1,
                content: "STEP 1: Cook the spaghetti according to package instructions. Drain and set aside.",
            },
            {
                id: 2,
                content: "STEP 2: Sauté chopped onion and garlic in olive oil until soft.",
            },
            {
                id: 3,
                content: "STEP 3: Add lentils and chopped tomatoes. Simmer for 20 minutes until thickened.",
            },
            {
                id: 4,
                content: "STEP 4: Toss the spaghetti with the bolognese sauce and serve hot.",
            },
        ],
        category: [
            {
                id: 3,
                name: "vegan",
            },
            {
                id: 4,
                name: "main course",
            },
        ],
    },
    {
        id: 3,
        coverSrc: "https://example.com/image3.jpg",
        name: "Grilled Chicken Salad",
        description: "A light and refreshing grilled chicken salad with a tangy vinaigrette.",
        author: "John Smith",
        totalTime: "00:35",
        preparationTime: "00:25",
        finalWeight: "500 grams",
        portions: 3,
        hearts: 42,
        ingredients: [
            { food: "Chicken breast" },
            { food: "Lettuce" },
            { food: "Tomato" },
            { food: "Cucumber" },
            { food: "Olive oil" },
            { food: "Vinegar" },
        ],
        cookingMethods: [
            {
                id: 1,
                content: "STEP 1: Season the chicken breast with salt, pepper, and a drizzle of olive oil.",
            },
            {
                id: 2,
                content: "STEP 2: Grill the chicken for 6-7 minutes on each side until cooked through.",
            },
            {
                id: 3,
                content: "STEP 3: Let the chicken rest for 5 minutes, then slice thinly.",
            },
            {
                id: 4,
                content: "STEP 4: Assemble lettuce, tomatoes, and cucumbers. Top with grilled chicken and vinaigrette.",
            },
        ],
        category: [
            {
                id: 9,
                name: "salad",
            },
            {
                id: 4,
                name: "main course",
            },
        ],
    },
];


//Recipes Category
let recipeCategory = [
    {
        "id": 1,
        "name": "vegetarian",
        "description": "Dishes that do not include meat, fish, or poultry, suitable for vegetarians."
    },
    {
        "id": 2,
        "name": "appetizer",
        "description": "Small dishes served before the main course to stimulate the appetite."
    },
    {
        "id": 3,
        "name": "vegan",
        "description": "Plant-based recipes with no animal products, including dairy and eggs."
    },
    {
        "id": 4,
        "name": "main course",
        "description": "The main dish in a meal, often more substantial and filling."
    },
    {
        "id": 5,
        "name": "dessert",
        "description": "Sweet dishes typically served at the end of a meal."
    },
    {
        "id": 6,
        "name": "low-carb",
        "description": "Recipes with reduced carbohydrate content, often for weight or blood sugar management."
    },
    {
        "id": 7,
        "name": "gluten-free",
        "description": "Meals made without gluten, suitable for those with gluten intolerance or celiac disease."
    },
    {
        "id": 8,
        "name": "breakfast",
        "description": "Recipes designed for the first meal of the day."
    },
    {
        "id": 9,
        "name": "salad",
        "description": "Cold or warm dishes primarily composed of vegetables, fruits, and other ingredients."
    },
    {
        "id": 10,
        "name": "soup",
        "description": "Liquid-based dishes, either hot or cold, made with a variety of ingredients."
    }
];

// Food List
let foodList = [
    {
        "id": 1,
        "name": "Ackee, canned, drained",
        "source": "Minh Cuong Tran",
        "category": "Vegetables and Vegetable Products",
        "quantity": "100g",
        "macronutrients": {
            "energy": 151,
            "carbohydrate": 0.8,
            "fat": 15.2,
            "protein": 2.9
        },
        "micronutrients": {
            "cholesterol": 0.0,
            "thiamin": null,
            "riboflavin": null,
            "sodium": 240.0,
            "water": 76.7,
            "vitaminA": null,
            "vitaminB6": 0.06,
            "vitaminB12": 0.0,
            "vitaminC": 30.0,
            "vitaminD": 0.0,
            "vitaminE": null,
            "vitaminK": null,
            "starch": 0.0,
            "lactose": 0.0,
            "alcohol": null,
            "caffeine": null,
            "sugars": 0.8,
            "calcium": 35.0,
            "iron": 0.7,
            "magnesium": 40.0,
            "phosphorus": 47.0,
            "potassium": 270.0,
            "zinc": 0.6,
            "copper": 0.27,
            "fluoride": null,
            "manganese": null,
            "selenium": null,
            "niacin": 0.53,
            "riboflavin": 0.07,
            "niacinEquivalents": 0.6,
            "pantothenicAcid": null,
            "folateTotal": 41.0,
            "folicAcid": null,
            "fattyAcidsTrans": 0.0,
            "fattyAcidsSaturated": null,
            "fattyAcidsMonounsaturated": null,
            "fattyAcidsPolyunsaturated": null,
            "chloride": 340.0
        }
    },
    {
        "id": 2,
        "name": "Broccoli, raw",
        "source": "John Doe",
        "category": "Vegetables",
        "quantity": "100g",
        "macronutrients": {
            "energy": 34,
            "carbohydrate": 6.6,
            "fat": 0.4,
            "protein": 2.8
        },
        "micronutrients": {
            "cholesterol": 0.0,
            "thiamin": 0.07,
            "riboflavin": 0.11,
            "sodium": 33.0,
            "water": 89.3,
            "vitaminA": 624.0,
            "vitaminB6": 0.2,
            "vitaminB12": 0.0,
            "vitaminC": 89.2,
            "vitaminD": 0.0,
            "vitaminE": 0.78,
            "vitaminK": 101.6,
            "starch": 0.0,
            "lactose": 0.0,
            "alcohol": null,
            "caffeine": null,
            "sugars": 1.7,
            "calcium": 47.0,
            "iron": 0.7,
            "magnesium": 21.0,
            "phosphorus": 66.0,
            "potassium": 316.0,
            "zinc": 0.4,
            "copper": 0.05,
            "fluoride": null,
            "manganese": 0.2,
            "selenium": 0.0,
            "niacin": 0.6,
            "riboflavin": 0.11,
            "niacinEquivalents": 0.9,
            "pantothenicAcid": 0.2,
            "folateTotal": 63.0,
            "folicAcid": null,
            "fattyAcidsTrans": 0.0,
            "fattyAcidsSaturated": 0.1,
            "fattyAcidsMonounsaturated": 0.03,
            "fattyAcidsPolyunsaturated": 0.1,
            "chloride": 36.0
        }
    },
    {
        "id": 3,
        "name": "Carrot, raw",
        "source": "Jane Smith",
        "category": "Vegetables",
        "quantity": "100g",
        "macronutrients": {
            "energy": 41,
            "carbohydrate": 9.6,
            "fat": 0.2,
            "protein": 0.9
        },
        "micronutrients": {
            "cholesterol": 0.0,
            "thiamin": 0.06,
            "riboflavin": 0.04,
            "sodium": 69.0,
            "water": 88.0,
            "vitaminA": 835.0,
            "vitaminB6": 0.1,
            "vitaminB12": 0.0,
            "vitaminC": 5.9,
            "vitaminD": 0.0,
            "vitaminE": 0.66,
            "vitaminK": 13.2,
            "starch": 0.0,
            "lactose": 0.0,
            "alcohol": null,
            "caffeine": null,
            "sugars": 4.7,
            "calcium": 33.0,
            "iron": 0.6,
            "magnesium": 12.0,
            "phosphorus": 35.0,
            "potassium": 320.0,
            "zinc": 0.2,
            "copper": 0.06,
            "fluoride": null,
            "manganese": 0.1,
            "selenium": 0.0,
            "niacin": 0.9,
            "riboflavin": 0.04,
            "niacinEquivalents": 1.1,
            "pantothenicAcid": 0.2,
            "folateTotal": 19.0,
            "folicAcid": null,
            "fattyAcidsTrans": 0.0,
            "fattyAcidsSaturated": 0.1,
            "fattyAcidsMonounsaturated": 0.03,
            "fattyAcidsPolyunsaturated": 0.1,
            "chloride": 40.0
        }
    }
];


// Util
function getFormData(formEl) {
    let data = {};

    for (let element of formEl.elements) {
        if (!element.name) continue;
        if (element.type === "radio") {
            if (element.checked) {
                data[element.name] = element.value;
            }
        }
        else if (element.type === "checkbox") {
            data[element.name] = element.checked;
        }
        else {
            data[element.name] = element.value;
        }
    }

    return data;
}

// Libary Validate
function isEmtyData(data) {
    for (key in data) {
        if (key == 'rememberMe')
            continue
        if (!data[key])
            return true
    }
}

// Local
function saveUserListToLocal() {
    localStorage.setItem("userList", JSON.stringify(userList))
}

// Trộn danh sách food và recipe với nhau
function attachFoodDataToRecipes(recipes, foods) {
    return recipes.map(recipe => {
        const food = foods.find(f => f.id === recipe.id);
        return {
            ...recipe,
            foodData: food || null,
        };
    });
}
let recipeListWithFood = attachFoodDataToRecipes(recipeList, foodList);

// Hàm in hoa chữ cái đầu
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}



//Hàm tìm vị trí trong list gửi vào
function findIndexByID(id, list) {
    return list.findIndex(item => item.id == id)
}