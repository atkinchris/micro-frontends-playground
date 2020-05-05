# Micro Frontends Playground

This is a repository for me to test micro frontend architecture, and it's related ecosystem.

## Running

You will need [Docker Desktop](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) to run this project.

Clone this repository, change to the cloned directory, then execute `./run.sh`. Once running, visit [localhost:8080](http://localhost:8080) in your browser to see the content.

This will take a few minutes on first run, as it pulls the Docker images and builds each component. Subsequent runs will be much faster, as only changed containers will be rebuilt.

## Architecture

### Upstream (`services/upstream`)

This is a simple Node Express server, serving HTML that contains placeholders (also known as directives) for the micro frontends to be rendered in. This plays the part of an upstream service, such as a content management system, providing content structure and data.

[Upstream](http://localhost:4000)

### Tailor (`services/tailor`)

This is a wrapper around [Zalando's Tailor](https://github.com/zalando/tailor), and is used to fetch HTML from the upstream, and replace placeholders with fragment components. It is modified to support fetching templates from upstream sites, along with relaying their headers and response codes, acting as a reverse proxy.

[Upstream](http://localhost:8080)

## Author's Notes

Below are my personal notes and observations on the current setup. They will change as the setup does.

- What is the overhead to rendering components on their own services, versus putting them as packages within the same registry application (for example: Open Components registry)? You'd need running services or provisioned Lambdas - the cold start on a service or Lambda would be untenable for this.
- Could we put all components into Open Components registry (on the same application) - and have thin wrappers for components that do need to call an external service to render, like the Novas? This would encourage React and similar dependencies, but still allow for other technologies.
- Dependency sharing is a balance between coupling packages together and increasing page sizes. Webpack module federation or SystemJs import maps could make this an opt-in process for components.
- Putting components behind directives removes type checking for the data that's being passed to them - but this is probably already a concern with JSPs.
- [Tailor](https://github.com/zalando/tailor) supports laying out micro frontend components from templates, including bringing in their scripts and stylesheets. It boasts performance, and many GitHub stars. It doesn't have options to act like a proxy service, like Nova Proxy - it's expecting to be a sibling to a proxy like [Skipper](https://github.com/zalando/skipper). The closest is abusing it's `fetchTemplate` method, which won't work for `POST` requests or streamable content out of the box, or passing cookies & headers to the response.
- How should we deal with component requirements, like scripts and stylesheets? Should these be:
  - Deployed to a publicly accessible CDN, and loaded without changing the URL
  - Served from the component servers, and proxied through the main site

## Decisions

### Ara Framework - Not Used

The [Ara Framework](https://ara-framework.github.io/website/) was the closest to our target architecture, with it's [Nova Proxy](https://github.com/ara-framework/nova-proxy) acting as a transformation layer and reverse proxy infront of an upstream website that contained fragments. Unfortunately, there are a number of shortcomings that would prevent us from using it.

- It lacks a mechanism to expose component scripts and stylesheets to the composed view. This is known by the author, and on the roadmap to implement ([GitHub - Inject client scripts URLs from Hypernova response](https://github.com/ara-framework/nova-proxy/issues/10)). Without this, client side code for components becomes much more difficult.
- If an error occurs when rendering a component, this does not log to `stdout` on the service, or the client's `console` - it appears as a message in the returned HTML, with no stack trace. We would need greater logging and resilience before putting this in front of our production systems.
- Ara's component services, or "Novas", leverage [Airbnb's Hypernova](https://github.com/airbnb/hypernova) for server side rendering. The framework advocates for a 1:1 relationship between services and components, which misses out on Hypernova's parallel rendering, and adds more overhead.

Ultimately, all of these issues are surmountable with development work. However, the Ara Framework is supported by a single developer and does not appear to be used in production, so it's future is uncertain. We could support the library, building the features we need, but this would require considerable investment, especially as it is written in a language we are not familiar with (Go).
