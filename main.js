/**
 * fetch(): hàm giúp thực hiện yêu cầu HTTP ~ xhr. ra đời ở bản js mới hơn nhầm thay thế xhr
 * có cú pháp ngắn gọn, tiện dụng hơn
 * hỗ trợ promise (then, catch, async, await) mà k cần new Promise thủ công
 */

// ok: true (yêu cầu gửi thành công & máy chủ k phản hồi lỗi). false (k gửi đc / gửi lỗi)
// .text(): trả về text / html
// .json(): trả về json đc auto parse
// fetch("https://api01.f8team.dev/api/products111")
//     .then((res) => {
//         if (!res.ok) throw new Error(`HTTP code: ${res.status}`);
//         return res.json();
//     })
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

async function sendRequest(method, url) {
    const res = await fetch(url, { method });
    if (!res.ok) throw new Error(`HTTP code: ${res.status}`);
    const type = res.headers.get("content-type");
    const isJson = type && type.includes("application/json");
    return isJson ? res.json() : res.text();
}

const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const productsList = document.querySelector(".products-list");

sendRequest("GET", "./partials/header.html")
    .then((responseText) => {
        header.innerHTML = responseText;
    })
    .catch((error) => {
        console.log(error);
    });

sendRequest("GET", "./partials/footer.html")
    .then((responseText) => {
        footer.innerHTML = responseText;
    })
    .catch((error) => {
        console.log(error);
    });

sendRequest("GET", "https://api01.f8team.dev/api/products").then(
    (result) => {
        const products = result.data.items;

        products.forEach((product) => {
            const item = document.createElement("li");
            item.textContent = product.title;
            productsList.appendChild(item);
        });
    },
);
