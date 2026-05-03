/**
 * Execution Context (Ngữ cảnh thực thi): Quản lý biến, hàm thuộc context của nó. Gồm cả hoisting & xđ this tham chiếu về đâu 
 * 1. Global Execution Context (chỉ 1 cái đc tạo khi chạy JS)
 * - Mỗi lần mở 1 tab trình duyệt sẽ tạo 1 cái. Khi nào đóng tab mới xóa
 * - Nodejs: khi dùng lệnh node để thực thi JS -> tạo 1 cái cho đến khi thực hiện xong thì mới xóa khỏi bộ nhớ
 * - chỉ cần k nằm trong 1 hàm thì thuộc GEC
 * 2. Function Execution Context
 * - Sinh ra khi 1 hàm đc gọi
 * - cùng 1 hàm nhưng mỗi lần sẽ tạo ra 1 FEC khác nhau
 * - sau ngay khi chạy xong hàm
 */

// Execution Context (Ngữ cảnh thực thi)

// 1. Global Execution Context
var firstName = "Son";
let lastName = "Dang";
const age = 18;

function add(a, b) {
    const sum = a + b;
    return sum;
}

{
    let address = "Hanoi, Vietnam";
}

// 2. Function Execution Context
const result1 = add(1, 2); // Function Execution Context #1
const result2 = add(2, 3); // Function Execution Context #2
const result3 = add(3, 4); // Function Execution Context #3
