const selectCategorias = document.querySelector("#categorias");
initEvents();

function initEvents() {
    document.addEventListener("DOMContentLoaded", iniciarApp);
    selectCategorias.addEventListener("change", seleccionarCategoria);
}

function seleccionarCategoria(e) {
    console.log(e.target.value);
}
function iniciarApp() {
    obtenerCategorias();
}

function obtenerCategorias() {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
    fetch(url)
        .then((respuesta) => {
            return respuesta.json();
        })
        .then((resultados) => {
            mostrarCategorias(resultados.categories);
        });
}

function mostrarCategorias(arrayCategoria = []) {
    arrayCategoria.forEach((categoria) => {
        const {
            idCategory,
            strCategory,
            strCategoryThumb,
            strCategoryDescription,
        } = categoria;
        const option = document.createElement("option");
        option.value = strCategory;
        option.textContent = strCategory;
        selectCategorias.appendChild(option);
    });
}
