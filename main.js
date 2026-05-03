/**
 * JS engine có 2 thành phần chính:
 * 1. Memory Heap (Lưu obj)
 * 2. Call Stack:
 * - lưu inf các func đang đc thực thi
 * - lưu đúng trình tự gọi hàm và xử lý đúng tuần tự -> bản chất JS là chạy đồng bộ
 * - JS đơn luồng -> 1 call stack
 *
 * Stack: cấu trúc dữ liệu ngăn xếp (xếp chồng đĩa)
 * Last In - First Out
 *
 * Call stack: bản chất là lưu trữ các execution context - lun đc push vào Global execution context trc - lun nằm dưới đáy
 * khi gọi hàm nó sẽ push dần lên. done sẽ pop
 */

function a() {
    console.log("a");
    b();
}
function b() {
    console.log("a");
    c();
}
function c() {
    console.log("a");
}
a();
