function sendRequest(method = "GET", url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.send();
        xhr.onload = function () {
            if ((xhr.status >= 200) & (xhr.status < 400)) {
                const contentType = xhr.getResponseHeader("content-type");
                const isJson =
                    contentType && contentType.includes("application/json");

                if (isJson) {
                    try {
                        resolve(JSON.parse(xhr.responseText));
                    } catch (error) {
                        reject("Invalid JSON format");
                    }
                } else {
                    resolve(xhr.responseText);
                }
            } else {
                reject(`HTTP code: ${xhr.status}`);
            }
        };
        xhr.onerror = () => {
            reject("Network error.");
        };
    });
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

// const timeoutPromise = new Promise((resolve, reject) => {
//     setTimeout(() => reject("Error."), 2000);
// });

function getFirstProvince() {
    return sendRequest(
        "GET",
        "https://api01.f8team.dev/api/address/provinces",
    ).then((result) => result.data[0]);
}

function getFirstDistrict(provinceId) {
    return sendRequest(
        "GET",
        `https://api01.f8team.dev/api/address/districts?province_id=${provinceId}`,
    ).then((result) => result.data[0]);
}

function getFirstWard(districtId) {
    return sendRequest(
        "GET",
        `https://api01.f8team.dev/api/address/wards?district_id=${districtId}`,
    ).then((result) => result.data[0]);
}

// getFirstProvince()
//     .then((province) => getFirstDistrict(province.province_id))
//     .then((district) => getFirstWard(district.district_id))
//     .then((result) => console.log(result));

/**
 * ES6+: Async, await
 * -> xử lý code bất đồng bộ như code đồng bộ
 * callback -> promise -> ES6+ (trùm cuối về xử lý bất đồng bộ trong JS - phổ biến nhất)
 * await: chờ promise đc result
 *
 * Lưu ý:
 * chỉ dùng với Promise
 * chỉ async function khi có await promise
 * await phải đc đặt ở top level trong body của async function (k bọc trong hàm khác)
 */

function handle() {
    async function run() {
        const province = await getFirstProvince();
        const district = await getFirstDistrict(province.province_id);
        const ward = await getFirstWard(district.district_id);
        console.log(ward);
    }
    run();
}

handle();
