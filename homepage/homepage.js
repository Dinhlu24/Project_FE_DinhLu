function openSideBar() {
    let leftEl = document.querySelector(".homepage_container .left")
    let rightEl = document.querySelector(".homepage_container .right")
    console.log(rightEl.style)

    leftEl.classList.toggle("sidebar-collapsed");
    rightEl.classList.toggle("main-expanded");
}