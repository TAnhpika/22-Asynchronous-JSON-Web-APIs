/**
 * JS bản chất là đồng bộ
 * -> để chạy bất đồng bộ cần có sự hỗ trợ của môi trường thực thi (JS runtime: trình duyệt / NodeJS) 
 * -> cung cấp cá thành phần / kn để hỗ trợ   
 * 1. API: Web APIs (Trình duyệt) / Node APIs (NodeJs)
 * - Web APIs: 
 *      + DOM APIs: DOM, DOM Event
 *      + Media APIs: console, alert, from, confirm ... 
 *      + Network API: fetch, xhr
 *      + Timer API: setTimeOut, setInterval
 * - (bản chất JS engine chỉ có các khái niệm cốt lõi: hàm, biến, kiểu dữ liệu, if else, switch case, loop, context, this ...)
 * - Node sẽ k có DOM ... vì nó là backend ở server, k phải trình duyệt 
 * 
 * khi dùng các API thì Web APIs sẽ xử lý -> done -> đẩy callback xún Task queue
 * (mỗi cv async đều có 1 callback)
 * 2. Task Queues: 
 * - callback đc đưa xún đề chờ đc xử lý
 * - First In - First out (nhân viên sẽ bán cho người tới trc mua trc)
 * 3. Event loop (nhân viên): 
 * - vòng lặp chạy liên tục
 * - check call stack rảnh k (xử lý hết task, chỉ còn global exe context)
 * nếu rảnh sẽ lấy 1 cv ở đầu hàng ở task queues để xử lý
 * 
 * Lý do trình duyệt tạo ra cơ chế async:
 * - trình duyệt xử lý các cv liên quan đến giao diện người dùng
 * - khi xử lý các cv mất tg như setTimeOut, fetch, xhr -> block call stack -> block rendering (bấm nút nhưng k xử lý j cả)
 * - đẩy sang web API hỗ trợ xử lý đa luồng (chạy task đồng thời) -> tối ưu tg chờ
 */
console.log(1);
setTimeout(() => {
    console.log(2);
}, 0);
setTimeout(() => {
    console.log(3);
}, 1000);
setTimeout(() => {
    console.log(4);
}, 0);
console.log(5);
