const token = sessionStorage.getItem('userToken');

if (token) {
  location.href = 'patients.html';
}

const form = document.forms.login_form;

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  userDetails = {
    name: form.children[0].children[1].value,
    email: form.children[2].children[1].value,
    password: form.children[3].children[1].value,
  };

  const res = await fetch(
    'https://lemon-circular-eucalyptus.glitch.me/user/register',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
  );
  const data = await res.json();
  if (data.msg === 'User created') {
    alert('User created');
  }

  if (data.msg === 'User already exists') {
    alert('User already exists');
  }
  console.log(data);
});
