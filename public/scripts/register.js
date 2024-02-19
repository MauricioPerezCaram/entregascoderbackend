const selector = document.querySelector("#register");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      name: document.querySelector("#name").value,
      photo: document.querySelector("#photo").value,
    };
    // console.log(data);
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/register", opts);
    response = await response.json();
    // console.log(response);
    alert(response.message);
    // response.session && location.replace("/sessions/login");
  } catch (error) {
    alert(error.message);
  }
});
