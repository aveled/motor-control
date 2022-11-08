// #region imports
    // #region libraries
    import {
        createGlobalStyle,
    } from 'styled-components';


    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



// #region module
export interface IGlobalStyle {
    theme: Theme;
}

export const GlobalStyle = createGlobalStyle<IGlobalStyle>`
    *, *::after, *::before {
        box-sizing: border-box;
    }

    html {
        height: 100%;
    }

    body {
        height: 100%;
        overflow: hidden;
        margin: 0;
        padding: 0;
        font-family: ${
            ({
                theme,
            }: IGlobalStyle) => theme.fontFamilySansSerif
        };
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: ${
            ({
                theme,
            }: IGlobalStyle) => theme.colorPrimary
        };
        background: ${
            ({
                theme,
            }: IGlobalStyle) => theme.backgroundColorPrimary
        };
    }

    a {
        color: hsl(220,10%,60%);
        text-decoration: none;
    }

    #plurid-app {
        height: 100%;
        overflow: auto;
    }
`;
// #endregion module
