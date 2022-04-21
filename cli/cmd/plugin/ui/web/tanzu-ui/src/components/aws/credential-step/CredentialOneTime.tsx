// React imports
import React, { ChangeEvent } from 'react';

// Library imports
import styled from 'styled-components';
import { CdsControlMessage, CdsFormGroup } from '@cds/react/forms';
import { CdsSelect } from '@cds/react/select';
import { CdsInput } from '@cds/react/input';

// App imports
import { UseFormReturn } from 'react-hook-form';
import { FormInputs } from './Credentials';

interface Props {
    initialRegion: string;
    regions: string[];
    handleSelectRegion: (region: string) => void;
    handleInputChange: (field: string, value: string) => void;
    methods: UseFormReturn<FormInputs, any>;
}

const Description = styled.p`
    margin: 25px 0;
`;

const Input = styled.input`
    min-width: 256px;
`;

const Select = styled.select`
    min-width: 143px;
`;

function CredentialOneTime(props: Props) {
    const {
        methods: {
            formState: { errors },
            register,
            setValue,
        },
        regions,
        initialRegion,
        handleInputChange,
        handleSelectRegion,
    } = props;

    const handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setValue('REGION', event.target.value, { shouldValidate: true });
        handleSelectRegion(event.target.value);
    };

    const handleSecretAccessKeyChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        handleInputChange('SECRET_ACCESS_KEY', event.target.value);
    };

    const handleSessionTokenChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleInputChange('SESSION_TOKEN', event.target.value);
    };

    const handleAccessKeyIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleInputChange('ACCESS_KEY_ID', event.target.value);
    };

    return (
        <>
            <Description>
                Enter AWS account credentials directly in the Access Key ID and
                Secret Access Key fields for your Amazon Web Services account.
                Optionally specify an AWS session token in Session Token if your
                AWS account is configured to require temporary credentials.
            </Description>
            <CdsFormGroup layout="vertical-inline" control-width="shrink">
                <div cds-layout="horizontal gap:lg align:vertical-top">
                    <div cds-layout="vertical gap:lg align:vertical-center">
                        <CdsInput>
                            <label>Secret access key</label>
                            <Input
                                {...register('SECRET_ACCESS_KEY')}
                                placeholder="Secret access key"
                                type="password"
                                onChange={handleSecretAccessKeyChange}
                            ></Input>
                            {errors['SECRET_ACCESS_KEY'] && (
                                <CdsControlMessage status="error">
                                    {errors['SECRET_ACCESS_KEY'].message}
                                </CdsControlMessage>
                            )}
                        </CdsInput>
                        <CdsInput>
                            <label>Session token</label>
                            <Input
                                {...register('SESSION_TOKEN')}
                                placeholder="Session token"
                                type="password"
                                onChange={handleSessionTokenChange}
                            ></Input>
                            {errors['SESSION_TOKEN'] && (
                                <CdsControlMessage status="error">
                                    {errors['SESSION_TOKEN'].message}
                                </CdsControlMessage>
                            )}
                        </CdsInput>
                        <CdsInput>
                            <label>Access key ID</label>
                            <Input
                                {...register('ACCESS_KEY_ID')}
                                placeholder="Access key ID"
                                type="password"
                                onChange={handleAccessKeyIdChange}
                            ></Input>
                            {errors['ACCESS_KEY_ID'] && (
                                <CdsControlMessage status="error">
                                    {errors['ACCESS_KEY_ID'].message}
                                </CdsControlMessage>
                            )}
                        </CdsInput>
                    </div>
                    <div cds-layout="vertical gap:lg align:vertical-top">
                        <CdsSelect layout="compact">
                            <label>AWS Region </label>
                            <Select
                                {...register('REGION')}
                                onChange={handleRegionChange}
                                defaultValue={initialRegion}
                            >
                                <option></option>
                                {regions.map((region) => (
                                    <option key={region}> {region} </option>
                                ))}
                            </Select>
                            {errors['REGION'] && (
                                <CdsControlMessage status="error">
                                    {errors['REGION'].message}
                                </CdsControlMessage>
                            )}
                        </CdsSelect>
                    </div>
                </div>
            </CdsFormGroup>
        </>
    );
}

export default CredentialOneTime;
