// setTimeout 0 chỉ in ra ngay lập tức khi callstack rãnh

// setTimeout(() => {
//     console.log("Done!");
// }, 0);

// block callstack
// block rendering
for (let i = 0; i < 300000; i++) {
    console.log(i);
}
