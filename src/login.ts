const formLogin = document.querySelector(".form-login") as HTMLFormElement;
const inputName = document.querySelector("#loginName") as HTMLInputElement;
const regex = /^(?=\S)(?!_)(?!.*[^\w\s]).+$/;
formLogin.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const loginName = inputName.value;
  if (!regex.test(loginName)) {
    alert("Tên người dùng không hợp lệ");
    return;
  }
  localStorage.setItem("player_name", loginName);
  window.location = "/pages/game.html" as Location | (string & Location);
});
