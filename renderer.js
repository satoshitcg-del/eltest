async function loadToken() {
  const tokenEl = document.getElementById("token");
  const formEl = document.getElementById("token-form");
  const inputEl = document.getElementById("token-input");
  if (!window.tokenAPI) {
    tokenEl.textContent = "tokenAPI not available";
    return;
  }

  const token = await window.tokenAPI.getToken();
  if (token) {
    tokenEl.textContent = token;
    formEl.classList.add("hidden");
  } else {
    tokenEl.textContent = "(no token)";
    formEl.classList.remove("hidden");
    inputEl.focus();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const formEl = document.getElementById("token-form");
  const inputEl = document.getElementById("token-input");
  const tokenEl = document.getElementById("token");

  formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    const token = inputEl.value.trim();
    if (!token) {
      tokenEl.textContent = "(no token)";
      return;
    }
    await window.tokenAPI.setToken(token);
    tokenEl.textContent = token;
    formEl.classList.add("hidden");
  });

  loadToken().catch((err) => {
    const tokenEl = document.getElementById("token");
    tokenEl.textContent = `Error: ${err?.message || err}`;
  });
});
