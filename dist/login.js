"use strict";
const formLogin = document.querySelector(".form-login");
const inputName = document.querySelector("#loginName");
const regex = /^(?=\S)(?!_)(?!.*[^\w\s]).+$/;
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginName = inputName.value;
    if (!regex.test(loginName)) {
        alert("Tên người dùng không hợp lệ");
        return;
    }
    localStorage.setItem("player_name", loginName);
    window.location = "/pages/game.html";
});
