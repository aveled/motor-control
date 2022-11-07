// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledSettings {
    theme: Theme;
}

export const StyledSettings = styled.div<IStyledSettings>`
    height: 100%;
    background-color: ${
        ({
            theme
        }: IStyledSettings) => theme.backgroundColorPrimary
    };
    display: grid;
    place-content: center;
    overflow: scroll;
    padding: 2rem;

    h1 {
        text-align: center;
        margin-bottom: 4rem;
    }
`;
// #region module
