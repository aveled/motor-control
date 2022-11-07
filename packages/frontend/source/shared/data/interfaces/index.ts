// #region imports
    // #region external
    import {
        Language,
    } from '~kernel-data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export interface Motor {
    reverse?: boolean;
    frequency?: boolean;
    frequencyRange?: number[];
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
        language?: Language;
    };
    motors: Record<string, Motor>;
}

export interface MotorisConfiguration {
    endpoint: string;
}
// #endregion module
