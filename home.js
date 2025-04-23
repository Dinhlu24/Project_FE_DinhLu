let userLogin = null
function checkAuthen() {
  userLogin = JSON.parse(localStorage.getItem('userLogin'))
  if (userLogin) {
    window.location.href = "./homepage/"
  }
}
checkAuthen()

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

  data.rememberMe = false
  userList.push(data)

  saveUserListToLocal()
}

function signIn() {
  let formEl = document.getElementById("signin_form")
  let data = getFormData(formEl)
  console.log(data)
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

  if (data.rememberMe) // Nếu người dùng chọn rememberMe thì lưu dữ liệu người dùng trên local
    localStorage.setItem("userLogin", JSON.stringify(data))

  setTimeout(() => {
    alertPlaceEl.style.display = 'none'
  }, 3000) // Đặt thời gian biến mất cho thông báo
  formEl.reset()

  window.location.href = window.location.href = "./homepage/"
}