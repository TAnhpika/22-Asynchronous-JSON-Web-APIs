console.log(1);

// việc gọi callback của .then .catch .finally chạy bất đồng bộ
// khi nhận hàm -> đưa vào list bất đồng bộ r chạy tiếp
// khi chạy xong hết thì mới check list và chạy cấc hàm async
Promise.resolve().finally(() => {
    console.log(2);
});

console.log(3);
