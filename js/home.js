/*console.log('red')

const noCambia = "no va a cambiar"
let cambia = "va a cambiar"

function cambiarNombre(nuevoNombre) {
    cambia = nuevoNombre
}

const getUserAll = new Promise(function(todoBien, todoMal) {
    setTimeout(() => {
        todoBien('Todo Bien');
        // todoMal('Se acabo el tiempo de espera');
    }, 5000);
})

const getUser = new Promise(function(todoBien, todoMal) {
    setTimeout(() => {
        todoBien('Todo Bien');
        // todoMal('Se acabo el tiempo de espera');
    }, 3000);
})

getUser
    .then((msg)=>{
        console.log(msg)
    })
    .catch((msg) => {
        console.log(msg)
    })
Promise.all([
    getUserAll,
    getUser
])
.then((msg) => {
    console.log(msg)
})
.catch((msg) => {
    console.log(msg)
})

Promise.race([
    getUserAll,
    getUser
])
.then((msg) => {
    console.log(msg)
})
.catch((msg) => {
    console.log(msg)
})*/
    
/**
 * Traer Datos con AJAX
 */

$.ajax('https://randomuser.me/api/1', {
    method: 'GET',
    // success: (data) => {console.log(data)},
    // error: (error) => {console.log(error)}
});

// XMLHttpRequest

/**
 * Traer datos con Vanilla JavaScript
 */

fetch('https://randomuser.me/api/')
    .then((response) => {
        // console.log(response)
        return response.json()
    })
    .then((user) => {
        console.log('user', user.results[0].name.first)
    })
    .catch(() => {
        console.log('Algo fallo')
    });


/**
 * Async Function
 */

(async function load() {
    // await
    const response = await fetch('https://yts.am/api/v2/list_movies.json?genre=action')
    const data = await response.json()
    console.log(data)

})()