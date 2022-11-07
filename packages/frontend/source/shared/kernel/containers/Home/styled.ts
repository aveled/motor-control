// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



// #region module
export interface IStyledHome {
    theme: Theme;
}

export const StyledHome = styled.div<IStyledHome>`
    height: 100%;
    background-color: ${
        ({
            theme
        }: IStyledHome) => theme.backgroundColorPrimary
    };
    display: grid;
    place-content: center;
    overflow: scroll;
    padding: 2rem;
`;


export const StyledBranding = styled.div`
    display: grid;
    place-content: center;
    text-align: center;

    h1 {
        margin-top: 4rem;
        margin-bottom: 2rem;
    }

    img {
        width: 150px;
        margin: 0 auto;
        margin-bottom: 4rem;
    }
`;
// #endregion module
