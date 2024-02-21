const selector = document.querySelector("#createproduct");
selector.addEventListener("click", async () => {
  try {
    const data = {
      nombre: document.querySelector("#nombre").value,
      foto: document.querySelector("#foto").value,
      precio: document.querySelector("#precio").value,
      stock: document.querySelector("#stock").value,
    };
    // console.log(data);
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/products/new", opts);
    response = await response.json();
    // console.log(response);
    alert(response.message);
    // response.session && location.replace("/sessions/login");
  } catch (error) {
    alert(error.message);
  }
});
