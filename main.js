const button = document.querySelector("#button");

/**
 * xử lý DOM events:
 * là 1 hành vi gọi hàm vs 2 đối só (event & callback)
 * -> callstack -> Web APIs (lắng nghe bên Web APIs)
 * mỗi khi click vào btn -> Web APIs đẩy callback xún macro task
 * khi callstack rãnh callback sẽ đc đưa lên và thực thi
 */
button.addEventListener("click", () => {
    console.log("Clicked!");
});
