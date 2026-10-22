This is a new project. HERE is the prompt.
I want to build a Manifest V3 Chrome Extension that automatically detects campus Wi-Fi captive portals matching `http://1.1.1.2/webAuth/*` or `*://*/webAuth/*` and automatically logs me in.

### Portal Technical Details:
- Target URL Pattern: http://1.1.1.2/webAuth/*
- Username/Matric Field ID: une (hidden format target: username)
- Password Field ID: passwd (hidden format target: pwd)
- Special Portal Scripting: The page uses an `onApply()` JS function that replaces spaces with `%20` and transfers inputs to `#username` and `#pwd` before submitting.

### Extension Requirements:
1. `manifest.json`: Target URL pattern `http://1.1.1.2/webAuth/*` and general `/webAuth/*` wildcards using Manifest V3.
2. `popup.html` & `popup.js`: UI to securely store Matric No and Password into `chrome.storage.local`.
3. `content.js`: Detect current portal IP/URL, auto-fill `#une` & `#passwd`, populate the processed `#username` & `#pwd` fields, and trigger the login action automatically.

Please provide complete code files and instructions to run as an unpacked extension.