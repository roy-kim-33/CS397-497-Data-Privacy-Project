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
    const currentTab = await getCurrentTab();
    console.log(currentTab.url);
    // getting cookies pertinent to the current tab
    let currentTabCookies = await chrome.cookies.getAll({
        url: currentTab.url,
    });
    // all cookies
    let allCookies = await chrome.cookies.getAll({});
    // cookies = new Set([...cookies]);
    const thirdPartyCookies = await processCookies(allCookies, currentTabCookies);
    console.log();

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
            // li.innerHTML = `${cookie}`
            cookiesList.appendChild(li);
            //   `<li>domain: ${cookie.domain}\nname: ${cookie.name}</li>`;
            //   cookiesList.children.push(li);
        }
    });
}

async function processCookies(allCookies, currentTabCookies) {
    allCookies = allCookies.filter(cookie => !cookie.domain.startsWith('.'));
    currentTabCookies = currentTabCookies.filter(cookie => !cookie.domain.startsWith('.'));
    const currentTabCookiesDomains = currentTabCookies.map(cookie => cookie.domain);
    return allCookies.filter(cookie => !currentTabCookiesDomains.includes(cookie.domain));
}

btn.addEventListener("click", getCookies);