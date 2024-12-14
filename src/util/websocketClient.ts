import WebSocket from 'ws';
import { Logger } from './logger';

interface WebSocketClientOptions {
    /** The URL of the WebSocket server to connect to. */
    url: string;
    /** The interval in milliseconds to wait before attempting to reconnect when the connection closes. Default is 5000ms. */
    reconnectInterval?: number;
    /** The interval in milliseconds for sending ping messages (heartbeats) to keep the connection alive. Default is 10000ms. */
    pingInterval?: number;
}

/**
 * A WebSocket client that automatically attempts to reconnect upon disconnection
 * and periodically sends ping messages (heartbeats) to ensure the connection remains alive.
 * 
 * Extend this class and override the protected `onOpen`, `onMessage`, `onError`, and `onClose` methods
 * to implement custom handling of WebSocket events.
 */
class WebSocketClient {
    private url: string;
    private reconnectInterval: number;
    private pingInterval: number;
    private ws: WebSocket | null = null;
    private pingTimeout: NodeJS.Timeout | null = null;

    /**
     * Creates a new instance of `WebSocketClient`.
     * 
     * @param options - Configuration options for the WebSocket client, including URL, reconnect interval, and ping interval.
     */
    constructor(options: WebSocketClientOptions) {
        this.url = options.url;
        this.reconnectInterval = options.reconnectInterval || 5000;
        this.pingInterval = options.pingInterval || 10000; 
        this.run();
    }

    /**
     * Initiates a WebSocket connection to the specified URL.
     * 
     * This method sets up event listeners for `open`, `message`, `error`, and `close` events.
     * When the connection opens, it starts the heartbeat mechanism.
     * On close, it attempts to reconnect after a specified interval.
     */
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

        this.ws.on('close', () => {
            Logger.info('WebSocket disconnected');
            this.stopHeartbeat();
            this.onClose();
            this.reconnect();
        });
    }

    /**
     * Attempts to reconnect to the WebSocket server after the specified `reconnectInterval`.
     * It clears all event listeners on the old WebSocket and initiates a new connection.
     */
    private reconnect() {
        if (this.ws) {
            this.ws.removeAllListeners();
            this.ws = null;
        }

        setTimeout(() => this.run(), this.reconnectInterval);
    }

    /**
     * Starts sending periodic ping messages to the server.
     * 
     * This function uses `setInterval` to send a ping at the configured `pingInterval`.
     * If the WebSocket is not open, pings are not sent.
     */
    private startHeartbeat() {
        this.pingTimeout = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.ping(); 
            }
        }, this.pingInterval);
    }

    /**
     * Stops sending heartbeat pings by clearing the ping interval.
     */
    private stopHeartbeat() {
        if (this.pingTimeout) {
            clearInterval(this.pingTimeout);
            this.pingTimeout = null;
        }
    }

    /**
     * Called when the WebSocket connection is successfully opened.
     * 
     * Override this method in a subclass to implement custom logic on connection.
     */
    protected onOpen() {
        // Custom logic for connection open
    }

    /**
     * Called when a WebSocket message is received.
     * 
     * @param data - The data received from the WebSocket server.
     * 
     * Override this method in a subclass to implement custom message handling.
     */
    protected onMessage(data: WebSocket.Data) {
        // Custom logic for handling received messages
    }

    /**
     * Called when a WebSocket error occurs.
     * 
     * @param error - The error that occurred.
     * 
     * Override this method in a subclass to implement custom error handling.
     */
    protected onError(error: Error) {
        // Custom logic for handling errors
    }

    /**
     * Called when the WebSocket connection is closed.
     * 
     * Override this method in a subclass to implement custom logic on disconnection.
     */
    protected onClose() {
        // Custom logic for handling connection close
    }

    /**
     * Sends data to the connected WebSocket server, if the connection is open.
     * 
     * @param data - The data to send.
     */
    public send(data: any) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data);
        }
    }

    /**
     * Closes the WebSocket connection gracefully.
     */
    public close() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

export default WebSocketClient;