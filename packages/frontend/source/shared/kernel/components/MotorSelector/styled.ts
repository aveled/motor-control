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
    display: flex;
    gap: 0.5rem;
    place-content: center;
    align-items: center;
`;


export interface IStyledMotorSign {
    theme: Theme;
}

export const StyledMotorSign = styled.div<IStyledMotorSign>`
    font-size: 1.4rem;
    user-select: none;
    filter: ${
        ({
            theme,
        }) => theme.type === 'dark'
            ? 'grayscale(100%)'
            : 'grayscale(100%) invert(1)'
    };
`;
// #region module
