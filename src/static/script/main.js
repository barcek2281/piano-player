const pianoKeys = document.querySelectorAll(".piano__key");

pianoKeys.forEach((key) => {
    key.addEventListener("keydown", ()=>{
        console.log("lol");
    });
    key.addEventListener("keyup", ()=> {
        console.log("kek");
    });
    key.addEventListener("click", ()=>{
        console.log("123");
    })
});