
    
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
    // action
    // terror
    // animation
    async function getData(url) {
        const response = await fetch(url);
        const data = await response.json()
        return data;
    }
    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action');
    const dramaList = await getData('https://yts.am/api/v2/list_movies.json?genre=drama');
    const animationList = await getData('https://yts.am/api/v2/list_movies.json?genre=animation');
    console.log(actionList, dramaList, animationList);
    
    function videoItemTemmplate (movie) {
        return (
            `<div class="primaryPlaylistItem">
                <div class="primaryPlaylistItem-image">
                    <img src="${movie.medium_cover_image}">
                </div>
                <h4 class="primaryPlaylistItem-title">
                    ${movie.title}
                </h4>
            </div>`
        )
    }

    function createTemplate (HTMLString) {
        const $html = document.implementation.createHTMLDocument();
        $html.body.innerHTML = HTMLString;
        return $html.body.children[0];
        
    }

    const $actionContainer = document.querySelector('#action');

    function renderMovieList () {
        actionList.data.movies.forEach((movie) => {
            const HTMLString = videoItemTemmplate(movie);
            const movieElement =  createTemplate(HTMLString);
            $actionContainer.append(movieElement);
            console.log(HTMLString);
        })
    }

    // let terrorList;
    // getData('https://yts.am/api/v2/list_movies.json?genre=terror')
    //     .then((data) => {
    //         console.log('terrorList', data)
    //         terrorList = data;
    //     })
    console.log(actionList, dramaList, animationList)

    // Containers
    const $dramaContainer = document.getElementById('drama');
    const $animationContainer = document.getElementById('animation');
    
    const featuringContainer = document.getElementById('featuring');
    const form = document.getElementById('form');
    const $home = document.getElementById('home');

    // Modal
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');

    // console.log($modal);

    // Templates

    // jQuery
    
    const img = '';
    const title = '';

    '<div class="primaryPlaylistItem">' +
        '<div class="primaryPlaylistItem-image">' +
            '<img src="'+img+'">' +
        '</div>'
        '<h4 class="primaryPlaylistItem-title">'+
            title +
        '</h4>'+
    '</div>';

   
    // console.log(videoItemTemmplate('src/images/cover/bitcoin.jpg','Hello World'));

})()