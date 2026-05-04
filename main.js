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
// console.log('A');

// setTimeout(() => {
//     console.log('B');
// }, 0);

// Promise.resolve().then(() => {
//     console.log('C');
//     return Promise.resolve();
// }).then(() => {
//     console.log('D');
// });

// setTimeout(() => {
//     console.log('E');
// }, 0);

// console.log('F');


// Demo Phức Tạp Event Loop
// A J D
/**
micro = [
() => {
        return Promise.resolve(); // vì phía sau còn micro task nên sẽ k thực hiện ngay
    },
() => {
    console.log('H');
    Promise.resolve().then(() => console.log('I'));
},
]
macro = [
() => {
    console.log('B');
    Promise.resolve().then(() => console.log('C'));
},
() => console.log('G'),
() => console.log('E'),
]
 */
console.log('A');

setTimeout(() => {
    console.log('B');
    Promise.resolve().then(() => console.log('C'));
}, 0);

Promise.resolve()
    .then(() => {
        console.log('D');
        setTimeout(() => console.log('E'), 0);
        return Promise.resolve();
        // return Promise.resolve().then(() => console.log('F')) // TH nà mới thực hiện ngay
    })
    // chờ then trc done r then sau ms vào
    // return r then chỉ đc thực hiện cuối micro task queue
    .then(() => console.log('F'));

setTimeout(() => console.log('G'), 0);

Promise.resolve().then(() => {
    console.log('H');
    Promise.resolve().then(() => console.log('I'));
});

console.log('J');