(() => {
  "use strict";

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

  function findPortalElements() {
    const legacyMatricField = document.querySelector("#une");
    const legacyPasswordField = document.querySelector("#passwd");

    if (legacyMatricField && legacyPasswordField) {
      const form = legacyMatricField.form || legacyPasswordField.form || document.querySelector("form");
      return {
        matricField: legacyMatricField,
        passwordField: legacyPasswordField,
        submitControl: findSubmitControl(form),
        form,
        prepare(matric, password) {
          const usernameField = document.querySelector("#username");
          const processedPasswordField = document.querySelector("#pwd");

          if (usernameField) {
            setFieldValue(usernameField, processPortalValue(matric));
          }

          if (processedPasswordField) {
            setFieldValue(processedPasswordField, processPortalValue(password));
          }
        }
      };
    }

    const acPortalMatricField = document.querySelector("#password_name");
    const acPortalPasswordField = document.querySelector("#password_pwd");

    if (acPortalMatricField && acPortalPasswordField) {
      return {
        matricField: acPortalMatricField,
        passwordField: acPortalPasswordField,
        submitControl: document.querySelector("#password_submitBtn"),
        form: acPortalMatricField.form || acPortalPasswordField.form,
        prepare() {}
      };
    }

    return null;
  }

  async function tryLogin() {
    const portal = findPortalElements();
    if (!portal) {
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

    setFieldValue(portal.matricField, matric);
    setFieldValue(portal.passwordField, password);
    portal.prepare(matric, password);

    if (portal.submitControl) {
      portal.submitControl.click();
    } else if (portal.form) {
      portal.form.requestSubmit();
    } else {
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
