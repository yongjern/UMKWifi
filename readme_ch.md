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

## 安装方法

1. 下载或保留完整的项目文件夹。
2. 在 Chrome 地址栏打开 `chrome://extensions`。
3. 打开右上角的 **开发者模式（Developer mode）**。
4. 点击 **加载已解压的扩展程序（Load unpacked）**。
5. 选择本项目文件夹 `umkwifi-local`。
6. 安装完成后，可在 Chrome 扩展菜单中固定 **UMKWifi**。

> 不要只选择 `icons` 文件夹；需要选择包含 `manifest.json` 的项目根目录。

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