import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' // ensures singleton across the app
})
export class LoggerService {
    log(message: string, ...optionalParams: any[]): void {
        console.log('[LOG]', message, ...optionalParams);
    }

    info(message: string, ...optionalParams: any[]): void {
        console.info('[INFO]', message, ...optionalParams);
    }

    warn(message: string, ...optionalParams: any[]): void {
        console.warn('[WARN]', message, ...optionalParams);
    }

    error(message: string, ...optionalParams: any[]): void {
        console.error('[ERROR]', message, ...optionalParams);
    }
}
