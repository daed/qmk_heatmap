'use strict'

import { app, BrowserWindow, Menu, Tray } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import hid_listen from './hid_listen'
import generateFromData from './pageGenerator'
const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;
let tray;
var isQuitting;
var reportFilename = `${process.cwd()}/data/reportFile.html`;

function createMainWindow() {
  //const window = new BrowserWindow({webPreferences: {nodeIntegration: true}})
  mainWindow = new BrowserWindow({webPreferences: {nodeIntegration: true},
    width: 850,
    height: 450,
    title: "QMK Heatmap",
    icon:'./icon.png'
  });

  mainWindow.on('close', function (event) {
    if(!isQuitting){
        event.preventDefault();
        mainWindow.hide();
    }
    return false;
  });

  if (isDevelopment) {
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(formatUrl({
      pathname: path.join(reportFilename),
      protocol: 'file',
      slashes: true
    }))
  }
  else {
    mainWindow.loadURL(formatUrl({
      pathname: path.join(reportFilename),
      protocol: 'file',
      slashes: true
    }))
  }
  
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.on('devtools-opened', () => {
    mainWindow.focus()
    setImmediate(() => {
      mainWindow.focus()
    })
  });

  tray = new Tray(path.join(__dirname, '..', '..', 'icon.png'));
  tray.on('double-click', () => {
    mainWindow.show();
  });

  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        mainWindow.show();
      }
    },
    {
      label: 'Quit', click: function () {
        isQuitting = true;
        app.quit();
      }
    }
  ]));
  return mainWindow;
}

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})

// Program logic goes here
hid_listen();
