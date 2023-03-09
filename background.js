// const btn = document.getElementById("go");
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
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     chrome.cookies.getAll({url: tabs[0].url}, function(cookies) {
    //         console.log(cookies);
    //     });
    // });
    const currentTab = await getCurrentTab();
    console.log(currentTab.url);
    // getting cookies pertinent to the current tab
    let currentTabCookies = await chrome.cookies.getAll({ url: currentTab.url, });
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
            li.innerHTML = `domain: ${cookie.domain}`;
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


test = async() => {
    let all_windows = await chrome.windows.getAll({ populate: true });
    let first_party_cookies = [];
    for (let window of all_windows) {
        // let tabs = await window.tabs;
        for (let tab of window.tabs) {
            let tab_first_party_cookies = await chrome.cookies.getAll({ url: tab.url });
            first_party_cookies = first_party_cookies.concat(tab_first_party_cookies);
        };
    };

    let all_cookies = await chrome.cookies.getAll({});

    all_cookies = all_cookies;
    let first_party_cookies_domains = new Set(first_party_cookies.map(cookie => { return cookie.domain })); // domains of all first-party-cookies

    let third_party_cookies = all_cookies.filter(cookie => !first_party_cookies_domains.has(cookie.domain)); // filter all_cookies with cookies whose domain are not included in first_party_cookies_domains
    // domain only | cannot get all the other values 

    console.log(all_cookies);
    console.log(first_party_cookies);
    console.log(third_party_cookies);
    console.log(third_party_cookies.filter(cookie => !cookie.domain.startsWith('.')));

    third_party_cookies.filter(cookie => !cookie.domain.startsWith('.')).forEach(function(cookie) {
        console.log(
            "domain: ",
            cookie.domain,
            "\n",
            "name: ",
            cookie.name,
            "\n",
            "value: ",
            cookie.value
        );
        let li = document.createElement("li");
        li.innerHTML = `<b>domain:</b> ${cookie.domain}`;
        li.innerHTML += '<br>';
        li.innerHTML += `<b>name:</b> ${cookie.name}\n`;
        // li.innerHTML += '<br>';
        // li.innerHTML += '<br>';
        // // li.innerHTML = `${cookie}`
        cookiesList.appendChild(li);
        //   `<li>domain: ${cookie.domain}\nname: ${cookie.name}</li>`;
        //   cookiesList.children.push(li);
    });
}
test();

// btn.addEventListener("click", getCookies);