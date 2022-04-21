// React imports
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';

// Library imports
import { CdsButton } from '@cds/react/button';
import { CdsSelect } from '@cds/react/select';
import { CdsIcon } from '@cds/react/icon';
import {
    ClarityIcons,
    refreshIcon,
    connectIcon,
    infoCircleIcon,
} from '@cds/core/icon';
import { CdsRadioGroup, CdsRadio } from '@cds/react/radio';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CdsControlMessage, CdsFormGroup } from '@cds/react/forms';

// App import
import { credentialFormSchema } from './credential.form.schema';
import CredentialProfile from './CredentialProfile';

import CredentialOneTime from './CredentialOneTime';
import { AwsService } from '../../../swagger-api/services/AwsService';
import { VsphereStore } from '../../../state-management/stores/Store.vsphere';
import { INPUT_CHANGE } from '../../../state-management/actions/Form.actions';
import { AWSAccountParams } from '../../../swagger-api/models/AWSAccountParams';
import { STATUS } from '../../../shared/constants/App.constants';
import './Credentials.scss';

ClarityIcons.addIcons(refreshIcon, connectIcon, infoCircleIcon);

export interface FormInputs {
    PROFILE: string;
    REGION: string;
    SECRET_ACCESS_KEY: string;
    SESSION_TOKEN: string;
    ACCESS_KEY_ID: string;
    EC2_KEY_PAIR: string;
}
enum CREDENTIAL_TYPE {
    PROFILE = 'PROFILE',
    ONE_TIME = 'ONE_TIME',
}

function Credentials(props: any) {
    const { vsphereState, vsphereDispatch } = useContext(VsphereStore);
    const methods = useForm<FormInputs>({
        resolver: yupResolver(credentialFormSchema),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const [type, setType] = useState<CREDENTIAL_TYPE>(CREDENTIAL_TYPE.PROFILE);
    const [connected, setConnection] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(
        vsphereState.data.PROFILE || ''
    );
    const [selectedRegion, setSelectedRegion] = useState(
        vsphereState.data.REGION || ''
    );
    const [regions, setRegions] = useState<string[]>([]);

    useEffect(() => {
        // fetch regions
        AwsService.getAwsRegions().then((data) => setRegions(data));
    }, []);

    const selectCredentialType = (event: ChangeEvent<HTMLSelectElement>) => {
        setConnection(false);
        setType(CREDENTIAL_TYPE[event.target.value as CREDENTIAL_TYPE]);
    };

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        props.goToStep(props.currentStep + 1);
        const tabStatus = [...props.tabStatus];
        tabStatus[props.currentStep - 1] = STATUS.VALID;
        props.setTabStatus(tabStatus);
        console.log(data);
        console.log(errors);
    };

    const handleConnect = () => {
        let params: AWSAccountParams = {};
        if (type === CREDENTIAL_TYPE.PROFILE) {
            params = {
                profileName: selectedProfile,
                region: selectedRegion,
            };
        } else {
            params = {
                accessKeyID: '',
                region: selectedRegion,
                secretAccessKey: '',
                sessionToken: '',
            };
        }
        AwsService.setAwsEndpoint(params).then(() => {
            setConnection(true);
        });
    };

    const handleSelectProfile = (profile: string) => {
        setSelectedProfile(profile);
        setConnection(false);
        vsphereDispatch({
            type: INPUT_CHANGE,
            field: 'PROFILE',
            payload: profile,
        });
    };

    const handleSelectRegion = (region: string) => {
        setSelectedRegion(region);
        setConnection(false);
        vsphereDispatch({
            type: INPUT_CHANGE,
            field: 'REGION',
            payload: region,
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setConnection(false);
        vsphereDispatch({
            type: INPUT_CHANGE,
            field,
            payload: value,
        });
    };

    return (
        <div className="wizard-content-container">
            <h2 className="title">Amazon Web Services Credentials</h2>
            <CdsRadioGroup
                layout="vertical-inline"
                onChange={selectCredentialType}
            >
                <label className="select-label">Credential Type</label>
                <CdsRadio>
                    <label className="space">AWS credential profile</label>
                    <input
                        type="radio"
                        value={CREDENTIAL_TYPE.PROFILE}
                        checked={type === CREDENTIAL_TYPE.PROFILE}
                        readOnly
                    />
                </CdsRadio>
                <CdsRadio>
                    <label>One-time credential</label>
                    <input
                        type="radio"
                        value={CREDENTIAL_TYPE.ONE_TIME}
                        checked={type === CREDENTIAL_TYPE.ONE_TIME}
                        readOnly
                    />
                </CdsRadio>
            </CdsRadioGroup>
            {type === CREDENTIAL_TYPE.PROFILE && (
                <CredentialProfile
                    handleSelectProfile={handleSelectProfile}
                    handleSelectRegion={handleSelectRegion}
                    initialProfile={selectedProfile}
                    initialRegion={selectedRegion}
                    regions={regions}
                    methods={methods}
                />
            )}
            {type === CREDENTIAL_TYPE.ONE_TIME && (
                <CredentialOneTime
                    initialRegion={selectedRegion}
                    handleSelectRegion={handleSelectRegion}
                    handleInputChange={handleInputChange}
                    regions={regions}
                    methods={methods}
                />
            )}
            <CdsFormGroup layout="vertical-inline" control-width="shrink">
                <div className="btn-container">
                    <CdsButton
                        onClick={handleConnect}
                        disabled={connected || !selectedRegion}
                    >
                        <CdsIcon shape="connect" size="md"></CdsIcon>
                        {connected ? 'CONNECTED' : 'CONNECT'}
                    </CdsButton>
                </div>
                <div cds-layout="horizontal gap:lg align:vertical-center">
                    <CdsSelect layout="compact">
                        <label>
                            EC2 key pair{' '}
                            <CdsIcon shape="info-circle" size="md"></CdsIcon>
                        </label>
                        <select
                            className="select-md-width"
                            {...register('EC2_KEY_PAIR')}
                        >
                            <option></option>
                            <option>default</option>
                            <option>option two</option>
                            <option>option three</option>
                        </select>
                        {errors['EC2_KEY_PAIR'] && (
                            <CdsControlMessage
                                status="error"
                                className="error-height"
                            >
                                {errors['EC2_KEY_PAIR'].message}
                            </CdsControlMessage>
                        )}
                        <CdsControlMessage className="control-message-width">
                            Connect with your AWS profile to view avaliable EC2
                            key pairs.
                        </CdsControlMessage>
                    </CdsSelect>
                    <a
                        href="/"
                        className="btn-refresh blue-text"
                        onClick={() => console.log('API is not ready!')}
                    >
                        <CdsIcon shape="refresh" size="sm"></CdsIcon>{' '}
                        <span className="vertical-mid">REFRESH</span>
                    </a>
                </div>
                <CdsButton onClick={handleSubmit(onSubmit)}>NEXT</CdsButton>
            </CdsFormGroup>
        </div>
    );
}

export default Credentials;
