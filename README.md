# Kubernetes Lab

This is a repo containing a simple 3 tier application to be deployed via docker/kubernetes/helm-chart/skaffold

# Dependencies

- **Docker Desktop** - To run and manage a local Kubernetes cluster as well as images (I believe Kubectl gets installed with docker desktop once you enable Kubernetes)
- **Helm** - To deploy and manage Kubernetes via helm charts
- **Skaffold** (Optional) - To expedite local development

# General Guidelines

Ignore `charts/` and `skaffold.yaml` for now!

## Kubernetes

1. Review the `Dockerfile` in `docker/backend/` and `docker/frontend`
2. Build the docker image with `docker build -t name-of-image dockerfile-location` 
**Example:** If you are in the `docker` directory, you would run `docker build -t frontend-image frontend/.`
3. Review the `*.yaml` files inside of `kubernetes/*` directories
4. Deploy with `kubectl apply -f file.yaml`
**Example:** If you are in the `Kubernetes` directory, you would run `kubectl apply -f frontend/deployment.yaml` or if you want to deploy everything in `frontend/` at once, you'd run `kubectl apply -f frontend/*.yaml`
5. *Verify that the frontend is running!*
To check for services: `kubectl get svc`
To check for pods: `kubectl get pods`
To get detailed information about pods: `kubectl describe pods` (this will describe all pods in default namespace)
To get detailed information about a specific pod: `kubectl describe pod pod name-here`
To get logs from a pod: `kubectl logs pod-name-here`
6. The files in `kubernetes/frontend/` should tell you which port is exposed. However, there may be issues with you being able to access `localhost:80` (which is just `localhost`). *Hint: Search online for kubectl port forwarding to localhost*
7. Follow the same process as step 4 for the rest of the application! *Make sure all of the pods and other components have been fully deployed.*
8. Once you're ready to move on, delete all of the resources you've deployed with `kubectl delete -f yaml-file-here.yaml` or `kubectl delete -f *.yaml` if you want to delete multiple resources at once. **Keep in mind the working directory vs where the yamls are located**

## Helm Chart

1. Verify that all of the Kubernetes entities have been successfully deleted (*refer to the commands listed in step 5*)
2. Go to the `charts/` directory and review the files. Notably, check out the `Chart.yaml` and `values.yaml`.
3. Run `helm install deployment-name location-of-chart/`
**Example:** If you are in the `charts/frontend-chart` directory, run `helm install frontend-deployment .` If you are in the `charts/` directory, run `helm install frontend-deployment frontend-chart/` command.
4. Check for the health of the application the same was as Kubernetes Step 5.
5. Once you are ready to move on, run `helm list` to get the full list of all of your deployments and run `helm uninstall name-of-deployment`. **Example:** If installed with the example command above, it would be `helm uninstall frontend-deployment`. *You do not need to worry about working directory and referencing the chart when uninstall helm charts.*

## Skaffold

1. Review the `skaffold.yaml` file in the root directory.
2. Lines 2-12 can be removed if you are not using an `ARM` based processor.
3. Run `skaffold dev` and enjoy the magic
4. Remember to close out of the `skaffold dev` process to ensure proper cleanup. `control + c` should be the command, but refer to the process output.