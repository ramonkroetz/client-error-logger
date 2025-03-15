type LoggerConfig = {
    /** Enable debug mode */
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

/** Configure logger instance */
declare function configure(newConfig: Partial<LoggerConfig>): void;
/** Log error passing a given error type and info object */
declare function logError(errorType: string, extraInfo?: object): Promise<void>;

export { configure, logError };
