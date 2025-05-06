if (checkAuthen()) {
  window.location.href = './homepage'
} // Kiểm tra xem người dùng có nhấn vào rememberMe hay chưa nếu rồi thì nhảy qua trang homepage

// Validate Data
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

// Hàm đổi Form
function switchForm(e, formStatus) {
  if (e)
    e.preventDefault
  document.querySelector(".form_box.sign-in").style.display = formStatus == 'signIn' ? 'none' : 'flex'
  document.querySelector(".form_box.sign-up").style.display = formStatus == 'signIn' ? 'flex' : 'none'
}

// Hàm hiển thị nội dung lỗi
function errorAlertContent(data) {
  let alertContent = ``
  for (key in data) {
    if (key == 'password' && data[key] == '')
      alertContent += `<div>Mật khẩu không được bỏ trống</div>`
    if (key == 'name' && data[key] == '')
      alertContent += `<div>Tên người dùng không được bỏ trống</div>`
    if (key == 'email' && data[key] == '')
      alertContent += `<div>Email không được bỏ trống</div>`
  }
  return alertContent
}

// Hàm đăng ký
function signUp() {
  setTimeout(() => {
    alertPlaceEl.style.display = 'none'
  }, 3000)
  let formEl = document.getElementById("signup_form")
  let data = getFormData(formEl)
  let alertPlaceEl = document.querySelector(".alert_place")
  alertPlaceEl.style.display = 'flex'
  alertPlaceEl.innerHTML = ``

  // Validate dữ liệu nhập vào
  // ------------------------------ //

  // Kiểm tra dữ liệu rỗng
  if (isEmtyData(data)) {
    alertPlaceEl.innerHTML = `
        <div class="alert error_alert">
          <div class="alert_header">
            <div
              style="
                display: flex;
                gap: 8px;
                align-items: center;
                justify-content: center;
              "
            >
              <i class="fa-solid fa-circle-minus" style="color: #e8132a"></i>
              <span style="font-weight: 500">Error</span>
            </div>
            <div
              onclick="document.querySelector('.alert_place').style.display = 'none'"
              class="close_alert"
            >
              <i class="fa-solid fa-x"></i>
            </div>
          </div>

          <div class="alert_content">
            ${errorAlertContent(data)}
          </div>
        </div>
        `
    return
  }
  // ------------------------------ //

  //Validate email
  if (!isValidEmail(data.email) || isEmailAlreadyExists(data.email)) {
    alertPlaceEl.innerHTML = `<div class="alert error_alert">
            <div class="alert_header">
            <div
              style="
                display: flex;
                gap: 8px;
                align-items: center;
                justify-content: center;
              "
            >
              <i class="fa-solid fa-circle-minus" style="color: #e8132a"></i>
              <span style="font-weight: 500">Error</span>
            </div>
            <div
              onclick="document.querySelector('.alert_place').style.display = 'none'"
              class="close_alert"
            >
              <i class="fa-solid fa-x"></i>
            </div>
          </div>

          <div class="alert_content">
            ${!isValidEmail(data.email) ? '<div>Email không đúng định dạng</div>' : '<div>Email đã tồn tại</div>'}
          </div>
        </div>`
    return
  }

  // ------------------------------ //

  // Validate Password
  if (!isValidPassword(data.password)) {
    alertPlaceEl.innerHTML = `<div class="alert error_alert">
    <div class="alert_header">
    <div
    style="
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    "
    >
    <i class="fa-solid fa-circle-minus" style="color: #e8132a"></i>
    <span style="font-weight: 500">Error</span>
    </div>
    <div
    onclick="document.querySelector('.alert_place').style.display = 'none'"
    class="close_alert"
    >
    <i class="fa-solid fa-x"></i>
    </div>
    </div>
    
    <div class="alert_content">
    <div>Độ dài mật khẩu tối thiểu 8 ký tự</div>
    </div>
    </div>`
    return
  }
  // ------------------------------ //

  // Đăng ký thành công
  alertPlaceEl.innerHTML = `
        <div class="alert success_alert">
          <div style="display: flex; gap: 8px; align-items: center">
            <i
              class="fa-solid fa-circle-check"
              style="color: rgb(21, 244, 21)"
            ></i>
            Đăng ký thành công
          </div>
        </div>
    `

  setTimeout(() => {
    alertPlaceEl.style.display = 'none'
  }, 3000) // Đặt thời gian biến mất cho thông báo
  formEl.reset()

  switchForm(undefined, '') // Đổi về Form đăng nhập

  delete data.rememberMe
  userList.push(data)

  console.log()
  saveDataToLocal('userList', userList)
}

