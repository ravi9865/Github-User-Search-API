// API:- https://api.github.com/users

//! Search functionality
let search_btn = document.getElementsByClassName("search-btn")[0];
let input_onchange = document.getElementById("repo")
let base_url = "https://api.github.com/users/";
let search_profile = document.getElementById("profile-views");

function search(inputs_value) {
    let xhr1 = new XMLHttpRequest();
    let concat_str = base_url + inputs_value;
    xhr1.open("Get", `${concat_str}`, true);// it create connection
    xhr1.responseType = "json";
    xhr1.onload = function (){    
        let data = xhr1.response;
        search_profile.innerHTML = ` 
            <div class="user-profile">
                <h3 class="user-type"><span>Type: </span>${data.type}</h3>
                <img src="${data.avatar_url}">
                <h2 class="user-login"><span>_id: </span>${data.login}</h2>
                <button class="view-profile-btn"><a href="${data.html_url}" target="_blank">View Profile</a></button>
            </div>
            <div class="user-details">
                <div class="user-social">
                    <div class="item item1">
                        <img src="./img/followers.png" alt="followers-logo">
                        <h4>followers</h4>
                        <span>${data.followers}</span>
                    </div>
                <div class="item item2">
                    <img src="./img/followers.png" alt="following-logo">
                    <h4>following</h4>
                    <span>${data.following}</span>
                </div>
                <div class="item item3">
                    <img src="./img/followers.png" alt="github-repo-logo">
                    <h4>Repository</h4>
                    <span>${data.public_repos}</span>
                </div>
                </div>
                    <div class="user-personal">
                    <h2 class="name"><span>Name: </span>${data.name}</h2>
                    <h2 class="bio"><span>Bio: </span>${data.bio}</h2>
                    <h2 class="location"><span>City: </span>${data.location}</h2>
                    <h2 class="email"><span>Email: </span>${data.email}</h2>
                </div>
            </div>
        `;
    }
    xhr1.send();
}
search_btn.addEventListener("click", () => {
    let input = document.getElementsByTagName("input")[0];
    if (input.value !== "") {
        search(input.value);//function call
    }
    
})
input_onchange.addEventListener("change", () => {
    let input = document.getElementsByTagName("input")[0];
    if (input.value !== "") {
        search(input.value);//function call
    }
    
})


//! Template work:-
let article = document.getElementsByClassName('template')[0];
let xhr = new XMLHttpRequest(); // object create by XMLHttpRequest()
// xhr.open("Get", "https://api.github.com/users", false);
xhr.open("Get", "https://api.github.com/users", true);// it create contion
xhr.responseType = "json";
xhr.onload = function () {
    /// template work
    let data = xhr.response;
    let org = "";
    for (let i in data) {
        if (data[i].type !== "User") {
            org = data.splice(i, 1);
        }
    }
    data.unshift(org[0]);
    data.map((value) => {
        article.innerHTML += `
        <div class="card ${value.type !== "User" ? "org" : ""}">
            <h3>${value.type}</h3>
            <img src=${value.avatar_url}>
            <h2>${value.login}</h2>
            <a href=${value.html_url} target="_blank><button><i class="fa-brands fa-github"></i>Github Profile</a>
        </div>
        `;
    });
};
xhr.send();//connection close