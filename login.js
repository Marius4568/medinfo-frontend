const token = sessionStorage.getItem("userToken");

if (token) {
  location.href = "patients.html";
}

const form = document.forms.login_form;

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  userDetails = {
    email: form.children[0].children[1].value,
    password: form.children[1].children[1].value,
  };

  const res = await fetch(
    "https://lemon-circular-eucalyptus.glitch.me/user/login",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userDetails),
    },
  );
  const data = await res.json();
  if (data.token) {
    sessionStorage.setItem("userToken", data.token);
    location.href = "patients.html";
    console.log(data);
  }
  console.log(data);
});
