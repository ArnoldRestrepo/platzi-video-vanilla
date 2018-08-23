const BASE_USER_API = 'https://randomuser.me/api/';

(async function load() {
    const $playlistFriends = document.getElementById('playlistFriends');
    const $numberUsers = 15;

    async function getUser (url) {
        const responseUser  = await fetch(url);
        const dataUser = await responseUser.json();
        debugger
        if (dataUser.results) {
            return dataUser;
        }
        throw new Error('No se encontraron amigos');
    }

    // Create Sidebar Users
    function sidebarUsers (user) {
        return (
            `<li class="playlistFriends-item">
                <a href="${user.picture.large}">
                <img src="${user.picture.thumbnail}" alt="${user.name}" />
                <span>
                    ${user.name.first} ${user.name.last}
                </span>
                </a>
            </li>`
        );
    }

    // Create Template
    function createTemplate (HTMLString) {
        const $html = document.implementation.createHTMLDocument();
        // debugger
        $html.body.innerHTML = HTMLString;
        return $html.body.children[0];
    }

    function renderUserList(users, $container) {
        $playlistFriends.children[0].remove();
        users.forEach((user) => {
            let HTMLString = sidebarUsers(user);
            let userElement = createTemplate(HTMLString);
            $container.append(userElement);
        });
    }

    // getUser(`${BASE_USER_API}?results=10`)
    //     .then((users) => {
    //         renderUserList(users.results,$playlistFriends);
    //         console.log(users.results)

    //     }).catch((error) => {
    //         console.log(error.message)
    //     });
    
    const usersResult = await getUser(`${BASE_USER_API}?results=10`);
    renderUserList(usersResult.results, $playlistFriends);
    

})()