import WebSocket from 'ws';
import { Logger } from './logger';

interface WebSocketClientOptions {
    url: string;
    reconnectInterval?: number;
    pingInterval?: number; // Für Heartbeats
}

class WebSocketClient {
    private url: string;
    private reconnectInterval: number;
    private pingInterval: number;
    private ws: WebSocket | null = null;
    private pingTimeout: NodeJS.Timeout | null = null;

    constructor(options: WebSocketClientOptions) {
        this.url = options.url;
        this.reconnectInterval = options.reconnectInterval || 5000;
        this.pingInterval = options.pingInterval || 10000; // Standard: 10 Sekunden
        this.run();
    }

    private run() {
        this.ws = new WebSocket(this.url);

        this.ws.on('open', () => {
            Logger.info('WebSocket connected');
            this.startHeartbeat();
            this.onOpen();
        });

        this.ws.on('message', (data: WebSocket.Data) => {
            this.onMessage(data);
        });

        this.ws.on('error', (error) => {
            Logger.error('WebSocket error:', error);
            this.onError(error);
        });

        this.ws.on('close', (permanently?: boolean) => {
            Logger.info('WebSocket disconnected');
            this.stopHeartbeat();
            this.onClose();
            if(!permanently) {
                this.reconnect(); 
            }
        });
    }

    private reconnect() {
        if (this.ws) {
            this.ws.removeAllListeners(); // Alte Listener entfernen
            this.ws = null;
        }

        setTimeout(() => this.run(), this.reconnectInterval);
    }

    private startHeartbeat() {
        this.pingTimeout = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.ping(); // Heartbeat senden
            }
        }, this.pingInterval);
    }

    private stopHeartbeat() {
        if (this.pingTimeout) {
            clearInterval(this.pingTimeout);
            this.pingTimeout = null;
        }
    }

    protected onOpen() {
        // Benutzerdefinierte Logik für Verbindungseröffnung
    }

    protected onMessage(data: WebSocket.Data) {
        // Benutzerdefinierte Logik für empfangene Nachrichten
    }

    protected onError(error: Error) {
        // Benutzerdefinierte Fehlerbehandlung
    }

    protected onClose() {
        // Benutzerdefinierte Logik für Verbindungsabbruch
    }

    public send(data: any) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data);
        }
    }

    public close(permanently = false) {
        if (this.ws) {
            this.ws.close(permanently);
        }
    }
}

export default WebSocketClient;