"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
class WebSocketClient {
    constructor(options) {
        this.ws = null;
        this.pingTimeout = null;
        this.url = options.url;
        this.reconnectInterval = options.reconnectInterval || 5000;
        this.pingInterval = options.pingInterval || 10000; // Standard: 10 Sekunden
        this.run();
    }
    run() {
        this.ws = new ws_1.default(this.url);
        this.ws.on('open', () => {
            console.log('WebSocket connected');
            this.startHeartbeat();
            this.onOpen();
        });
        this.ws.on('message', (data) => {
            this.onMessage(data);
        });
        this.ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            this.onError(error);
        });
        this.ws.on('close', () => {
            console.log('WebSocket disconnected');
            this.stopHeartbeat();
            this.onClose();
            this.reconnect();
        });
    }
    reconnect() {
        if (this.ws) {
            this.ws.removeAllListeners(); // Alte Listener entfernen
            this.ws = null;
        }
        setTimeout(() => this.run(), this.reconnectInterval);
    }
    startHeartbeat() {
        this.pingTimeout = setInterval(() => {
            if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
                this.ws.ping(); // Heartbeat senden
            }
        }, this.pingInterval);
    }
    stopHeartbeat() {
        if (this.pingTimeout) {
            clearInterval(this.pingTimeout);
            this.pingTimeout = null;
        }
    }
    onOpen() {
        // Benutzerdefinierte Logik für Verbindungseröffnung
    }
    onMessage(data) {
        // Benutzerdefinierte Logik für empfangene Nachrichten
    }
    onError(error) {
        // Benutzerdefinierte Fehlerbehandlung
    }
    onClose() {
        // Benutzerdefinierte Logik für Verbindungsabbruch
    }
    send(data) {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            this.ws.send(data);
        }
    }
    close() {
        if (this.ws) {
            this.ws.close();
        }
    }
}
exports.default = WebSocketClient;
