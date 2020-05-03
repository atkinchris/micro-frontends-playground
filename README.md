# Micro Frontends Playground

This is a repository for me to test micro frontend architecture, and it's related ecosystem.

## Running

Clone this repository, change to the cloned directory, then execute `./run.sh`.

## Architecture

### Upstream (`services/upstream`)

This is a simple Node Express server, serving HTML that contains placeholders ("directives") for the micro frontends to be rendered in. This plays the part of an upstream service, such as a content management system, providing content structure and data.

### Ara Framework - Nova Cluster (`services/nova-cluster`)

This service delegates calls from the Nova Proxy to the relevant micro frontend "Novas", enabling Nova Proxy to request components without needing to know which Nova is responsible for rendering them.

### Ara Framework - Nova Proxy (`services/nova-proxy`)

This service proxies all calls to the Upstream, inspecting the returned HTML for component placeholders. It requests the rendered content for these placeholders from the Nova Cluster.

### Components (`components/*`)

These are the components ("Novas") that will render into the placeholders in the HTML. They are independantly deployed services, runing in their own, individual containers.

## Author's Notes

Below are my personal notes and observations on the current setup. They will change as the setup does.

- Ara Framework is maintained by a single developer, and while the code is short and understandable, and the docs pretty, I couldn't find evidence of it being used in production by a company.
- I would have expected Nova Proxy and Nova Cluster to have published, production-ready Docker images, as they are independant applications, rather than packages to be imported. The published images were out of date, but this is understandable as a single person project. I've created Docker images of my own, pulling the repos at fixed tags.
- What is the overhead to rendering components on their own services, versus putting them as packages within the same registry application (for example: Open Components registry)? You'd need running services or provisioned Lambdas - the cold start on a service or Lambda would be untenable for this.
- Could we put all components into Open Components registry (on the same application) - and have thin wrappers for components that do need to call an external service to render, like the Novas? This would encourage React and similar dependencies, but still allow for other technologies.
- Dependency sharing is a balance between coupling packages together and increasing page sizes. Webpack module federation or SystemJs import maps could make this an opt-in process for components.
- Ara's Novas are a very thin layer around Hypernova, and the documentation suggests they should be 1:1 with components. Hypernova's API isn't as rigid on this - it suggests that one Nova would serve multiple components - the service provides a method for rendering them.
