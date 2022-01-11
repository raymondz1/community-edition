# Unmanaged Clusters Reference

This is the reference documentation for the `unmanaged-cluster` plugin. If
you're trying to use unmanaged clusters for the first time, see
[Getting Started with Unmanaged Clusters](getting-started-unmanaged/).

## Command aliases

As a Tanzu CLI plugin, unmanaged clusters can be interacted with using `tanzu
unmanaged-cluster`. `uc`, `um`, and `unmanaged` are all valid aliases for the
command. This means the following commands equate to the same:

* `tanzu unmanaged-cluster create hello`
* `tanzu uc create hello`
* `tanzu um create hello`
* `tanzu unmanaged create hello`

## Creating clusters

`create` is used to create a new cluster. By default, it:

1. Installs a cluster using `kind`.
1. Installs `kapp-controller`.
1. Installs a core package repository.
1. Installs a user-managed package repository.
1. Installs a CNI package.
    * defaults to `antrea`.
1. Sets your kubeconfig context to the newly created cluster.

To create a cluster, run:

```sh
tanzu unmanaged-cluster create ${CLUSTER_NAME}
```

## Listing clusters

`list` or `ls` is used to list all known clusters. To list known clusters, run:

```sh
tanzu unmanaged-cluster list
```

## Deleting clusters

`delete` or `rm` is used to delete a cluster. It will:

1. Attempt to delete the cluster based on the provider.
    * by default, clusters use `kind`, this will delete the `kind` cluster.
1. Attempt to remove the cluster's directory.
    * located at `~/.config/tanzu/tkg/unmanaged/${CLUSTER_NAME}`.

To delete a cluster, run:

```sh
tanzu unmanaged-cluster delete ${CLUSTER_NAME}
```

## Custom configuration

`unmanaged-cluster` takes configuration from the multiple sources in the
following order:

1. (lowest precedence)
1.
1.
1. (highest precedence)

## Install to existing cluster

If you wish to install the Tanzu components, such as `kapp-controller` and the
package repositories into an **existing** cluster, you can do so with the
`--existing-cluster-kubeconfig`/`e` flags or `existingClusterKubeconfig`
configuration field. The following example demonstrates installing into an
existing [minikube](https://minikube.sigs.k8s.io) cluster.

1. Create a `minikube` cluster.

    ```sh
    $ minikube start

    * minikube v1.24.0 on Arch rolling
    * Automatically selected the docker driver. Other choices: kvm2, ssh
    * Starting control plane node minikube in cluster minikube
    * Pulling base image ...

    * Preparing Kubernetes v1.22.3 on Docker 20.10.8 ...
      - Generating certificates and keys ...
      - Booting up control plane ...
      - Configuring RBAC rules ...
    * Verifying Kubernetes components...
      - Using image gcr.io/k8s-minikube/storage-provisioner:v5
    * Enabled addons: storage-provisioner, default-storageclass
    * Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
    ```

1. Install the unmanaged cluster components

    ```sh
    tanzu unmanaged-cluster create -e ~/.kube/config --cni=none
    ```

    * `~/.kube/config` is the location of the kubeconfig used to access the
      `minikube` cluster.
    * `--cni=none` is set since `minikube` already sets up a network for pods.

1. Now you can use the `tanzu` CLI to interact with the cluster.

    ```sh
    tanzu package list -A
    ```

## Disable CNI installation

## Customize the distribution

## Limitations

This section details known limitations of unmanaged clusters.

### Can't Upgrade Kubernetes

By design, `unmanaged-clusters` do not lifecycle-manage Kubernetes. They are not
meant to be long-running with real workloads. To change Kubernetes versions,
delete the existing cluster and create a new cluster with a different
configuration.
