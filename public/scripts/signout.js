document.querySelector("#signout").addEventListener("click", async () => {
  try {
    const token = localStorage.getItem("token");
    const otps = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("/api/sessions/signout", otps);
    response = await response.json();
    if (response.statusCode === 200) {
      alert(response.message);
      localStorage.removeItem("token");
      location.replace("/");
    } else {
      alert("No estas en una sesion activa");
    }
  } catch (error) {
    console.log(error);
  }
});
