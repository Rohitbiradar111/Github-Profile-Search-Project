const main = document.getElementById("main");
const inputForm = document.getElementById("userInput");
const inputBox = document.getElementById("inputBox");
const api = "https://api.github.com/users/";

const fetchUser = async (username) => {
    try {
        const res = await fetch(`${api}${username}`);
        if (!res.ok) throw new Error("No profile with this username");
        const user = await res.json();
        console.log("User Data:", user);
        displayUser(user);
        fetchRepos(username);
    } catch (error) {
        displayError(error.message);
    }
};

const fetchRepos = async (username) => {
    try {
        const res = await fetch(`${api}${username}/repos?sort=created`);
        if (!res.ok) throw new Error("Problem fetching repos");
        const repos = await res.json();
        console.log("Repositories:", repos);
        displayRepos(repos);
    } catch (error) {
        displayError(error.message);
    }
};

const displayUser = (user) => {
    main.innerHTML = `
    <div class="card">
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        <div class="user-info">
            <h2>UserName : ${user.name || user.login}</h2>
            <p>${user.bio ? `User Bio: ${user.bio}` : "No Bio Available"}</p>
            <p>Github Profile : <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
            <ul>
                <li><strong>Followers : </strong>${user.followers}</li>
                <li><strong>Following : </strong>${user.following}</li>
                <li><strong>Repos : </strong>${user.public_repos}</li>
            </ul>
            <div class="repo-label">Latest Repositories : </div>
            <div id="repos"></div>
        </div>
    </div>`;
};

const displayRepos = (repos) => {
    const reposElement = document.getElementById("repos");
    reposElement.innerHTML = "";
    repos.slice(0, 5).forEach(repo => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposElement.appendChild(repoEl);
    });
};

const displayError = (message) => {
    main.innerHTML = `<div class="card"><h1>${message}</h1></div>`;
};

inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = inputBox.value.trim();
    if (user) {
        fetchUser(user);
        inputBox.value = "";
    }
});