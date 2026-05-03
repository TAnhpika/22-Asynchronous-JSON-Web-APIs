/**
 * finally: dù success / fail vẫn chạy callback
 */

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

console.log("Hiện loading");

fetchData()
    .then(() => {
        console.log("Hiện data");
    })
    .catch(() => {
        console.log("Báo lỗi");
    })
    .finally(() => {
        console.log("Tắt loading");
    });
