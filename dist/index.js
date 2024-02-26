"use strict";
async function fetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}
function fetchUserData(url) {
    fetcher(url, {});
}
fetchUserData("https://api.github.com/users");
