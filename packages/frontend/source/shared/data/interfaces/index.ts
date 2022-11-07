// #region module
export interface Motor {
    reverse?: boolean;
    frequency?: boolean;
    directions?: boolean | {
        duration?: number;
    };
}

export interface MotorisMergedConfiguration {
    endpoint: string;
    meta?: {
        title?: string;
        favicon?: string;
        pageTitle?: string;
        pageIcon?: string;
    };
    motors: Record<string, Motor>;
}

export interface MotorisConfiguration {
    endpoint: string;
}
// #endregion module
