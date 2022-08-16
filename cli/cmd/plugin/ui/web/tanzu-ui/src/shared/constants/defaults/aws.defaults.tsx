import { KeyOfStringToString } from '../../types/types';
import { AWS_FIELDS, AWS_NODE_PROFILE_NAMES } from '../../../views/management-cluster/aws/aws-mc-basic/AwsManagementClusterBasic.constants';

export const AWS_DEFAULT_VALUES = {
    // Cluster Data
    [AWS_FIELDS.CLUSTER_NAME]: 'my-aws-cluster',
    [AWS_FIELDS.CLUSTER_PLAN]: 'dev',

    // VPC New
    // VPC_NAME: 'temp-vpc-name',
    [AWS_FIELDS.VPC_CIDR]: '10.0.0.0/16',

    // other?
    [AWS_FIELDS.CREATE_CLOUDFORMATION_STACK]: true,
    [AWS_FIELDS.ENABLE_AUDIT_LOGGING]: true,
    [AWS_FIELDS.ENABLE_BASTION_HOST]: true,
    [AWS_FIELDS.ENABLE_CEIP_PARTICIPATION]: false,
    [AWS_FIELDS.ENABLE_MACHINE_HEALTH_CHECK]: true,

    // Kubernetes Networking
    [AWS_FIELDS.CLUSTER_NETWORKING_CNI_PROVIDER]: 'antrea',
    [AWS_FIELDS.CLUSTER_SERVICE_CIDR]: '100.64.0.0/13',
    [AWS_FIELDS.CLUSTER_POD_CIDR]: '100.96.0.0/11',

    // HTTP Proxy & Load Balancer
    [AWS_FIELDS.HTTP_PROXY_ENABLED]: false,
    [AWS_FIELDS.LOAD_BALANCER_SCHEME_INTERNAL]: false,
};

const AWS_DEFAULT_INSTANCE_TYPES: KeyOfStringToString = {
    [AWS_NODE_PROFILE_NAMES.SINGLE_NODE]: 't3a.large',
    [AWS_NODE_PROFILE_NAMES.HIGH_AVAILABILITY]: 't3a.large',
    [AWS_NODE_PROFILE_NAMES.PRODUCTION_READY]: 'm6a.xlarge',
};

/**
 * @method retrieveAwsInstanceType
 * @param nodeProfile - node profile name set by ManagementClusterSettings.tsx; references key of AWS_DEFAULT_INSTANCE_TYPES
 * defaults map.
 * Returns aws instance type string corresponding to selected node profile.
 */
export function retrieveAwsInstanceType(nodeProfile: string): string {
    if (nodeProfile && AWS_DEFAULT_INSTANCE_TYPES[nodeProfile]) {
        return AWS_DEFAULT_INSTANCE_TYPES[nodeProfile];
    } else {
        console.warn(`provided node profile value not found in AWS_DEFAULT_INSTANCE_TYPES: ${nodeProfile}`);
        return AWS_DEFAULT_INSTANCE_TYPES[AWS_NODE_PROFILE_NAMES.SINGLE_NODE];
    }
}
