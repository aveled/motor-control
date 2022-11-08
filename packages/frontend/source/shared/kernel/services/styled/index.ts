// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        universal,
        pluridal,
    } from '@plurid/plurid-ui-components-react';
    // #endregion libraries
// #endregion imports



// #region module
const {
    buttons: {
        PureButton: PluridPureButton,
    },
    inputs: {
        InputLine: PluridInputLine,
        Slider: PluridSlider,
        Dropdown: PluridDropdown,
    },
    markers: {
        Spinner: PluridSpinner,
    },
    form: {
        FormLeftRight: PluridFormLeftRight,
    },
} = universal;

const {
    toolbars: {
        ToolbarGeneral,
    },
} = pluridal;


export const StyledPluridPureButton = styled(PluridPureButton)`
    font-size: 1.3rem;
    padding: 1.4rem;
    margin: 0.5rem 0;
    border-radius: 2rem;
`;


export const StyledPluridFormLeftRight = styled(PluridFormLeftRight)`
    margin-bottom: 2rem;
    font-size: 0.9rem;
    padding: 0 0.8rem;
`;
// #endregion module



// #region exports
export {
    PluridPureButton,
    PluridInputLine,
    PluridSlider,
    PluridDropdown,
    PluridSpinner,
    PluridFormLeftRight,

    ToolbarGeneral,
};
// #endregion exports
