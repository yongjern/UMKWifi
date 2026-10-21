const form = document.querySelector("#credentials-form");
const matricInput = document.querySelector("#matric");
const passwordInput = document.querySelector("#password");
const autoLoginInput = document.querySelector("#auto-login");
const status = document.querySelector("#status");

async function loadSettings() {
  const settings = await chrome.storage.local.get({
    matric: "",
    password: "",
    autoLogin: true
  });

  matricInput.value = settings.matric;
  passwordInput.value = settings.password;
  autoLoginInput.checked = settings.autoLogin;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await chrome.storage.local.set({
    matric: matricInput.value.trim(),
    password: passwordInput.value,
    autoLogin: autoLoginInput.checked
  });

  status.textContent = "Credentials saved locally.";
  window.setTimeout(() => {
    status.textContent = "";
  }, 2000);
});

loadSettings().catch(() => {
  status.textContent = "Could not load saved credentials.";
});
