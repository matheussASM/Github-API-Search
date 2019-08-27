const search = document.getElementById("search");
const profile = document.getElementById("profile");
const count = 7;
const sort = "created: asc";

const url = "https://api.github.com/users";

async function getUser(user){
    const profileResponse = await fetch(`${url}/${user}`);
    const reposResponse = await fetch(`${url}/${user}/repos?per_page=${count}&sort=${sort}`);

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();
    return {profile, repos}
}

function showProfile(user){
    profile.innerHTML = `<div class="row mt-3">
        <div class="col-md-4">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${user.avatar_url}" />
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Repositorios:<span class="badge badge-success">${user.public_repos}</span></li>
                    <li class="list-group-item">Seguidores:<span class="badge badge-primary">${user.followers}</span></li>
                    <li class="list-group-item">Seguindo:<span class="badge badge-info">${user.following}</span></li>
                </ul>
                <div class="card-body">
                    <a href="${user.html_url}" target="_blank" class="btn btn-dark btn-block">Acessar Github</a>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-8"><div id="repos"></div></div>`; 
}

function showRepos(repos){
    let output ="";

    repos.forEach(repo => {
        output +=`
    <div class="card card-body mb-2">
        <div class="row mt-3">
            <div class="col-md-6"><a href="${repo.html_url}" target="_blank" >${repo.name}</a></div>
            <div class="col-md-6">
                <span class="badge badge-success">Stars:${repo.stargazers_count}</span>
                <span class="badge badge-primary">Watch:${repo.watchers_count}</span>
                <span class="badge badge-info">Forks:${repo.forks_count}</span>
            </div>
        </div>
    </div>`
    });

    document.getElementById("repos").innerHTML = output;
}

search.addEventListener("keyup", (e) => {
        const user = e.target.value;

        if(user.length > 0){
            getUser(user).then(res => { 
                showProfile(res.profile);
                showRepos(res.repos);
            });
        }


    });
