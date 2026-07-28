import { default as Bowser } from 'bowser';
export type LoggerConfig = {
    /** Enable debug mode - DEV */
    debug?: boolean;
    /** Disable logging */
    disable?: boolean;
    /** Log endpoint URL */
    logEndpoint?: string;
    /** Static info that is sent in every log */
    staticInfo?: {
        [key: string]: string;
    };
};
export type LogInfo = {
    errorType: string;
    url: string;
    language: string;
    allLanguages: string[];
    browserInfo: Bowser.Parser.ParsedResult;
    deviceDimensions: string;
    browserId: string;
    localTime: string;
    userPreferences: {
        reducedData: boolean;
        reducedMotion: boolean;
        darkColorScheme: boolean;
        lightColorScheme: boolean;
        moreContrast: boolean;
    };
    extraInfo: {
        [key: string]: unknown;
    };
};
declare global {
    interface Window {
        logConfig: LoggerConfig;
    }
}
export declare function getConfig(): LoggerConfig;
export declare function setConfig(newConfig: LoggerConfig): void;
export declare function resetConfig(): void;
export declare function collectInfo(errorType: string, extraInfo?: object): Promise<LogInfo>;
/** Returns the browser id of the user */
export declare function getBrowserId(): Promise<string>;
