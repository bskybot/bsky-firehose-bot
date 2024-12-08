import WebSocket from 'ws';
import WebSocketClient from '../util/websocketClient';
import { Logger } from '../util/logger';

export class JetstreamSubscription extends WebSocketClient {
    constructor(
        public service: string,
        public interval: number,
        private onMessageCallback?: (data: WebSocket.Data) => void
    ) {
        super({url: service, reconnectInterval: interval})
    }

    protected onOpen() {
        Logger.info('Connected to Jetstream server.');
    }

    protected onMessage(data: WebSocket.Data) {
        if (this.onMessageCallback) {
            this.onMessageCallback(data);
        }
    }

    protected onError(error: Error) {
        Logger.error('Jetstream encountered an error:', error);
    }

    protected onClose() {
        Logger.info('Jetstream connection closed.');
    }
}
