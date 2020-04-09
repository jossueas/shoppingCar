//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn =   document.getElementById('vaciar-carrito');


//Listerners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     cursos.addEventListener('click', comprarCurso);

//when to choose delete course from car
carrito.addEventListener('click', eliminarCurso);
// when empy the car
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

//load the documento show localStorage
document.addEventListener('DOMContentLoaded',leerLocalStorage);



}

//Function
//Function to add course to car
function comprarCurso(e){
    e.preventDefault();

    ///Delation to add car
    if(e.target.classList.contains('agregar-carrito')){
    const curso = e.target.parentElement.parentElement;
        //send curse selection to take the data
    leerDatosCurso(curso);
    }
    
}
//Read data curse

function leerDatosCurso(curso){

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insetarCarrito(infoCurso);
}
//show the curse selected in the car
function insetarCarrito(curso){

const row = document.createElement('tr');
row.innerHTML = `
<td>
    <img src="${curso.imagen}" width=100>
</td>
<td>${curso.titulo}</td>
<td>${curso.precio}</td>
<td>
<a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
</td>

`;
listaCursos.appendChild(row);
guardarCursoLocalStorage(curso);

}



//Delete course of car in the DOM
function eliminarCurso(e){
    e.preventDefault();
    
    let curso,
    cursoid;
    if(e.target.classList.contains('borrar-curso')){

      e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoid = curso.querySelector('a').getAttribute('data-id');
       

    }
   eliminarCursoLocalStore(cursoid);
}


//empy the car
function vaciarCarrito(){
    //two ways to do it
    // the slow way
    //listaCursos.innerHTML = '';
    //fast and recommended way
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);

    }


    

    //empy localStorag
    vaciarLocalStorage();
    return false;
}


//To stock in the localStorage

function guardarCursoLocalStorage(curso){
    let cursos;

    //Take the value of array with or whithout data of LS
    cursos = obtenerCursosLocalStorage();


    /// course selected is add to car
cursos.push(curso);
localStorage.setItem('cursos',JSON.stringify(cursos) );
}

//check elements in the local Storage
function obtenerCursosLocalStorage(){
    let cursosLS;

    //check local storage Items

    if(localStorage.getItem('cursos') === null){
        cursosLS = []

    }else{
        cursosLS = JSON.parse( localStorage.getItem('cursos'));


    }
    return cursosLS;
}



///print courses the localstorage  in the car

function leerLocalStorage(){
    let cursosLS;

cursosLS = obtenerCursosLocalStorage();
//console.log(cursosLS);
cursosLS.forEach(function(curso){
    ///contruction template

    const row = document.createElement('tr');
row.innerHTML = `
<td>
    <img src="${curso.imagen}" width=100>
</td>
<td>${curso.titulo}</td>
<td>${curso.precio}</td>
<td>
<a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
</td>

`;
listaCursos.appendChild(row);
});

}


//Delete course of localStorage by ID


function eliminarCursoLocalStore(curso){
    let cursosLS;

    //we obtain the array of courses
    cursosLS = obtenerCursosLocalStorage();
    //Iterate checking the id of course remove whith the localStorage

    cursosLS.forEach(function(cursoLS, index){
      if(cursoLS.id === curso){
          cursosLS.splice(index, 1)
      }
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}
//Delete all curses of local storage


function vaciarLocalStorage(){
    localStorage.clear();
}