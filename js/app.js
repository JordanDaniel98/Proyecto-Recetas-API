initEvents();

function initEvents() {
    document.addEventListener("DOMContentLoaded", iniciarApp);
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
    console.log(arrayCategoria);
    const categorias = document.querySelector("#categorias");
    arrayCategoria.forEach((categoria) => {
        const option = document.createElement("option");
    });
}
