const search = document.getElementById("search");
const profile = document.getElementById("profile");

const url = "https://api.github.com/users";

async function getUser(user){
    const profileResponse = await fetch(`${url}/${user}`)

    const profile = profileResponse.json();
    return profile
}

search.addEventListener("keyup", (e) => {
        const user = e.target.value;

        if(user.length > 0){
            getUser(user).then(res => console.log(res));
        }


    });

function userProfile(user){
    
}