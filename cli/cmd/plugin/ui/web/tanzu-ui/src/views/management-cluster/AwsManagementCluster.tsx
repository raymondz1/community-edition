// React imports
import React from 'react';

// Library imports

// App imports
import Wizard from '../../shared/components/wizard/Wizard';
import Credentials from '../../components/aws/credential-step/Credentials';
import { TAB_NAMES } from '../../shared/constants/NavRoutes.constants';
import { VpshereProvider } from '../../state-management/stores/Store.vsphere';
import ConfigBanner from '../../shared/components/ConfigBanner/ConfigBanner';
import ClusterSettings from '../../components/aws/cluster-settings-step/ClusterSettings';
import './AwsManagementCluster.scss';

function AwsManagementCluster() {
    return (
        <VpshereProvider>
            <div className="aws-management-container">
                <h2>
                    <div className="aws-sm-logo logo-space"></div>
                    <span>
                        Create Management Cluster on Amazon Web Services
                    </span>
                </h2>
                <ConfigBanner />
                <Wizard tabNames={TAB_NAMES.aws}>
                    <Credentials />
                    <ClusterSettings />
                </Wizard>
                <div className="mgmt-cluster-admins-container">
                    <div className="mgmt-cluster-admins"></div>
                </div>
            </div>
        </VpshereProvider>
    );
}

export default AwsManagementCluster;
