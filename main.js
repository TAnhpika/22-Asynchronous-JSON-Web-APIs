function sendRequest(method = "GET", url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true); // false: gửi đồng bộ - lag -> đơ => true - async
    xhr.send();

    // trả về sau khi async xong
    xhr.onload = function () {
        if ((xhr.status >= 200) & (xhr.status < 400)) {
            if (typeof callback === "function") {
                callback(xhr.responseText);
            }
        }
    };
}

const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const productsList = document.querySelector(".products-list");

sendRequest("GET", "./partials/header.html", (responseText) => {
    header.innerHTML = responseText;
});

sendRequest("GET", "./partials/footer.html", (responseText) => {
    footer.innerHTML = responseText;
});

// callback hell: xảy ra khi công việc trước là đầu vào của công việc tiếp theo
sendRequest(
    "GET",
    "https://api01.f8team.dev/api/address/provinces",
    (response) => {
        const provinces = JSON.parse(response).data;
        const firstProvince = provinces[0];

        sendRequest(
            "GET",
            `https://api01.f8team.dev/api/address/districts?province_id=${firstProvince.province_id}`,
            (response) => {
                const districts = JSON.parse(response).data;
                const firstDistrict = districts[0];

                sendRequest(
                    "GET",
                    `https://api01.f8team.dev/api/address/wards?district_id=${firstDistrict.district_id}`,
                    (response) => {
                        const wards = JSON.parse(response).data;
                        const firstWards = wards[0];
                        console.log(firstWards);
                    },
                );
            },
        );
    },
);
