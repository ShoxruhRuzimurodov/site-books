'use strict';

// Email about
{
  const elForm = document.querySelector(".form-box")
  const elEmailInput = document.querySelector(".email_input");
  const elPasswordInput = document.querySelector(".password_input");

  elForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const emailnameInputValue = elEmailInput.value;
    const passwordnameInputValue = elPasswordInput.value;

    fetch("https://reqres.in/api/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailnameInputValue,
        password: passwordnameInputValue
      }),
    }).then((res) => res.json()).then((data) => {
      if (data?.token) {
        window.localStorage.setItem("token", data.token);
        window.location.replace("index.html")
      } else {
        alert("login yoki parol noto'g'ri");
      }
    });
  });
}