// Hàm đăng nhập
function signIn() {
  setTimeout(() => {
    alertPlaceEl.style.display = 'none'
  }, 3000)
  let formEl = document.getElementById("signin_form")
  let data = getFormData(formEl)
  let alertPlaceEl = document.querySelector(".alert_place")
  alertPlaceEl.style.display = 'flex'
  alertPlaceEl.innerHTML = ``

  // Validate dữ liệu nhập vào
  // ------------------------------ //
  // Kiểm tra dữ liệu rỗng
  if (isEmtyData(data)) {
    alertPlaceEl.innerHTML = `
        <div class="alert error_alert">
          <div class="alert_header">
            <div
              style="
                display: flex;
                gap: 8px;
                align-items: center;
                justify-content: center;
              "
            >
              <i class="fa-solid fa-circle-minus" style="color: #e8132a"></i>
              <span style="font-weight: 500">Error</span>
            </div>
            <div
              onclick="document.querySelector('.alert_place').style.display = 'none'"
              class="close_alert"
            >
              <i class="fa-solid fa-x"></i>
            </div>
          </div>

          <div class="alert_content">
            ${errorAlertContent(data)}
          </div>
        </div>
        `
    return
  }
  // ------------------------------ //

  // Kiểm tra Email và Mật khẩu
  if (!isEmailAlreadyExists(data.email) || !isCorrectPassword(data)) {
    alertPlaceEl.innerHTML = `
        <div class="alert error_alert">
          <div class="alert_header">
            <div
              style="
                display: flex;
                gap: 8px;
                align-items: center;
                justify-content: center;
              "
            >
              <i class="fa-solid fa-circle-minus" style="color: #e8132a"></i>
              <span style="font-weight: 500">Error</span>
            </div>
            <div
              onclick="document.querySelector('.alert_place').style.display = 'none'"
              class="close_alert"
            >
              <i class="fa-solid fa-x"></i>
            </div>
          </div>

          <div class="alert_content">
            ${!isEmailAlreadyExists(data.email) ? '<div>Email bạn nhập không tồn tại</div>' : 'Mật khẩu không chính xác'}
          </div>
        </div>
        `
    return
  }

  // ------------------------------ //

  // Đăng nhập thành công
  alertPlaceEl.innerHTML = `
        <div class="alert success_alert">
          <div style="display: flex; gap: 8px; align-items: center">
            <i
              class="fa-solid fa-circle-check"
              style="color: rgb(21, 244, 21)"
            ></i>
            Đăng nhập thành công
          </div>
        </div>
    `

  userLogin = userList.find(user => user.email == data.email)
  if (data.rememberMe) {// Nếu người dùng chọn rememberMe thì lưu dữ liệu người dùng trên local
    localStorage.setItem("userLogin", JSON.stringify(userLogin))
    sessionStorage.removeItem("userLogin")
  }
  else {
    sessionStorage.setItem("userLogin", JSON.stringify(userLogin))
    localStorage.removeItem("userLogin")
  }

  setTimeout(() => {
    alertPlaceEl.style.display = 'none'
    window.location.href = window.location.href = "./homepage/"
  }, 2000) // Đặt thời gian biến mất cho thông báo
  formEl.reset()
}
