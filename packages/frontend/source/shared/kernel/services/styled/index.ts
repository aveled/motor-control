// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        universal,
    } from '@plurid/plurid-ui-components-react';
    // #endregion libraries
// #endregion imports



// #region module
const {
    buttons: {
        PureButton: PluridPureButton,
    },
    inputs: {
        Slider: PluridSlider,
        Dropdown: PluridDropdown,
    },
    markers: {
        Spinner: PluridSpinner,
    },
} = universal;


export const StyledPluridPureButton = styled(PluridPureButton)`
    font-size: 1.4rem;
    padding: 1.4rem;
    margin: 0.5rem 0;
    border-radius: 2rem;
`;
// #endregion module



// #region exports
export {
    PluridPureButton,
    PluridSlider,
    PluridDropdown,
    PluridSpinner,
};
// #endregion exports
