# UMKWifi

UMKWifi 是一个基于 Manifest V3 的 Chrome 扩展，可在打开受支持的校园 Wi-Fi 登录页面时，自动填写账号和密码并提交登录。

## 支持的登录页面

扩展目前支持以下路径：

- `http://1.1.1.2/webAuth/*`
- `*://*/webAuth/*`
- `http://1.1.1.2/ac_portal/*`
- `*://*/ac_portal/*`
- `http://1.1.1.2/homepage/*`
- `*://*/homepage/*`

例如：

```text
http://1.1.1.2/homepage/login.html
```

## 从 GitHub Release 安装

1. 打开本项目在 GitHub 上的 **Releases** 页面。
2. 打开最新版本，并在 **Assets** 区域下载 ZIP 文件。
3. 将下载的 ZIP 文件解压到一个固定文件夹。不要直接在 ZIP 压缩包内运行扩展。
4. 打开浏览器的扩展管理页面：
   - Chrome：`chrome://extensions`
   - Microsoft Edge：`edge://extensions`
5. 开启 **开发者模式（Developer mode）**。
6. 点击 **加载已解压的扩展程序（Load unpacked）**。
7. 选择解压后直接包含 `manifest.json` 的文件夹。
8. 安装完成后，可从浏览器的扩展菜单固定 **UMKWifi**。

> 不要选择 ZIP 文件、ZIP 的上层文件夹或单独的 `icons` 文件夹。请选择打开后可直接看到 `manifest.json` 的解压文件夹。

## 从源代码安装

1. 下载源代码或克隆项目仓库。
2. 在 Chrome 打开 `chrome://extensions`，或在 Microsoft Edge 打开 `edge://extensions`。
3. 开启 **开发者模式（Developer mode）**。
4. 点击 **加载已解压的扩展程序（Load unpacked）**。
5. 选择包含 `manifest.json` 的项目根目录。
6. 安装完成后，可从浏览器的扩展菜单固定 **UMKWifi**。

## 使用方法

1. 点击 Chrome 工具栏中的 **UMKWifi** 图标。
2. 在 **Matric No** 输入校园账号或学号。
3. 在 **Password** 输入校园账号密码。
4. 勾选 **Log in automatically when the portal opens**。
5. 点击 **Save credentials** 保存设置。
6. 连接校园 Wi-Fi。
7. 等待系统自动打开登录页面，或手动访问校园登录地址。
8. 扩展检测到受支持的页面后，会自动填写账号和密码，并调用页面原本的登录按钮。

每次重新载入受支持的登录页面，扩展都会重新填写资料并尝试登录一次。

## 关闭自动登录

1. 点击扩展图标打开设置。
2. 取消勾选 **Log in automatically when the portal opens**。
3. 点击 **Save credentials**。

账号和密码仍会保存在本机，但扩展不会自动提交登录。

## 更新扩展

修改项目文件后：

1. 打开 `chrome://extensions`。
2. 找到 **UMKWifi**。
3. 点击 **重新加载（Reload）**。
4. 重新打开登录页面进行测试。

## 项目文件

```text
umkwifi-local/
├── manifest.json       # 扩展配置、权限与页面匹配规则
├── popup.html          # 扩展设置界面
├── popup.js            # 保存和读取登录资料
├── content.js          # 自动识别、填写和提交登录页面
├── readme.md           # 使用说明
└── icons/
    ├── logo.svg        # 弹窗内显示的 Logo
    └── logo_128.png    # Chrome 扩展图标
```

## 隐私与安全

- 登录资料保存在当前 Chrome 用户配置中的 `chrome.storage.local`。
- 扩展不会主动将登录资料发送到第三方服务。
- `chrome.storage.local` 不是独立的密码保险库，请只在可信任的个人设备上使用。
- 如果登录页面使用 HTTP 而不是 HTTPS，资料传输不会受到 HTTPS 加密保护。
- 请不要将包含个人账号资料的 Chrome 用户配置分享给其他人。

## 常见问题

### 页面打开后没有自动登录

请检查：

1. 是否已在扩展弹窗中保存账号和密码。
2. 是否勾选自动登录选项。
3. 当前网址是否属于支持的 `/webAuth/`、`/ac_portal/` 或 `/homepage/` 路径。
4. 是否在修改文件后重新加载扩展。
5. 登录页面是否已经更改字段或按钮结构。

### 修改账号或密码

重新打开扩展弹窗，输入新资料并点击 **Save credentials**，原有资料会被覆盖。

### 删除已保存的资料

目前可以在扩展弹窗中覆盖资料，或在 `chrome://extensions` 删除扩展。删除扩展时，其本地存储资料也会一并移除。