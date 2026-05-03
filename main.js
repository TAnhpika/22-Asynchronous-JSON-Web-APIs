async function send(method, url) {
    const res = await fetch(url, { method });
    if (!res.ok) throw new Error(`HTTP code: ${res.status}`);
    const type = res.headers.get("content-type");
    const isJson = type && type.includes("application/json");
    try {
        return isJson ? await res.json() : await res.text();
    } catch (error) {
        throw new Error("Invalid JSON format");
    }
}
// await giúp gán giá trị trả về là json / html (sau khi promise hoàn thành) chứ k phải 1 promise
// chờ promise result -> có lỗi -> catch

const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const productsList = document.querySelector(".products-list");

send("GET", "./partials/header.html")
    .then((responseText) => {
        header.innerHTML = responseText;
    })
    .catch((error) => {
        console.log(error);
    });

send("GET", "./partials/footer.html")
    .then((responseText) => {
        footer.innerHTML = responseText;
    })
    .catch((error) => {
        console.log(error);
    });

send("GET", "https://api01.f8team.dev/api/products").then((result) => {
    const products = result.data.items;

    products.forEach((product) => {
        const item = document.createElement("li");
        item.textContent = product.title;
        productsList.appendChild(item);
    });
});
