/**
* Async Function
*/

// Movies const api
const BASE_API = 'https://yts.am/api/v2/';
// Friends const api
const BASE_API_FRIENDS = 'https://randomuser.me/api/';

(async function load() {
    
    // Containers
    const $container = new Object();
    $container.action = document.getElementById('action');
    $container.drama = document.getElementById('drama');
    $container.animation = document.getElementById('animation');
          
    const $featuringContainer = document.getElementById('featuring');
    const $form = document.getElementById('form');
    const $home = document.getElementById('home');

    // Modal
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const $modalTitle = $modal.querySelector('#modalTitle');
    const $modalImage = $modal.querySelector('#modalImage');
    const $modalDescription = $modal.querySelector('#modalDescription'); 
    const $modalRating = $modal.querySelector('#modalRating'); 
    const $modalDuration = $modal.querySelector('#modalDuration');

    // Friends List
    const $playlistFriends = document.getElementById('playlistFriends');
    const $numberFriends = 15;

    /**
     * Helper Functions
     */

    // Milliseconds to Minutes and Seconds
    
    function msToMinutesAndSeconds(ms) {
        parseInt(ms, 10);
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000).toFixed(0);
        return `${minutes} : ${(seconds < 10 ? '0' : '')} ${seconds}`;
    }

    /**
     * Get Data Movies
     */
    async function getData(url) {
        const response = await fetch(url);
        const data = await response.json()
        if (data.data.movie_count > 0) {
            return data;
            // Aqui se acaba y el programa se ejecuta normalmente
        }
        // Si no hay datos
        throw new Error('No se encontro nungun resultado');
    }

    /**
     * Get User Data
     */
    async function getFriends(url) {
        const responseUser = await fetch(url);
        const dataFriend = await responseUser.json();
        if (dataFriend) {
            return dataFriend;    
        }
        throw new Error('No se encontraron amigos...');
    }

    /**
     * Set Attributes
     */
    function setAttributes ($element, attributes) {
        for (let attribute in attributes) {
            $element.setAttribute(attribute, attributes[attribute]);
        }
    }

    /**
     * Get Attributes
     */
    function getAttributes ($element, attribute) {
        $element.getAttribute (attribute);
        return $element;
    }

    /**
     * Create Template 
     */
    function createTemplate (HTMLString) {
        const $html = document.implementation.createHTMLDocument();
        // debugger
        $html.body.innerHTML = HTMLString;
        return $html.body.children[0];
    }

    /**
     * Create Featuring Template
     */
    function createFeaturingTemplate (peli) {
        return (
            `
            <div class="featuring">
                <div class="featuring-image">
                    <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
                </div>
                <div class="featuring-content">
                    <p class="featuring-title">Pelicula encontrada</p>
                    <p class="featuring-album">${peli.title}</p>
                </div>
            </div>
            `
        )
    }

    // Create Video Item Template 
    function videoItemTemmplate (movie, category) {
        return (
            `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
                <div class="primaryPlaylistItem-image">
                    <img src="${movie.medium_cover_image}">
                </div>
                <h4 class="primaryPlaylistItem-title">
                    ${movie.title}
                </h4>
            </div>`
        )
    }

    /**
     * Create User Template
     */

    function friendsTemplate (friend) {
        return (
            `<li class="playlistFriends-item">
                <a href="${friend.picture.large}">
                <img src="${friend.picture.thumbnail}" alt="${friend.name}" />
                <span>
                    ${friend.name.first} ${friend.name.last } - 
                </span>
                <span>
                      ${friend.location.city}
                </span>
                </a>
            </li>`
        );
    }

    window.localStorage.setItem('nombre', JSON.stringify({'peli': 'wonder woman'}))
    
    /**
     * Search Movies
     */
    
    $form.addEventListener('submit', async (event) => {
        event.preventDefault();
        $home.classList.add('search-active');
        const $loader = document.createElement('img');
        setAttributes($loader, {
            src: 'img/loader.gif',
            width: '20px',
            height: '20px'
        })
        $featuringContainer.append($loader);
        // debugger
        const data = new FormData($form);
        try {
            const {
                data: {
                    movies: pelis
                }
            } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
            const HTMLString = createFeaturingTemplate(pelis[0]);
            $featuringContainer.innerHTML = HTMLString;
        } catch (error) {
            // debugger
            alert(error.message)
            $loader.remove();
            $home.classList.remove('search-active')
        }
    });
   
    /**
     * Render Template Friends List
     */

    function renderFriendList(friends, $container){
        $playlistFriends.children[0].remove();
        friends.forEach((friend) => {
            let HTMLString = friendsTemplate(friend);
            let friendElement = createTemplate(HTMLString);
            $container.append(friendElement);
        });
    }
    
    const fiendsResult = await getFriends(`${BASE_API_FRIENDS}?nat=es&results=${$numberFriends}`);
    renderFriendList(fiendsResult.results, $playlistFriends);
 
    // Render Template Movie List
    function renderMovieList (list, $container, category) {
        $container.children[0].remove();
        list.forEach((movie) => {
            const HTMLString = videoItemTemmplate(movie, category);
            const movieElement =  createTemplate(HTMLString);
            $container.append(movieElement);
            const image = movieElement.querySelector('img');
            image.addEventListener('load', (event) => {
                event.srcElement.classList.add('fadeIn');
                // debugger
            });
            addEventClick(movieElement);
        });
    }

    

    // Cache List
    async function cacheExist(category) {
        const listName = `${category}List`;
        const cacheList = window.localStorage.getItem(listName);
    
        if (cacheList) {
          return JSON.parse(cacheList);
        }
        const { data: { movies: data } } = await getData(`${BASE_API}list_movies.json?genre=${category}`)
        window.localStorage.setItem(listName, JSON.stringify(data))
    
        return data;
    }


    // GenreList And Render

    /**
     * Update Movies Categories 
     */

    async function updateData(category, container) {
        const list = await cacheExist(category);
        renderMovieList(list, container, category);
        return list;
    }

    $links = document.getElementsByClassName('primaryPlaylist-update');

    let [actionList, dramaList, animationList] = await Promise.all([
        updateData('action', $container.action),
        updateData('drama', $container.drama),
        updateData('animation', $container.animation)
    ]);
    
    [].forEach.call($links, element => {
        element.addEventListener('click', event => {
          const updateTerm = event.target.dataset.update;
          localStorage.removeItem(`${updateTerm}List`)
          location.reload()
        })
    })
    

    /**
     * Data Modal movies
     */
    function findMovie (id, category) {
        function findById(list, id) {
            // debugger
            return list.find(movie =>  movie.id === parseInt(id, 10));
        }
        switch (category) {
            case 'action': {
                return findById(actionList, id);
            };
            case 'drama': {
                return findById(dramaList, id);
            };
            default: {
                return findById(animationList, id);
            };
        }
        // console.log(`Id: ${id}, Category: ${category}`);
    }

    // Event Click
    function addEventClick ($element) {
        $element.addEventListener('click', (event) => {
            showModal($element);
        });
    }

    // Show Modal
    function showModal ($element) {
        $overlay.classList.add('active');
        $modal.style.animation = 'modalIn .8s forwards';
        // $modal.style.display = 'block';
        $id = $element.dataset.id;
        $category = $element.dataset.category;
        const dataMovie = findMovie($id,$category);
        
        // Replace Modal Components with Data
        $modalTitle.textContent = dataMovie.title_long;
        $modalImage.setAttribute('src', dataMovie.medium_cover_image);
        $modalDescription.textContent = dataMovie.synopsis;
        $modalRating.textContent = `${dataMovie.rating} rating`;
        $modalDuration.textContent = `${dataMovie.runtime} minutos`;
        
    }

    // Close Modal
    function closeModal() {
        $modal.style.animation = 'modalOut .8s forwards';
        $overlay.style.transition = "all 5s ease-in-out";
        $overlay.classList.remove('active');
    }
    $hideModal.addEventListener('click', closeModal);

})()