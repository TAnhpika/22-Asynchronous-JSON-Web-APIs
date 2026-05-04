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
 *      + nếu micro task sinh ra micro task mới thì vẫn ưu tiên xử lý hết các microtask mới sinh ra ngay trong tick đó
 *      + check & xử lý 1 macro task ở đầu hàng để xử lý
 *      + chuyển sang tick tiếp theo
 */

Promise.resolve().then(() => {
    console.log(1);
    Promise.resolve().then(() => {
        console.log(2);
    });
});
Promise.resolve().then(() => {
    console.log(3);
    Promise.resolve().then(() => {
        console.log(4);
    });
});
