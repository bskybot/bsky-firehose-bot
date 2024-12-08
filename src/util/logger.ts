export class Logger {
    static info(message: string, context?: object | string) {
        console.log(`${new Date().toLocaleString()} [INFO]: ${message}`, context || '');
    }
    static warn(message: string, context?: object | string) {
        console.log(`${new Date().toLocaleString()} [WARNING]: ${message}`, context || '');
    }
    static error(message: string, context?: object | string) {
        console.error(`${new Date().toLocaleString()} [ERROR]: ${message}`, context || '');
    }
    static debug(message: string, context?: object | string) {
        console.debug(`${new Date().toLocaleString()} [DEBUG]: ${message}`, context || '');
    }
}