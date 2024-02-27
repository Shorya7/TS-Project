"use strict";
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const main = document.querySelector(".main-container");
async function fetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    const data = await response.json();
    // console.log(data);
    return data;
}
const showCard = (indi) => {
    const { avatar_url, login, url } = indi;
    main.insertAdjacentHTML("beforeend", `
        <div class="card">
            <img src="${avatar_url}" alt="${login}" />
            <hr/>
            <div class="card-footer">
            <img src="${avatar_url}" alt="${login}" />
            <a href="${url}">Github</a>
        </div>
        </div>
        `);
};
function fetchUserData(url) {
    fetcher(url, {}).then((userInfo) => {
        for (const indi of userInfo) {
            showCard(indi);
        }
    });
}
fetchUserData("https://api.github.com/users");
getUsername.addEventListener('input', async (e) => {
    e.preventDefault();
    const search = getUsername.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allData = await fetcher(url, {});
        const match = allData.filter((user) => {
            return user.login.toLowerCase().includes(search);
        });
        main.innerHTML = "";
        if (match.length === 0) {
            main.insertAdjacentHTML("beforeend", `<p class="empty-msg">No matching users found.</p>`);
        }
        else {
            for (const user of match) {
                showCard(user);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
formSubmit.addEventListener('submit', async (e) => {
    e.preventDefault();
});
