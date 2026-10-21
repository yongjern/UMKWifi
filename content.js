(() => {
  "use strict";

  const LOGIN_ATTEMPT_KEY = "campus-wifi-auto-login-attempted-at";
  const LOGIN_RETRY_DELAY_MS = 30000;
  const FIELD_WAIT_TIMEOUT_MS = 15000;

  function setFieldValue(field, value) {
    const prototype = field instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
    const valueSetter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;

    if (valueSetter) {
      valueSetter.call(field, value);
    } else {
      field.value = value;
    }

    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function processPortalValue(value) {
    return value.replace(/ /g, "%20");
  }

  function findSubmitControl(form) {
    const onApplyControl = document.querySelector(
      "button[onclick*='onApply'], input[onclick*='onApply'], a[onclick*='onApply']"
    );

    return onApplyControl || form?.querySelector(
      "button[type='submit'], input[type='submit'], button:not([type])"
    );
  }

  async function tryLogin() {
    const previousAttempt = Number(sessionStorage.getItem(LOGIN_ATTEMPT_KEY));
    if (Number.isFinite(previousAttempt) && Date.now() - previousAttempt < LOGIN_RETRY_DELAY_MS) {
      return true;
    }

    const matricField = document.querySelector("#une");
    const passwordField = document.querySelector("#passwd");

    if (!matricField || !passwordField) {
      return false;
    }

    const { matric, password, autoLogin } = await chrome.storage.local.get({
      matric: "",
      password: "",
      autoLogin: true
    });

    if (!autoLogin || !matric || !password) {
      return true;
    }

    setFieldValue(matricField, matric);
    setFieldValue(passwordField, password);

    const usernameField = document.querySelector("#username");
    const processedPasswordField = document.querySelector("#pwd");

    if (usernameField) {
      setFieldValue(usernameField, processPortalValue(matric));
    }

    if (processedPasswordField) {
      setFieldValue(processedPasswordField, processPortalValue(password));
    }

    const form = matricField.form || passwordField.form || document.querySelector("form");
    const submitControl = findSubmitControl(form);

    sessionStorage.setItem(LOGIN_ATTEMPT_KEY, String(Date.now()));

    if (submitControl) {
      submitControl.click();
    } else if (form) {
      form.requestSubmit();
    } else {
      sessionStorage.removeItem(LOGIN_ATTEMPT_KEY);
      console.warn("Campus Wi-Fi Auto Login: no login form or submit control found.");
    }

    return true;
  }

  let finished = false;
  let running = false;

  async function run() {
    if (finished || running) {
      return;
    }

    running = true;
    try {
      finished = await tryLogin();
    } catch (error) {
      finished = true;
      console.error("Campus Wi-Fi Auto Login failed:", error);
    } finally {
      running = false;
    }
  }

  void run();

  const observer = new MutationObserver(() => {
    void run();
    if (finished) {
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), FIELD_WAIT_TIMEOUT_MS);
})();
