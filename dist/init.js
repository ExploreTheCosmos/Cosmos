"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importDefault(require("electron"));
const url_1 = __importDefault(require("url"));
const WindowSettings_1 = __importDefault(require("./lib/WindowSettings"));
let settings = new WindowSettings_1.default();
let appCore = electron_1.default.app;
let Window = electron_1.default.BrowserWindow;
let ipcMain = electron_1.default.ipcMain;
let thisWindow = null;
function renderWindow() {
    let options = {
        title: 'Cosmos',
        icon: 'logo.ico',
        backgroundColor: '#000000',
        height: settings.get('WINDOW_HEIGHT', 600),
        width: settings.get('WINDOW_WIDTH', 800),
        x: settings.get('X_POSITION', null),
        y: settings.get('Y_POSITION', null),
        frame: false,
        show: false,
        webPreferences: {
            webaudio: true,
            javascript: true,
            webviewTag: true,
            images: true
        }
    };
    thisWindow = new Window(options);
    // TODO: Make our own Menu in the Future!
    thisWindow.setMenu(null);
    thisWindow.loadURL(url_1.default.format({
        pathname: 'application.html',
        slashes: true,
        protocol: 'file:'
    }));
    thisWindow.on('closed', () => { thisWindow = null; });
    thisWindow.webContents.on('dom-ready', function () {
        if (settings.get('IS_MAXIMIZED', false)) {
            thisWindow.maximize();
            thisWindow.show();
        }
        else if (settings.get('IS_MINIMIZED', false)) {
            thisWindow.minimize();
            thisWindow.show();
        }
        else {
            thisWindow.show();
        }
    });
}
appCore.on('ready', renderWindow);
//# sourceMappingURL=init.js.map