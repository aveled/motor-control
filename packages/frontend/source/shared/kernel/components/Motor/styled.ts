// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledMotor {
    theme: Theme;
}

export const StyledMotor = styled.div<IStyledMotor>`
`;


export const StyledControls = styled.div`
    display: grid;
    place-content: center;
    gap: 1.5rem;
`;


export const StyledLeftRight = styled.div`
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    justify-content: center;

    @media (max-width: 900px) {
        width: 240px;
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;
    }
`;


export const StyledText = styled.div`
    font-size: 1.4rem;
`;
// #region module
