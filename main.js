function sendRequest(method = "GET", url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.send();
        xhr.onload = function () {
            if ((xhr.status >= 200) & (xhr.status < 400)) {
                resolve(xhr.responseText);
            } else {
                reject("Network error.");
            }
        };
    });
}

const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const productsList = document.querySelector(".products-list");

sendRequest("GET", "./partials/header.html").then((responseText) => {
    header.innerHTML = responseText;
});

sendRequest("GET", "./partials/footer.html").then((responseText) => {
    footer.innerHTML = responseText;
});

// sendRequest("GET", "https://api01.f8team.dev/api/products").then(
//     (responseText) => {
//         const response = JSON.parse(responseText);
//         const products = response.data.items;

//         products.forEach((product) => {
//             const item = document.createElement("li");
//             item.textContent = product.title;
//             productsList.appendChild(item);
//         });
//     },
// );


// độc lập logic -> dễ bảo trì, mở rộng
sendRequest("GET", "https://api01.f8team.dev/api/address/provinces")
    .then((response) => {
        const provinces = JSON.parse(response).data;
        const firstProvince = provinces[0];

        return sendRequest(
            "GET",
            `https://api01.f8team.dev/api/address/districts123?province_id=${firstProvince.province_id}`,
        );
    })
    .then((response) => {
        const districts = JSON.parse(response).data;
        const firstDistrict = districts[0];

        return sendRequest(
            "GET",
            `https://api01.f8team.dev/api/address/wards?district_id=${firstDistrict.district_id}`,
        );
    })
    .then((response) => {
        const wards = JSON.parse(response).data;
        const firstWards = wards[0];
        console.log(firstWards);
    })
    .catch((error) => {
        console.log(error);
    });
