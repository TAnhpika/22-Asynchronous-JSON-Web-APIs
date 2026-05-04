/**
 * Task Queues:
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
 *      + check & xử lý 1 macro task ở đầu hàng để xử lý
 *      + chuyển sang tick tiếp theo
 */

// console.log(1);

// setTimeout(() => {
//     console.log(2);
//     Promise.resolve().then(() => {
//     console.log(3);
// });
// }, 0);

// setTimeout(() => {
//     console.log(4);
// }, 0);

// Promise.resolve().then(() => {
//     console.log(5);
// });

// Promise.resolve().then(() => {
//     console.log(6);
// });

// console.log(7);

const callstack = [];
const microTask = [
    () => {
        console.log(5);
    },
    () => {
        console.log(6);
    },
];
const macroTask = [
    () => {
        console.log(2);

        microTask.push(() => {
            console.log(3);
        });
    },
    () => {
        console.log(4);
    },
];

let tick = 0;

setInterval(() => {
    console.log(`Tick: ${++tick}`);
    if (!callstack.length) {
        while (microTask.length) {
            // lấy phần tử đầu tiên
            const task = microTask.shift();
            task();
        }
        if (macroTask.length) {
            const task = macroTask.shift();
            task();
        }
    }
}, 1000);
