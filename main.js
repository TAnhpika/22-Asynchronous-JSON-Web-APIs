function sendRequest(method = "GET", url) {
    // if ("...") {
    //     return Promise.reject('Error..');
    // }

    // Fake
    // return Promise.resolve([1, 2, 3, 4]);

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
                    // setTimeout(() => {
                    resolve(xhr.responseText);
                    // }, 3000);
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

// const promise = sendRequest("...");
// promise.then("...").catch("...");

// Fake
// sendRequest().then((result) => console.log(result));

const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const productsList = document.querySelector(".products-list");

// sendRequest("GET", "./partials/header.html")
//     .then((responseText) => {
//         header.innerHTML = responseText;
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// sendRequest("GET", "./partials/footer.html")
//     .then((responseText) => {
//         footer.innerHTML = responseText;
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// const timeoutPromise = new Promise((resolve, reject) => {
//     setTimeout(() => reject("Error."), 2000);
// });

/**
 * Promise.all:
 * chờ all promise resolve thì mới vào then. reject k vào -> block rendering
 * dùng khi có các async có thể thực hiện song song & đảm bảo tất cả phải thành công
 */
// Promise.all([
//     sendRequest("GET", "./partials/header.html"),
//     sendRequest("GET", "./partials/footer.html"),
//     timeoutPromise,
// ])
//     .then((result) => {
//         header.innerHTML = result[0];
//         footer.innerHTML = result[1];
//     })
//     .catch((error) => {
//         console.log(error);
//     });

/**
 * Promise.allSettled:
 * chờ tất cả đc resolve / reject
 */
// Promise.allSettled([
//     sendRequest("GET", "./partials/header.html"),
//     sendRequest("GET", "./partials/footer.html"),
//     timeoutPromise,
// ])
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

/**
 * Promise.race:
 * promise đầu tiên trả về resolve / reject
 * -> đặt giới hạn tg cho các promise. Nếu k xong trong (2)s thì sẽ k đc render
 */
// Promise.race([
//     sendRequest("GET", "./partials/header.html"),
//     sendRequest("GET", "./partials/footer.html"),
//     timeoutPromise,
// ])
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

/**
 * Muốn luôn trả về 1 promise
 */
// Promise.resolve("Success").then((result) => console.log(result));
// Promise.reject("Error").catch((error) => console.log(error));

// function getFirstProvince() {
//     return sendRequest(
//         "GET",
//         "https://api01.f8team.dev/api/address/provinces",
//     ).then((result) => result.data[0]);
// }

// function getFirstDistrict(provinceId) {
//     return sendRequest(
//         "GET",
//         `https://api01.f8team.dev/api/address/districts?province_id=${provinceId}`,
//     ).then((result) => result.data[0]);
// }

// function getFirstWard(districtId) {
//     return sendRequest(
//         "GET",
//         `https://api01.f8team.dev/api/address/wards?district_id=${districtId}`,
//     ).then((result) => result.data[0]);
// }

// getFirstProvince()
//     .then((province) => getFirstDistrict(province.province_id))
//     .then((district) => getFirstWard(district.district_id))
//     .then((result) => console.log(result));
