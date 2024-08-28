const b = [1,2,3,4,5,6,7,8,9,10];

for( let i = 0; i < 10 ;i++) {
    setTimeout(() => console.log(b[i], 1000));
}

for (var i = 0; i < 10; i++) {
    setTimeout(function(i) {
        console.log(b[i], 1000)
    },1000, i);
}