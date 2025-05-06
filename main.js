// Dữ liệu người dùng
let userList = [
    {
        id: 0,
        name: "admin",
        email: "admin@gmail.com",
        password: "123",
        // true -> ghi nhớ, false -> không cần ghi nhớ
    },
]

if (localStorage.getItem("userList")) {
    userList = JSON.parse(localStorage.getItem("userList"))
} else {
    localStorage.setItem("userList", JSON.stringify(userList))
}

//Dữ liệu đăng nhập
let userLogin = JSON.parse(localStorage.getItem('userLogin')) // Vừa vào kiểm tra xem người dùng có lưu sẵn dữ liệu đăng nhập vào hay chưa
function checkAuthen() {
    return userLogin ? true : false // Nếu có dữ liệu thì trả về true chưa có thì trả về false
}

function getUserLoginData() {
    userLogin = JSON.parse(localStorage.getItem('userLogin')) || JSON.parse(sessionStorage.getItem('userLogin'))
}

function signOut() {
    localStorage.removeItem('userLogin')
    sessionStorage.removeItem('userLogin')
    window.location.reload()
}

// Dữ liệu recipes
let recipeList = [
    {
        id: 1,
        coverSrc: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        name: "Turmeric Roasted Cauliflower Salad (lowfodmap)",
        description: "Our roasted cauliflower salad with turmeric is low in calories and packed with punchy flavor.",
        author: "Joana Jardim",
        totalTime: "00:40",
        preparationTime: "00:40",
        finalWeight: "978.8 grams",
        portions: 4,
        hearts: 37,
        ingredients: [
            { id: 1 },
            { id: 2 }
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
        coverSrc: "https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg",
        name: "Grilled Chicken with Quinoa Salad",
        description: "A lean grilled chicken breast served over a fresh quinoa salad with herbs and lemon.",
        author: "Liam Nguyen",
        totalTime: "00:45",
        preparationTime: "00:20",
        finalWeight: "850 grams",
        portions: 4,
        hearts: 52,
        ingredients: [{ id: 3 }, { id: 4 }, { id: 5 }],
        cookingMethods: [
            { id: 1, content: "Marinate chicken with lemon juice, garlic, and herbs for 15 minutes." },
            { id: 2, content: "Grill chicken on medium heat until cooked through." },
            { id: 3, content: "Toss cooked quinoa with chopped vegetables and dressing." },
            { id: 4, content: "Top salad with sliced grilled chicken and serve." }
        ],
        category: [
            { id: 3, name: "high protein" },
            { id: 4, name: "main course" }
        ]
    },
    {
        id: 3,
        coverSrc: "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg",
        name: "Sweet Potato and Black Bean Tacos",
        description: "A flavorful vegan taco filled with roasted sweet potatoes and black beans.",
        author: "Maria Rodriguez",
        totalTime: "00:35",
        preparationTime: "00:20",
        finalWeight: "700 grams",
        portions: 3,
        hearts: 64,
        ingredients: [{ id: 6 }, { id: 7 }, { id: 8 }],
        cookingMethods: [
            { id: 1, content: "Roast sweet potatoes with cumin, paprika, and olive oil." },
            { id: 2, content: "Warm tortillas and mash black beans with lime juice." },
            { id: 3, content: "Assemble tacos with sweet potatoes, beans, avocado, and salsa." }
        ],
        category: [
            { id: 1, name: "vegetarian" },
            { id: 5, name: "vegan" }
        ]
    },
    {
        id: 4,
        coverSrc: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
        name: "Beef Stir Fry with Broccoli",
        description: "A quick and easy stir fry packed with protein and fiber, great for dinner.",
        author: "John Lee",
        totalTime: "00:30",
        preparationTime: "00:15",
        finalWeight: "920 grams",
        portions: 3,
        hearts: 48,
        ingredients: [{ id: 9 }, { id: 10 }],
        cookingMethods: [
            { id: 1, content: "Slice beef thinly and marinate with soy sauce, garlic, and sesame oil." },
            { id: 2, content: "Blanch broccoli briefly and set aside." },
            { id: 3, content: "Stir fry beef in a hot pan until browned, then add broccoli and sauce." }
        ],
        category: [
            { id: 4, name: "main course" },
            { id: 6, name: "asian" }
        ]
    },
    {
        id: 5,
        coverSrc: "https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg",
        name: "Tofu Vegetable Curry",
        description: "A creamy and comforting curry packed with tofu, carrots, and bell peppers.",
        author: "Ananya Patel",
        totalTime: "00:50",
        preparationTime: "00:20",
        finalWeight: "1000 grams",
        portions: 3,
        hearts: 73,
        ingredients: [{ id: 1 }],
        cookingMethods: [
            { id: 1, content: "Sauté onions, garlic, and ginger in a pan until fragrant." },
            { id: 2, content: "Add curry paste, coconut milk, tofu, and vegetables." },
            { id: 3, content: "Simmer for 25 minutes until everything is tender and flavorful." }
        ],
        category: [
            { id: 1, name: "vegetarian" },
            { id: 7, name: "gluten-free" }
        ]
    }

];
if (localStorage.getItem("recipeList")) {
    recipeList = JSON.parse(localStorage.getItem("recipeList"))
} else {
    localStorage.setItem("recipeList", JSON.stringify(recipeList))
}


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
if (localStorage.getItem("recipeCategory")) {
    recipeCategory = JSON.parse(localStorage.getItem("recipeCategory"))
} else {
    localStorage.setItem("recipeCategory", JSON.stringify(recipeCategory))
}

// Food List
let foodList = [
    {
        id: 1,
        name: "Ackee, canned, drained",
        source: "Minh Cuong Tran",
        category: "Vegetables and Vegetable Products",
        quantity: "100",
        macronutrients: {
            energy: 151,
            carbohydrate: 0.8,
            fat: 15.2,
            protein: 2.9
        },
        micronutrients: {
            cholesterol: 0.0,
            thiamin: null,
            riboflavin: 0.07,
            sodium: 240.0,
            water: 76.7,
            vitaminA: null,
            vitaminB6: 0.06,
            vitaminB12: 0.0,
            vitaminC: 30.0,
            vitaminD: 0.0,
            vitaminE: null,
            vitaminK: null,
            starch: 0.0,
            lactose: 0.0,
            alcohol: null,
            caffeine: null,
            sugars: 0.8,
            calcium: 35.0,
            iron: 0.7,
            magnesium: 40.0,
            phosphorus: 47.0,
            potassium: 270.0,
            zinc: 0.6,
            copper: 0.27,
            fluoride: null,
            manganese: null,
            selenium: null,
            niacin: 0.53,
            niacinEquivalents: 0.6,
            pantothenicAcid: null,
            folateTotal: 41.0,
            folicAcid: null,
            fattyAcidsTrans: 0.0,
            fattyAcidsSaturated: null,
            fattyAcidsMonounsaturated: null,
            fattyAcidsPolyunsaturated: null,
            chloride: 340.0
        }
    },
    {
        id: 2,
        name: "Cauliflower, raw",
        source: "USDA",
        category: "Vegetables and Vegetable Products",
        quantity: "100",
        macronutrients: {
            energy: 25,
            carbohydrate: 4.97,
            fat: 0.28,
            protein: 1.92
        },
        micronutrients: {
            cholesterol: 0.0,
            thiamin: 0.05,
            riboflavin: 0.06,
            sodium: 30.0,
            water: 92.07,
            vitaminA: 0.0,
            vitaminB6: 0.184,
            vitaminB12: 0.0,
            vitaminC: 48.2,
            vitaminD: 0.0,
            vitaminE: 0.08,
            vitaminK: 15.5,
            starch: 0.0,
            lactose: 0.0,
            alcohol: 0.0,
            caffeine: 0.0,
            sugars: 1.91,
            calcium: 22.0,
            iron: 0.42,
            magnesium: 15.0,
            phosphorus: 44.0,
            potassium: 299.0,
            zinc: 0.28,
            copper: 0.039,
            fluoride: null,
            manganese: 0.155,
            selenium: 0.6,
            niacin: 0.507,
            niacinEquivalents: 1.0,
            pantothenicAcid: 0.667,
            folateTotal: 57.0,
            folicAcid: 0.0,
            fattyAcidsTrans: 0.0,
            fattyAcidsSaturated: 0.13,
            fattyAcidsMonounsaturated: 0.032,
            fattyAcidsPolyunsaturated: 0.044,
            chloride: null
        }
    },
    {
        id: 3,
        name: "Chicken breast, grilled",
        source: "USDA",
        category: "Meat and Poultry",
        quantity: "100",
        macronutrients: {
            energy: 165,
            carbohydrate: 0.0,
            fat: 3.6,
            protein: 31.0
        },
        micronutrients: {
            cholesterol: 85.0,
            thiamin: 0.07,
            riboflavin: 0.1,
            sodium: 74.0,
            water: 65.3,
            vitaminA: 13.0,
            vitaminB6: 0.6,
            vitaminB12: 0.3,
            vitaminC: 0.0,
            vitaminD: 0.1,
            vitaminE: 0.27,
            vitaminK: 0.3,
            starch: 0.0,
            lactose: 0.0,
            alcohol: 0.0,
            caffeine: 0.0,
            sugars: 0.0,
            calcium: 15.0,
            iron: 1.0,
            magnesium: 29.0,
            phosphorus: 220.0,
            potassium: 256.0,
            zinc: 1.0,
            copper: 0.04,
            fluoride: null,
            manganese: 0.02,
            selenium: 24.5,
            niacin: 13.7,
            niacinEquivalents: null,
            pantothenicAcid: 1.0,
            folateTotal: 4.0,
            folicAcid: 0.0,
            fattyAcidsTrans: 0.0,
            fattyAcidsSaturated: 1.0,
            fattyAcidsMonounsaturated: 1.2,
            fattyAcidsPolyunsaturated: 0.8,
            chloride: null
        }
    },
    {
        id: 4,
        name: "Quinoa, cooked",
        source: "USDA",
        category: "Cereal Grains and Pasta",
        quantity: "100",
        macronutrients: {
            energy: 120,
            carbohydrate: 21.3,
            fat: 1.9,
            protein: 4.1
        },
        micronutrients: {
            cholesterol: 0.0,
            thiamin: 0.1,
            riboflavin: 0.11,
            sodium: 7.0,
            water: 71.6,
            vitaminA: 1.0,
            vitaminB6: 0.12,
            vitaminB12: 0.0,
            vitaminC: 0.0,
            vitaminD: 0.0,
            vitaminE: 0.63,
            vitaminK: 0.0,
            starch: 20.2,
            lactose: 0.0,
            alcohol: 0.0,
            caffeine: 0.0,
            sugars: 0.9,
            calcium: 17.0,
            iron: 1.5,
            magnesium: 64.0,
            phosphorus: 152.0,
            potassium: 172.0,
            zinc: 1.1,
            copper: 0.2,
            fluoride: null,
            manganese: 0.63,
            selenium: 2.8,
            niacin: 0.41,
            niacinEquivalents: null,
            pantothenicAcid: 0.45,
            folateTotal: 42.0,
            folicAcid: 0.0,
            fattyAcidsTrans: 0.0,
            fattyAcidsSaturated: 0.23,
            fattyAcidsMonounsaturated: 0.5,
            fattyAcidsPolyunsaturated: 1.0,
            chloride: null
        }
    },
    {
        id: 5,
        name: "Olive oil",
        source: "Minh Cuong Tran",
        category: "Fats and Oils",
        quantity: "100",
        macronutrients: {
            energy: 884,
            carbohydrate: 0.0,
            fat: 100.0,
            protein: 0.0
        },
        micronutrients: {
            cholesterol: 0.0,
            thiamin: 0.0,
            riboflavin: 0.0,
            sodium: 2.0,
            water: 0.0,
            vitaminA: 0.0,
            vitaminB6: 0.0,
            vitaminB12: 0.0,
            vitaminC: 0.0,
            vitaminD: 0.0,
            vitaminE: 14.4,
            vitaminK: 60.2,
            starch: 0.0,
            lactose: 0.0,
            alcohol: 0.0,
            caffeine: 0.0,
            sugars: 0.0,
            calcium: 1.0,
            iron: 0.56,
            magnesium: 0.0,
            phosphorus: 0.0,
            potassium: 1.0,
            zinc: 0.01,
            copper: 0.0,
            fluoride: null,
            manganese: 0.0,
            selenium: 0.0,
            niacin: 0.0,
            niacinEquivalents: null,
            pantothenicAcid: 0.0,
            folateTotal: 0.0,
            folicAcid: 0.0,
            fattyAcidsTrans: 0.0,
            fattyAcidsSaturated: 14.0,
            fattyAcidsMonounsaturated: 73.0,
            fattyAcidsPolyunsaturated: 11.0,
            chloride: null
        }
    },
    {
        id: 6,
        name: "Sweet potato, boiled, without skin",
        source: "USDA",
        category: "Vegetables and Vegetable Products",
        quantity: "100",
        macronutrients: {
            energy: 76,
            carbohydrate: 17.7,
            fat: 0.14,
            protein: 1.4
        },
        micronutrients: {
            cholesterol: 0.0,
            thiamin: 0.08,
            riboflavin: 0.06,
            sodium: 27.0,
            water: 77.3,
            vitaminA: 960.0,
            vitaminB6: 0.21,
            vitaminB12: 0.0,
            vitaminC: 12.8,
            vitaminD: 0.0,
            vitaminE: 0.9,
            vitaminK: 1.8,
            starch: 12.5,
            lactose: 0.0,
            alcohol: 0.0,
            caffeine: 0.0,
            sugars: 5.4,
            calcium: 30.0,
            iron: 0.7,
            magnesium: 25.0,
            phosphorus: 54.0,
            potassium: 230.0,
            zinc: 0.2,
            copper: 0.14,
            fluoride: null,
            manganese: 0.26,
            selenium: 0.5,
            niacin: 0.6,
            niacinEquivalents: null,
            pantothenicAcid: 0.8,
            folateTotal: 6.0,
            folicAcid: 0.0,
            fattyAcidsTrans: 0.0,
            fattyAcidsSaturated: 0.03,
            fattyAcidsMonounsaturated: 0.0,
            fattyAcidsPolyunsaturated: 0.05,
            chloride: null
        }
    },
    {
        id: 7,
        name: "Broccoli, raw",
        source: "USDA",
        category: "Vegetables and Vegetable Products",
        quantity: "100",
        macronutrients: {
            energy: 34,
            carbohydrate: 6.6,
            fat: 0.4,
            protein: 2.8
        },
        micronutrients: {
            cholesterol: 0.0,
            thiamin: 0.07,
            riboflavin: 0.12,
            sodium: 33.0,
            water: 89.3,
            vitaminA: 31.0,
            vitaminB6: 0.21,
            vitaminB12: 0.0,
            vitaminC: 89.2,
            vitaminD: 0.0,
            vitaminE: 0.78,
            vitaminK: 101.6,
            starch: 0.0,
            lactose: 0.0,
            alcohol: 0.0,
            caffeine: 0.0,
            sugars: 1.7,
            calcium: 47.0,
            iron: 0.7,
            magnesium: 21.0,
            phosphorus: 66.0,
            potassium: 316.0,
            zinc: 0.41,
            copper: 0.05,
            fluoride: null,
            manganese: 0.21,
            selenium: 2.5,
            niacin: 0.63,
            niacinEquivalents: null,
            pantothenicAcid: 0.57,
            folateTotal: 63.0,
            folicAcid: 0.0,
            fattyAcidsTrans: 0.0,
            fattyAcidsSaturated: 0.04,
            fattyAcidsMonounsaturated: 0.01,
            fattyAcidsPolyunsaturated: 0.04,
            chloride: null
        }
    },
    {
        id: 8,
        name: "Tofu, firm",
        source: "USDA",
        category: "Legumes and Legume Products",
        quantity: "100",
        macronutrients: {
            energy: 144,
            carbohydrate: 2.3,
            fat: 8.0,
            protein: 15.0
        },
        micronutrients: {
            cholesterol: 0.0,
            thiamin: 0.1,
            riboflavin: 0.1,
            sodium: 14.0,
            water: 72.0,
            vitaminA: 0.0,
            vitaminB6: 0.1,
            vitaminB12: 0.0,
            vitaminC: 0.0,
            vitaminD: 0.0,
            vitaminE: 0.01,
            vitaminK: 2.0,
            starch: 0.1,
            lactose: 0.0,
            alcohol: 0.0,
            caffeine: 0.0,
            sugars: 0.6,
            calcium: 350.0,
            iron: 5.4,
            magnesium: 30.0,
            phosphorus: 97.0,
            potassium: 121.0,
            zinc: 1.0,
            copper: 0.2,
            fluoride: null,
            manganese: 0.8,
            selenium: 13.0,
            niacin: 0.3,
            niacinEquivalents: null,
            pantothenicAcid: 0.1,
            folateTotal: 15.0,
            folicAcid: 0.0,
            fattyAcidsTrans: 0.0,
            fattyAcidsSaturated: 1.0,
            fattyAcidsMonounsaturated: 1.9,
            fattyAcidsPolyunsaturated: 4.9,
            chloride: null
        }
    },
    {
        id: 9,
        name: "Carrot, raw",
        source: "USDA",
        category: "Vegetables and Vegetable Products",
        quantity: "100",
        macronutrients: {
            energy: 41,
            carbohydrate: 9.6,
            fat: 0.24,
            protein: 0.9
        },
        micronutrients: {
            cholesterol: 0.0,
            thiamin: 0.07,
            riboflavin: 0.05,
            sodium: 69.0,
            water: 88.3,
            vitaminA: 835.0,
            vitaminB6: 0.14,
            vitaminB12: 0.0,
            vitaminC: 5.9,
            vitaminD: 0.0,
            vitaminE: 0.66,
            vitaminK: 13.2,
            starch: 1.4,
            lactose: 0.0,
            alcohol: 0.0,
            caffeine: 0.0,
            sugars: 4.7,
            calcium: 33.0,
            iron: 0.3,
            magnesium: 12.0,
            phosphorus: 35.0,
            potassium: 320.0,
            zinc: 0.24,
            copper: 0.05,
            fluoride: null,
            manganese: 0.14,
            selenium: 0.1,
            niacin: 0.98,
            niacinEquivalents: null,
            pantothenicAcid: 0.27,
            folateTotal: 19.0,
            folicAcid: 0.0,
            fattyAcidsTrans: 0.0,
            fattyAcidsSaturated: 0.04,
            fattyAcidsMonounsaturated: 0.01,
            fattyAcidsPolyunsaturated: 0.12,
            chloride: null
        }
    },
    {
        id: 10,
        name: "Bell pepper, red, raw",
        source: "USDA",
        category: "Vegetables and Vegetable Products",
        quantity: "100",
        macronutrients: {
            energy: 31,
            carbohydrate: 6.0,
            fat: 0.3,
            protein: 1.0
        },
        micronutrients: {
            cholesterol: 0.0,
            thiamin: 0.05,
            riboflavin: 0.03,
            sodium: 4.0,
            water: 92.2,
            vitaminA: 157.0,
            vitaminB6: 0.3,
            vitaminB12: 0.0,
            vitaminC: 127.7,
            vitaminD: 0.0,
            vitaminE: 1.58,
            vitaminK: 4.9,
            starch: 0.0,
            lactose: 0.0,
            alcohol: 0.0,
            caffeine: 0.0,
            sugars: 4.2,
            calcium: 7.0,
            iron: 0.4,
            magnesium: 12.0,
            phosphorus: 26.0,
            potassium: 211.0,
            zinc: 0.25,
            copper: 0.1,
            fluoride: null,
            manganese: 0.11,
            selenium: 0.5,
            niacin: 0.98,
            niacinEquivalents: null,
            pantothenicAcid: 0.3,
            folateTotal: 46.0,
            folicAcid: 0.0,
            fattyAcidsTrans: 0.0,
            fattyAcidsSaturated: 0.03,
            fattyAcidsMonounsaturated: 0.02,
            fattyAcidsPolyunsaturated: 0.1,
            chloride: null
        }
    }
];
if (localStorage.getItem("foodList")) {
    foodList = JSON.parse(localStorage.getItem("foodList"))
} else {
    localStorage.setItem("foodList", JSON.stringify(foodList))
}

// Danh sách yêu thích
let favoriteList = []
if (localStorage.getItem("favoriteList")) {
    favoriteList = JSON.parse(localStorage.getItem("favoriteList"))
} else {
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList))
}

