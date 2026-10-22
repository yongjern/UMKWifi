# UMKWifi

UMKWifi is a Manifest V3 Chrome extension that automatically fills in your credentials and submits the login form when a supported campus Wi-Fi portal opens.

## Supported Login Pages

The extension currently supports the following paths:

- `http://1.1.1.2/webAuth/*`
- `*://*/webAuth/*`
- `http://1.1.1.2/ac_portal/*`
- `*://*/ac_portal/*`
- `http://1.1.1.2/homepage/*`
- `*://*/homepage/*`

For example:

```text
http://1.1.1.2/homepage/login.html
```

## Installation

1. Download or keep the complete project folder.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** in the upper-right corner.
4. Click **Load unpacked**.
5. Select the `umkwifi-local` project folder.
6. After installation, you can pin **UMKWifi** from Chrome's Extensions menu.

> Do not select only the `icons` folder. Select the project root containing `manifest.json`.

## Usage

1. Click the **UMKWifi** icon in the Chrome toolbar.
2. Enter your campus account or matric number in **Matric No**.
3. Enter your campus account password in **Password**.
4. Select **Log in automatically when the portal opens**.
5. Click **Save credentials**.
6. Connect to the campus Wi-Fi network.
7. Wait for the login portal to open automatically, or visit the campus login address manually.
8. When the extension detects a supported page, it fills in your credentials and activates the page's original login button.

Each time a supported login page is reloaded, the extension fills in the credentials again and makes one login attempt.

## Disabling Automatic Login

1. Click the extension icon to open its settings.
2. Clear **Log in automatically when the portal opens**.
3. Click **Save credentials**.

Your credentials remain stored locally, but the extension will not submit the login form automatically.

## Updating the Extension

After modifying the project files:

1. Open `chrome://extensions`.
2. Find **UMKWifi**.
3. Click **Reload**.
4. Reopen the login page to test the changes.

## Project Files

```text
umkwifi-local/
├── manifest.json       # Extension settings, permissions, and URL match rules
├── popup.html          # Extension settings interface
├── popup.js            # Saves and loads login credentials
├── content.js          # Detects, fills, and submits login pages
├── readme.md           # Usage instructions
└── icons/
    ├── logo.svg        # Logo displayed inside the popup
    └── logo_128.png    # Chrome extension icon
```

## Privacy and Security

- Credentials are stored in `chrome.storage.local` within the current Chrome profile.
- The extension does not intentionally send credentials to third-party services.
- `chrome.storage.local` is not a dedicated password vault. Use the extension only on a trusted personal device.
- If the login portal uses HTTP instead of HTTPS, credential transmission is not protected by HTTPS encryption.
- Do not share a Chrome profile containing your personal credentials with other people.

## Troubleshooting

### The Page Opens but Does Not Log In Automatically

Check the following:

1. Your account and password have been saved in the extension popup.
2. The automatic login option is enabled.
3. The current URL uses a supported `/webAuth/`, `/ac_portal/`, or `/homepage/` path.
4. The extension was reloaded after its files were modified.
5. The login portal has not changed its input fields or login button structure.

### Changing the Account or Password

Open the extension popup again, enter the new credentials, and click **Save credentials**. The previously saved credentials will be replaced.

### Deleting Saved Credentials

You can overwrite the credentials in the extension popup or remove the extension from `chrome://extensions`. Removing the extension also removes its local storage data.