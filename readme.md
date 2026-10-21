# Campus Wi-Fi Auto Login

A Manifest V3 Chrome extension that stores one campus account locally and automatically submits compatible captive portals under `/webAuth/`.

## Install

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose this project folder.
5. Pin **Campus Wi-Fi Auto Login** from Chrome's Extensions menu.

## Configure and use

1. Open the extension popup.
2. Enter the Matric No and password.
3. Leave **Log in automatically** enabled and select **Save credentials**.
4. Connect to the campus Wi-Fi and open its captive portal. On a matching `/webAuth/` page, the extension fills `#une` and `#passwd`, copies the portal-processed values to `#username` and `#pwd`, and activates the portal login control.

If Chrome does not redirect to the captive portal automatically, browse to `http://1.1.1.2/webAuth/`.

## Security notes

- Credentials are stored in `chrome.storage.local` in the current Chrome profile. This storage is local but is not a password vault or independently encrypted by this extension.
- The broad `*://*/webAuth/*` permission is required to support portals hosted at changing IP addresses or hostnames. Install this extension only on a trusted Chrome profile and computer.
- Prefer an HTTPS portal when the campus network supports it. Sending credentials to an HTTP portal does not provide transport encryption.
- Disable automatic login from the popup before using an untrusted network with a `/webAuth/` path.

## Update

After editing the files, return to `chrome://extensions` and select the extension's **Reload** button.
