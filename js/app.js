const selectCategorias = document.querySelector("#categorias");
const resultado = document.querySelector("#resultado");

// new bootstrap.Modal(id del componente existente en HTML, parametros opcionales de config);
const modal = new bootstrap.Modal("#modal", {});

const headingModal = document.querySelector("#staticBackdropLabel");
const modalBody = document.querySelector(".modal-body");

initEvents();

function initEvents() {
    document.addEventListener("DOMContentLoaded", iniciarApp);
    selectCategorias.addEventListener("change", seleccionarCategoria);
}

function seleccionarCategoria(e) {
    plato = e.target.value;
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${plato}`;
    fetch(url)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            generarPlatilloHTML(datos.meals);
        });
}

function generarPlatilloHTML(platillos) {
    limpiarHTML(resultado);
    const h2 = document.createElement("h2");
    h2.classList.add("text-center");
    h2.textContent = "Resultados";
    resultado.appendChild(h2);

    platillos.forEach((platillo) => {
        const { idMeal, strMeal, strMealThumb } = platillo;

        // Crea una columna de 4 divisiones
        const contenedor = document.createElement("div");
        contenedor.classList.add("col-md-4");

        const card = document.createElement("div");
        card.classList.add("card", "mt-4");

        const imagen = document.createElement("img");
        imagen.src = strMealThumb;
        imagen.alt = strMeal;
        imagen.classList.add("card-img-top");
        //imagen.style.height = "18rem";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const heading = document.createElement("h5");
        heading.classList.add("card-title", "mb-3");
        heading.textContent = strMeal;

        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary", "w-100");
        button.textContent = "Ver receta";
        button.onclick = function () {
            seleccionarReceta(idMeal);
        };
        // Permite conectar a travez del id con el componente de bootstrap
        // ademas de vincularlo con el componente HTML
        // -> button.dataset.bsTarget = "#modal";
        // Permite llamar las propiedades de JS para la ejecución del modal
        // -> button.dataset.bsToggle = "modal";

        card.appendChild(imagen);
        cardBody.appendChild(heading);
        cardBody.appendChild(button);
        card.appendChild(cardBody);

        contenedor.appendChild(card);
        resultado.appendChild(contenedor);
    });
}

function seleccionarReceta(id) {
    url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(url)
        .then((resultado) => resultado.json())
        .then((datos) => {
            generarModalHTML(datos.meals[0]);
        });
}

function generarModalHTML(receta) {
    const { idMeal, strMeal, strMealThumb, strInstructions } = receta;

    limpiarHTML(modalBody);

    headingModal.textContent = strMeal;

    /* OTRA FORMA DE AGREGAR EL CONTENIDO AL modal-body
    modalBody.innerHTML = `
        <img class="img-fluid" src="${strMealThumb}" alt="${strMeal}"></img> 
        <h3 class="my-3">Instrucciones</h3>  
        <p>${strInstructions}</p>
    `;
    modal.show();
    */

    const card = document.createElement("div");
    card.classList.add("card");

    const imagen = document.createElement("img");
    imagen.src = strMealThumb;
    imagen.alt = strMeal;
    imagen.classList.add("card-img-top");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const parrafo = document.createElement("p");
    parrafo.textContent = "Instructions";
    parrafo.classList.add("fw-bolder", "fs-2");

    const descripcion = document.createElement("p");
    descripcion.textContent = strInstructions;

    const ingredientList = document.createElement("ul");
    ingredientList.classList.add("list-group", "list-group-flush");

    /* OTRA FORMA DE OBTENER LOS INGREDIENTES
        Object.keys(receta).filter(propiedad => {
            if (receta[propiedad]) {
                return propiedad.includes('Ingredient') || propiedad.includes('Measure');
            }
        });
    */
    for (let i = 1; i < 20; i++) {
        if (receta[`strIngredient${i}`]) {
            const ingrediente = receta[`strIngredient${i}`];
            const cantidad = receta[`strMeasure${i}`];
            const li = document.createElement("li");
            li.classList.add("list-group-item");
            li.textContent = `${ingrediente} - ${cantidad}`;
            ingredientList.appendChild(li);
        }
    }

    const textList = document.createElement("p");
    textList.textContent = "Cantidades e Ingredientes";
    textList.classList.add("fw-bolder", "fs-2", "my-3");

    card.appendChild(imagen);
    cardBody.appendChild(parrafo);
    cardBody.appendChild(descripcion);
    card.appendChild(cardBody);
    card.appendChild(textList);
    card.appendChild(ingredientList);

    modalBody.appendChild(card);
    // Muestra el modal
    modal.show();
}

function limpiarHTML(selector) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
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
