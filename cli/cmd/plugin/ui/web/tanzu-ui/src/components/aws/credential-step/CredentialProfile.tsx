// React imports
import React, { ChangeEvent, useEffect, useState } from 'react';

// Library imports
import { CdsControlMessage, CdsFormGroup } from '@cds/react/forms';
import { CdsSelect } from '@cds/react/select';

// App imports
import { AwsService } from '../../../swagger-api/services/AwsService';
import { UseFormReturn } from 'react-hook-form';
import { FormInputs } from './Credentials';
import './CredentialProfile.scss';

interface Props {
    initialProfile: string;
    initialRegion: string;
    regions: string[];
    handleSelectProfile: (profile: string) => void;
    handleSelectRegion: (region: string) => void;
    methods: UseFormReturn<FormInputs, any>;
}

function CredentialProfile(props: Props) {
    const {
        methods: {
            formState: { errors },
            register,
            setValue,
        },
        regions,
        initialProfile,
        initialRegion,
        handleSelectProfile,
        handleSelectRegion,
    } = props;
    const [profiles, setProfiles] = useState<string[]>([]);
    useEffect(() => {
        // fetch profiles
        AwsService.getAwsCredentialProfiles().then((data: string[]) =>
            setProfiles(data)
        );
    }, []);

    const handleProfileChange = (event: ChangeEvent<HTMLSelectElement>) => {
        handleSelectProfile(event.target.value);
    };

    const handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setValue('REGION', event.target.value, { shouldValidate: true });
        handleSelectRegion(event.target.value);
    };

    return (
        <>
            <p className="description">
                Select an already existing AWS credential profile. The access
                keys and session token information configured for your profile
                will be temporarily passed to the installer.
            </p>
            <p className="description">
                Don&apos;t have a AWS Credential profile? Credential profiles
                can be configured using the{' '}
                <a href="/" className="blue-text">
                    AWS CLI
                </a>
                . More on{' '}
                <a href="/" className="blue-text">
                    AWS Credential profile.
                </a>
            </p>
            <CdsFormGroup layout="vertical-inline" control-width="shrink">
                <div cds-layout="horizontal gap:lg align:vertical-center">
                    <CdsSelect layout="compact">
                        <label>AWS credential profile</label>
                        <select
                            className="select-sm-width"
                            onChange={handleProfileChange}
                            value={initialProfile}
                        >
                            <option></option>
                            {profiles.map((profile) => (
                                <option key={profile}> {profile} </option>
                            ))}
                        </select>
                    </CdsSelect>

                    <CdsSelect layout="compact">
                        <label>AWS Region </label>
                        <select
                            className="select-sm-width"
                            {...register('REGION')}
                            onChange={handleRegionChange}
                            defaultValue={initialRegion}
                        >
                            <option></option>
                            {regions.map((region) => (
                                <option key={region}> {region} </option>
                            ))}
                        </select>
                        {errors['REGION'] && (
                            <CdsControlMessage status="error">
                                {errors['REGION'].message}
                            </CdsControlMessage>
                        )}
                    </CdsSelect>
                </div>
            </CdsFormGroup>
        </>
    );
}

export default CredentialProfile;
