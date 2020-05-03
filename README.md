# Micro Frontends Playground

This is a repository for me to test micro frontend architecture, and it's related ecosystem.

## Running

You will need [Docker Desktop](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) to run this project.

Clone this repository, change to the cloned directory, then execute `./run.sh`. Once running, visit [localhost:8080](http://localhost:8080) in your browser to see the content.

This will take a few minutes on first run, as it pulls the Docker images and builds each component. Subsequent runs will be much faster, as only changed containers will be rebuilt.

## Architecture

### Upstream (`services/upstream`)

This is a simple Node Express server, serving HTML that contains placeholders ("directives") for the micro frontends to be rendered in. This plays the part of an upstream service, such as a content management system, providing content structure and data.

[Upstream](http://localhost:4000)

### Ara Framework - Nova Cluster (`services/nova-cluster`)

This service delegates calls from the Nova Proxy to the relevant micro frontend "Novas", enabling Nova Proxy to request components without needing to know which Nova is responsible for rendering them.

[Cluster](http://localhost:3000)

### Ara Framework - Nova Proxy (`services/nova-proxy`)

This service proxies all calls to the Upstream, inspecting the returned HTML for component placeholders. It requests the rendered content for these placeholders from the Nova Cluster. It is the entry point for incoming requests.

[Proxy](http://localhost:8080)

### Components (`components/*`)

These are the components ("Novas") that will render into the placeholders in the HTML. They are independantly deployed services, runing in their own, individual containers.

#### Body Component

This contains a client side counter, to demonstrate if client side code is being loaded.

- [Components - Header](http://localhost:5001)
- [Components - Footer](http://localhost:5003)
- [Components - Body](http://localhost:5002)

## Author's Notes

Below are my personal notes and observations on the current setup. They will change as the setup does.

- Ara Framework is maintained by a single developer, and while the code is short and understandable, and the docs pretty, I couldn't find evidence of it being used in production by a company.
- I would have expected Nova Proxy and Nova Cluster to have published, production-ready Docker images, as they are independant applications, rather than packages to be imported. The published images were out of date, but this is understandable as a single person project. I've created Docker images of my own, pulling the repos at fixed tags.
- What is the overhead to rendering components on their own services, versus putting them as packages within the same registry application (for example: Open Components registry)? You'd need running services or provisioned Lambdas - the cold start on a service or Lambda would be untenable for this.
- Could we put all components into Open Components registry (on the same application) - and have thin wrappers for components that do need to call an external service to render, like the Novas? This would encourage React and similar dependencies, but still allow for other technologies.
- Dependency sharing is a balance between coupling packages together and increasing page sizes. Webpack module federation or SystemJs import maps could make this an opt-in process for components.
- Ara's Novas are a very thin layer around Hypernova, and the documentation suggests they should be 1:1 with components. Hypernova's API isn't as rigid on this - it suggests that one Nova would serve multiple components - the service provides a method for rendering them.
- Putting components behind directives removes type checking for the data that's being passed to them - but this is probably already a concern with JSPs.
- If a Nova fails to render a component, you do not get an error in stdout from the container or in the browser's console. It appears in the HTML source as a `<!-- Proxy Error: ReferenceError -->` and no stack trace.
- Ara Framework does not inject client side JavaScript links into the proxied request, and therefore no client side hydration is done, unless the components are manually loaded. This is a known limitation:
  - [Stackoverflow - Is there a way to have the client side script also auto loaded from the proxy/cluster services in the Ara Framework?](https://stackoverflow.com/questions/61478514/is-there-a-way-to-have-the-client-side-script-also-auto-loaded-from-the-proxy-cl#)
  - [GitHub - Inject client scripts URLs from Hypernova response](https://github.com/ara-framework/nova-proxy/issues/10)
