const btn = document.getElementById("go");
const cookiesList = document.getElementById("cookies");

async function testFunction(e) {
  e.preventDefault();
  console.log("hi");
  const cookies = await chrome.cookies.getAll({});
  cookies.forEach(function (cookie) {
    if (!cookie.domain.startsWith(".")) {
      // check if the cookie is a third-party cookie
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
      let li = document.createElement('li');
      li.innerHTML = `domain: ${cookie.domain}\nname: ${cookie.name}`;
      cookiesList.appendChild(li);
    //   `<li>domain: ${cookie.domain}\nname: ${cookie.name}</li>`;
    //   cookiesList.children.push(li);
    }
  });
}
btn.addEventListener("click", testFunction);
