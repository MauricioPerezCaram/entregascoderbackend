document.querySelector("#signout").addEventListener("click", async () => {
  try {
    const token = localStorage.getItem("token");
    const otps = {
      method: "POST",
      headers: { "Content-Type": "application/json", token },
    };
    let response = await fetch("/api/sessions/signout", otps);
    response = await response.json();
    alert(response.message);
    if (response.statusCode === 200) {
      localStorage.removeItem("token");
      location.replace("/");
    }
  } catch (error) {
    console.log(error);
  }
});
