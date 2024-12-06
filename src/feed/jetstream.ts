import WebSocket from 'ws';
import WebSocketClient from '../util/websocketClient';

export class JetstreamSubscription extends WebSocketClient {
    constructor(
        public service: string,
        public interval: number,
        private onMessageCallback?: (data: WebSocket.Data) => void
    ) {
        super({url: service, reconnectInterval: interval})
    }

    protected onOpen() {
        console.log('Connected to Jetstream server.');
    }

    protected onMessage(data: WebSocket.Data) {
        if (this.onMessageCallback) {
            this.onMessageCallback(data);
        }
    }

    protected onError(error: Error) {
        console.error('Jetstream encountered an error:', error);
    }

    protected onClose() {
        console.log('Jetstream connection closed.');
    }
}
