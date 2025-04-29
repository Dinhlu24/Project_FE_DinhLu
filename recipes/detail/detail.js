const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log(id);

function showSelect() {
    document.getElementById('categoryFooter').style.display = 'none';
    document.getElementById('categorySelect').style.display = 'block';
}

function selectOption() {
    const selectedValue = document.getElementById('categorySelect').value;

    document.getElementById('categoryText').innerText = selectedValue;
    document.getElementById('categoryFooter').style.display = 'flex';
    document.getElementById('categorySelect').style.display = 'none';
}