function toggleAddFavoriteList(dataId) {
    if (!favoriteList.some(item => item.id == dataId)) {
        recipeList[findIndexByID(dataId, recipeListWithFood)].hearts++
        recipeListWithFood = attachFoodDataToRecipes(recipeList, foodList)

        const dataList = recipeListWithFood[findIndexByID(dataId, recipeListWithFood)]
        favoriteList.push(dataList)
    }
    else {
        recipeList[findIndexByID(dataId, recipeListWithFood)].hearts--
        recipeListWithFood = attachFoodDataToRecipes(recipeList, foodList)

        favoriteList.splice(findIndexByID(dataId, favoriteList), 1)
    }

    localStorage.removeItem("recipeList")
    localStorage.setItem("recipeList", JSON.stringify(recipeList))
    localStorage.removeItem("favoriteList")
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList))
}

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
function saveDataToLocal(localKey, data) {
    localStorage.setItem(localKey, JSON.stringify(data))
}

// Trộn danh sách food và recipe với nhau
function attachFoodDataToRecipes(recipes, foods) {
    const updateRecipes = recipes.map(recipe => {
        const foodLibary = recipe.ingredients.map(ingredient => {
            const food = foods.find(f => f.id == ingredient.id)
            return food || null
        })

        const foodNutrientSum = sumFoodData(foodList, recipe.ingredients)

        return {
            ...recipe,
            foodNutrientSum,
            ingredients: foodLibary
        }
    })

    return updateRecipes
}

// Hàm tính tổng dinh dưỡng dựa trên số khẩu phần ăn
function sumFoodData(foodList, foodIdList) {
    const result = {
        macronutrients: {},
        micronutrients: {}
    };

    const totalMacro = {};
    const totalMicro = {};

    foodIdList.forEach(item => {
        const food = foodList.find(f => f.id === item.id);
        if (!food) return;

        for (let key in food.macronutrients) {
            const value = food.macronutrients[key];
            if (typeof value === "number") {
                totalMacro[key] = (totalMacro[key] || 0) + value;
            }
        }

        for (let key in food.micronutrients) {
            const value = food.micronutrients[key];
            if (typeof value === "number") {
                totalMicro[key] = (totalMicro[key] || 0) + value;
            }
        }
    });

    for (let key in totalMacro) {
        result.macronutrients[key] = Number((totalMacro[key]).toFixed(1));
    }

    for (let key in totalMicro) {
        result.micronutrients[key] = Number((totalMicro[key]).toFixed(1));
    }

    return result;
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