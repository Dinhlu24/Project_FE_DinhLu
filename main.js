let userList = [
    {
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

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function isEmailAlreadyExists(email) {
    return userList.some(user => user.email == email)
}

function isValidPassword(password) {
    return password.length >= 8
}

function isCorrectPassword(data) {
    return userList.find(user => user.email == data.email && user.password == data.password)
}

// Local
function saveUserListToLocal() {
    localStorage.setItem("userList", JSON.stringify(userList))
}