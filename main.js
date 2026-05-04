/**
 * Task Queues (FiFO):
 * - Micro task queue (ưu tiên cao):
 *      + promise.then() / .catch() / .finally
 *      + MutationObserver
 *      + queueMicrotask()
 *      + process.nextTick() (NodeJs)
 * - Macro task queue (ưu tiên thấp)
 *      + còn lại (settimeout, setinterval, DOM ...)
 *
 * Event loop:
 * - vòng lặp vô hạn, mỗi lần lặp là 1 tick
 * - mỗi tick sẽ check call stack trống k. nếu trống thì:
 *      + check & xử lý toàn bộ micro task
 *      + nếu micro task sinh ra micro task mới thì:
 *          - vẫn ưu tiên xử lý hết các microtask mới sinh ra ngay trong tick đó
 *          - nếu return về micro task nhưng queue còn micro task thì sẽ đc push về cuối queue
 *      + check & xử lý 1 macro task ở đầu hàng để xử lý
 *      + chuyển sang tick tiếp theo
 * 
 * fetch:
 * - thực hiện yêu cầu HTTP bên Web APIs
 * - phụ thuộc vào tốc độ mạng & phản hồi của máy chủ
 * -> Web APIs pending (chờ kết quả trả về) 
 * -> fetch return về 1 Promise pending
 * -> callback chưa đc đưa vào microtask ngay mà phải chờ Promise resolve r mới đưa vào
 * -> .then của fetch cx return 1 Promise pending
 */

// 1 6 5 4 2 3
console.log(1);

// dù mạng & máy chủ có nhanh đến mấy cx k thể bằng setTimeout 0 và Promise.resolve() ngay lập tức 
// nếu settimeout lâu hơn thì sẽ chạy sau
fetch("https://dummyjson.com/users")
    .then((response) => {
        console.log(2);
        return response.json();
    })
    .then((data) => {
        console.log(3);
    });

setTimeout(() => {
    console.log(4);
}, 1000);

Promise.resolve().then(() => {
    console.log(5);
});

console.log(6);
