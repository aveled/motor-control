// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledMotorSelector {
    theme: Theme;
}

export const StyledMotorSelector = styled.div<IStyledMotorSelector>`
    display: grid;
    place-content: center;
`;
// #region module
