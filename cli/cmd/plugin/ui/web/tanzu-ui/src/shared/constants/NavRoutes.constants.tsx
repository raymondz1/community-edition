export const NavRoutes = {
    // app general
    WELCOME: '/',
    GETTING_STARTED: 'getting-started',
    MANAGEMENT_CLUSTER_LANDING: '/management-cluster-landing',
    WORKLOAD_CLUSTER_LANDING: '/workload-cluster-landing',

    // provider workflows
    VSPHERE: 'vsphere', // TODO: refactor to management/workload specific route
    AWS: 'aws',

    // temp routes to be refactored out
    DEPLOY_PROGRESS: 'progress',
};

export const TAB_NAMES = {
    aws: [
        'AWS Credentials',
        'Cluster settings',
        'Regions and resources',
        'Configuration',
        'Go!',
    ],
};
