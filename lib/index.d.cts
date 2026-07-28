import { getBrowserId, LoggerConfig } from './helpers';
export { getBrowserId };
/** Configure logger instance */
export declare function configure(newConfig: Partial<LoggerConfig>): void;
/** Log error passing a given error type and info object */
export declare function logError(errorType: string, extraInfo?: object): Promise<void>;
