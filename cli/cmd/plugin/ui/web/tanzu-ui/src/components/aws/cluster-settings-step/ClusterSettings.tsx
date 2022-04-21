// React imports
import React from 'react';

// Library imports
import { ClarityIcons, blockIcon, blocksGroupIcon } from '@cds/core/icon';

// App imports
import { CdsControlMessage } from '@cds/react/forms';
import { CdsInput } from '@cds/react/input';
import { useForm } from 'react-hook-form';
import { CdsRadio, CdsRadioGroup } from '@cds/react/radio';
import './ClusterSettings.scss';
import { CdsIcon } from '@cds/react/icon';

ClarityIcons.addIcons(blockIcon, blocksGroupIcon);

interface FormInputs {
    CLUSTER_NAME: string;
}

function ClusterSettings(props: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();
    return (
        <div className="cluster-settings-container">
            <h3>Management Cluster settings</h3>
            <div cds-layout="grid gap:md">
                <div cds-layout="col@sm:4">
                    <CdsInput>
                        <label className="label">Cluster name</label>
                        <input
                            {...register('CLUSTER_NAME')}
                            placeholder="Cluster name"
                            // onChange={handleSessionTokenChange}
                        ></input>
                        {errors['CLUSTER_NAME'] && (
                            <CdsControlMessage status="error">
                                {errors['CLUSTER_NAME'].message}
                            </CdsControlMessage>
                        )}
                    </CdsInput>
                    <p className="description">
                        Can only contain lowercase alphanumeric characters and
                        dashes.
                        <br></br>
                        <br></br>
                        The name will be used to reference your cluster in the
                        Tanzu CLI and kubectl.
                    </p>
                </div>
                <div cds-layout="col@sm:8" className="node-profile-container">
                    <CdsRadioGroup layout="vertical">
                        <label>Select a control plane-node profile</label>

                        <CdsRadio className="radio-container">
                            <label>
                                Single node
                                <CdsIcon
                                    shape="block"
                                    size="md"
                                    className="node-icon selected"
                                ></CdsIcon>
                                <div className="radio-message">
                                    Create one control plane-node with a general
                                    purpose instance type in a single region.
                                </div>
                            </label>
                            <input type="radio" value="1" checked />
                        </CdsRadio>

                        <CdsRadio className="radio-container">
                            <label>
                                High availability
                                <CdsIcon
                                    shape="blocks-group"
                                    size="md"
                                    className="node-icon"
                                ></CdsIcon>
                                <div className="radio-message">
                                    Create a multi-node control plane with
                                    general purpose instance types in a single,
                                    or multiple, regions. Provides a
                                    fault-tolerant control plane.
                                </div>
                            </label>
                            <input type="radio" value="2" />
                        </CdsRadio>

                        <CdsRadio className="radio-container">
                            <label>
                                Production-ready (High availability)
                                <CdsIcon
                                    shape="blocks-group"
                                    solid
                                    size="md"
                                    className="node-icon"
                                ></CdsIcon>
                                <div className="radio-message">
                                    Create a multi-node control plane with
                                    recommended, performant, instance types
                                    across multiple regions. Recommended for
                                    production workloads.
                                </div>
                            </label>
                            <input type="radio" value="3" />
                        </CdsRadio>
                    </CdsRadioGroup>
                </div>
            </div>
        </div>
    );
}

export default ClusterSettings;
