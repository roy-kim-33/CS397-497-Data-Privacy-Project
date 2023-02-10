const btn = document.getElementById("go");
const cookiesList = document.getElementById("cookies");

async function getCurrentTab(e) {
    // e.preventDefault();
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab);
    return tab;
}

async function getCookies(e) {
    e.preventDefault();
    const currentTab = getCurrentTab()
    console.log(currentTab)
    const cookies = await chrome.cookies.getAll({});
    cookies.forEach(function(cookie) {
        if (!cookie.domain.startsWith(".")) {
            // check if the cookie is a third-party cookie
            // console.log(
            //     "domain: ",
            //     cookie.domain,
            //     "\n",
            //     "name: ",
            //     cookie.name,
            //     "\n",
            //     "value: ",
            //     cookie.value
            // );
            let li = document.createElement("li");
            li.innerHTML = `domain: ${cookie.domain}\nname: ${cookie.name}`;
            cookiesList.appendChild(li);
            //   `<li>domain: ${cookie.domain}\nname: ${cookie.name}</li>`;
            //   cookiesList.children.push(li);
        }
    });
}



btn.addEventListener("click", getCookies);