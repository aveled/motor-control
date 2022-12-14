// #region imports
    // #region libraries
    import {
        THEME_NAMES,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



// #region module
export const SELECT_MOTOR = 'select a motor';


export const themeNames = Object.keys(THEME_NAMES).filter(value => value !== 'generated');


export const languages = {
    'english': {
        selectMotor: 'select a motor',
        start: 'START',
        stop: 'STOP',
        reverse: 'reverse',
        left: 'left',
        right: 'right',
        speed: 'speed',
        motors: 'motors',
        settings: 'settings',
        language: 'language',
        theme: 'theme',
        token: 'token',
        restart: 'RESTART',
    },
    'français': {
        selectMotor: 'sélectionner un moteur',
        start: 'DÉBUT',
        stop: 'ARRÊT',
        reverse: 'inverse',
        left: 'à gauche',
        right: 'à droite',
        speed: 'la rapidité',
        motors: 'moteurs',
        settings: 'réglages',
        language: 'langue',
        theme: 'thème',
        token: 'jeton',
        restart: 'REDÉMARRER',
    },
    'deutsch': {
        selectMotor: 'motor auswählen',
        start: 'ANFANG',
        stop: 'PAUSE',
        reverse: 'umkehren',
        left: 'links',
        right: 'rechts',
        speed: 'geschwindigkeit',
        motors: 'motoren',
        settings: 'einstellungen',
        language: 'sprache',
        theme: 'thema',
        token: 'zeichen',
        restart: 'NEU STARTEN',
    },
    'română': {
        selectMotor: 'selectare motor',
        start: 'START',
        stop: 'STOP',
        reverse: 'invers',
        left: 'stânga',
        right: 'dreapta',
        speed: 'viteză',
        motors: 'motoare',
        settings: 'setări',
        language: 'limbă',
        theme: 'temă',
        token: 'jeton',
        restart: 'RESTART',
    },
    '中国人': {
        selectMotor: '选择电机',
        start: '开始',
        stop: '停止',
        reverse: '撤销',
        left: '剩下',
        right: '正确的',
        speed: '速度',
        motors: '马达',
        settings: '设置',
        language: '语',
        theme: '主题',
        token: '令牌',
        restart: '重新开始',
    },
    '日本': {
        selectMotor: 'モーターを選ぶ',
        start: '始める',
        stop: '止まる',
        reverse: '逆行する',
        left: '左',
        right: '右',
        speed: '速度',
        motors: 'モーター',
        settings: '設定',
        language: '言語',
        theme: 'テーマ',
        token: 'トークン',
        restart: '再起動',
    },
    'हिन्दी': {
        selectMotor: 'एक मोटर चुनें',
        start: 'प्रारंभ',
        stop: 'विराम',
        reverse: 'उल्टा',
        left: 'बाएं',
        right: 'सही',
        speed: 'रफ़्तार',
        motors: 'मोटर्स',
        settings: 'समायोजन',
        language: 'भाषा',
        theme: 'थीम',
        token: 'टोकन',
        restart: 'पुनर्प्रारंभ करें',
    },
};


export const languageMap = {
    'english': 'english' as const,
    'french': 'français' as const,
    'german': 'deutsch' as const,
    'romanian': 'română' as const,
    'chinese': '中国人' as const,
    'japanese': '日本' as const,
    'hindi': 'हिन्दी' as const,
};
// #endregion module
