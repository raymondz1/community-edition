// React imports
import React, { useState } from 'react';

// Library imports
import _ from 'lodash';

// App imports
import StepWizard from 'react-step-wizard';
import styled from 'styled-components';
import { STATUS } from '../../constants/App.constants';
import StepNav from './StepNav';

const WizardContainer = styled.div`
    border: 1px solid #0f171c;
    border-top: none;
    overflow: hidden;
    width: 800px;
`;

function Wizard(props: any) {
    const { tabNames, children } = props;
    const [tabStatus, setTabStatus] = useState([
        STATUS.CURRENT,
        ..._.times(children.length - 1, () => STATUS.DISABLED),
    ]);

    const submitForm = (data: any) => {
        console.log('form submitted', data);
    };

    return (
        <WizardContainer>
            <StepWizard
                initialStep={1}
                nav={
                    <StepNav
                        tabStatus={tabStatus}
                        tabNames={tabNames}
                        numberOfChildren={children.length}
                    />
                }
            >
                {props.children.map((child: any, index: number) =>
                    React.cloneElement(child, {
                        tabStatus,
                        setTabStatus,
                        key: index,
                        submitForm,
                    })
                )}
            </StepWizard>
        </WizardContainer>
    );
}

export default Wizard;
