const USER_API = 'https://api.github.com/users/';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getUser('gcastrocastro');

async function getUser(username) {
    const resp = await fetch(USER_API + username);
    const respData = await resp.json();
    getRepos(username);
    createUserCard(respData);
}

async function getRepos(username) {
    const resp = await fetch(USER_API + username + '/repos');
    const respData = await resp.json();
    addReposToCard(respData);
}

function createUserCard (user) {
    const cardHTML = `
        <div class="card">
            <div class='top-container'>
                <div>
                    <a href="${user.html_url}"><img class="avatar" src="${user.avatar_url}" alt="${user.name}"></a>
                    <ul class="user-infolist">
                        <li><i class="fa-solid fa-user-group"></i> ${user.followers}</li>
                        <li><i class="fa-solid fa-people-group"></i> ${user.following}</li>
                        <li><i class="fa-solid fa-book-bookmark"></i> ${user.public_repos}</li>
                    </ul>
                </div>
                <div class="user-info">
                    <a href="${user.html_url}" class="user-link"><h2>${user.name}</h2></a>
                    <p>${user.bio}</p>
                </div>
            </div>
            <div id="repos">
            </div>
        </div>`;
    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');
    repos.forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = repo.homepage;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = '';
    }
});