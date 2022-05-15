const token = sessionStorage.getItem("userToken");

if (!token) {
  location.replace("login.html");
}

const logoutBtn = document.querySelector(".logout");

logoutBtn.addEventListener("click", (ev) => {
  if (sessionStorage.getItem("userToken")) {
    sessionStorage.removeItem("userToken");
    location.href = "login.html";
  }
});
