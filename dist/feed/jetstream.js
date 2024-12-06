"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetstreamSubscription = void 0;
const websocketClient_1 = __importDefault(require("../util/websocketClient"));
class JetstreamSubscription extends websocketClient_1.default {
    constructor(service, interval, onMessageCallback) {
        super({ url: service, reconnectInterval: interval });
        this.service = service;
        this.interval = interval;
        this.onMessageCallback = onMessageCallback;
    }
    onOpen() {
        console.log('Connected to Jetstream server.');
    }
    onMessage(data) {
        if (this.onMessageCallback) {
            this.onMessageCallback(data);
        }
    }
    onError(error) {
        console.error('Jetstream encountered an error:', error);
    }
    onClose() {
        console.log('Jetstream connection closed.');
    }
}
exports.JetstreamSubscription = JetstreamSubscription;
