// tự động tải thêm nội dung khi scroll xún ở yt / fb

/**
 * XHR - XML HttpRequest
 * Có thể xử lý cả xml và JSON
 * Gửi / Nhận data k cần reload
 */

// xhr.onreadystatechange = function () {
//     // 2: cb gửi, 3: đang gửi, 4: đã gửi và nhận response
//     // 200 - 400: gửi thành công
//     if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
//         console.log(xhr.responseText);
//     }
// };

//"./partials/header.html"
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

sendRequest("GET", "./partials/header.html", (responseText) => {
    console.log(responseText);
});
