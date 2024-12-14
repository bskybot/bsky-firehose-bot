import WebSocket from 'ws';
import WebSocketClient from '../util/websocketClient';
import { Logger } from '../util/logger';

/**
 * Represents a subscription to a Jetstream feed over WebSocket.
 * 
 * This class extends `WebSocketClient` to automatically handle reconnections and heartbeats.
 * It invokes a provided callback function whenever a message is received from the Jetstream server.
 */
export class JetstreamSubscription extends WebSocketClient {
    /**
     * Creates a new `JetstreamSubscription`.
     * 
     * @param service - The URL of the Jetstream server to connect to.
     * @param interval - The interval (in milliseconds) for reconnect attempts.
     * @param onMessageCallback - An optional callback function that is invoked whenever a message is received from the server.
     */
    constructor(
        public service: string,
        public interval: number,
        private onMessageCallback?: (data: WebSocket.Data) => void
    ) {
        super({url: service, reconnectInterval: interval});
    }

    /**
     * Called when the WebSocket connection is successfully opened.
     * Logs a message indicating that the connection to the Jetstream server has been established.
     */
    protected onOpen() {
        Logger.info('Connected to Jetstream server.');
    }

    /**
     * Called when a WebSocket message is received.
     * 
     * If an `onMessageCallback` was provided, it is invoked with the received data.
     * 
     * @param data - The data received from the Jetstream server.
     */
    protected onMessage(data: WebSocket.Data) {
        if (this.onMessageCallback) {
            this.onMessageCallback(data);
        }
    }

    /**
     * Called when a WebSocket error occurs.
     * Logs the error message indicating that Jetstream encountered an error.
     * 
     * @param error - The error that occurred.
     */
    protected onError(error: Error) {
        Logger.error('Jetstream encountered an error:', error);
    }

    /**
     * Called when the WebSocket connection is closed.
     * Logs a message indicating that the Jetstream connection has closed.
     */
    protected onClose() {
        Logger.info('Jetstream connection closed.');
    }
}