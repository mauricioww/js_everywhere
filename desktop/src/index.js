const { app, BrowserWindow } = require('electron');
const { is, setContentSecurityPolicy } = require('electron-util');
const config = require('./config');

let window;

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false
        }
    });
    // window.loadFile('index.html'); // Static file
    // if(is.development){
        window.loadURL('http://localhost:1234');
    // } else {
        // continue; // Add producion URL
    // }

    if(is.development) {
        window.webContents.openDevTools();
    }

    if(!is.development){
        setContentSecurityPolicy(`
            default-src 'none';
            script-src 'self';
            img-src 'self' https://www.gravatar.com;
            style-src 'self' 'unsafe-inline';
            font-src 'self';
            connect-src 'self' ${config.PRODUCTION_API_URL};
            base-uri 'none';
            form-action 'none';
            frame-ancestors 'none';
        `);
    }

    window.on('closed', () => {
        window = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

// app.on('activate', () => {
//     if(window == null) {
//         createWindow();
//     }
// })