import fetch from 'isomorphic-unfetch'
import https from 'https'
import cheerio from 'cheerio';

console.reportErrorsAsExceptions = false;

export default function PLP({hybrisHtml, componentsWithHtml }) {
  const header = componentsWithHtml[1];
  const headerHtml = header.componentHtml;
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: headerHtml}}></div>
      <div dangerouslySetInnerHTML={{__html: hybrisHtml}}></div>
      <div>FOOTER</div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, res, query, params } = context
  const {category, subCategory} = params
  const { UPSTREAM_URL, HEADER_URL, HEADER_PORT } = process.env;

  const hybrisHtml = await getHybrisPage(context);
  const componentsUrlsFromHybris = getComponentsRefsEmbeddedInHybrisPage(hybrisHtml);
  console.log("componentsUrlsFromHybris", componentsUrlsFromHybris)
  const componentUrlsManifests = [
    componentsUrlsFromHybris,
    {
      componentId: 'header',
      componentUrl: `${HEADER_URL}:${HEADER_PORT}/header`
    }
  ];
  const componentsWithHtml = await getComponentHtml(componentUrlsManifests);
  const componentsToEmbedIntoHybrisHtml = componentsWithHtml.filter(({embedIntoHybrisHtml}) => embedIntoHybrisHtml);
  const hybrisHtmlWithEmbeddedComponents = embedComponentsIntoHybrisHtml(hybrisHtml, componentsToEmbedIntoHybrisHtml);

  return {
    props: {
      hybrisHtml: hybrisHtmlWithEmbeddedComponents,
      componentsWithHtml
    }, // will be passed to the page component as props
  }
}

const getHybrisPage = async (context) => {
  const { req, res, query, params } = context
  const {category, subCategory} = params
  const { UPSTREAM_URL, HYBRIS_PORT } = process.env;

  const patchedHeaders = {
    ...req.headers
  };

  const url = `${UPSTREAM_URL}:${HYBRIS_PORT}${req.url}`
  console.log('getHybrisPage: url', url);
  console.log('getHybrisPage: patchedHeaders', patchedHeaders);
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const hybrisRes = await fetch(url, { agent: httpsAgent, headers: patchedHeaders })
  const html = await hybrisRes.text();
  return html;
}

const getComponentsRefsEmbeddedInHybrisPage = (hybrisPage) => {
  const $ = cheerio.load(hybrisPage);
  const sort = $('[data-componentid="sort"]')
  const componentUrl = sort.attr('data-componenturl')
  const componentId = sort.attr('data-componentid')
  return {componentId, componentUrl, embedIntoHybrisHtml: true}
}

const getComponentHtml = async (componentManifests) => {
  return Promise.all(componentManifests.map(async ({componentId, componentUrl, embedIntoHybrisHtml=false}) => {
    console.log("getComponentHtml: componentId", componentId)
    console.log("getComponentHtml: componentUrl", componentUrl)
    const componentResponse = await fetch(componentUrl);
    const componentHtml = await componentResponse.text();
    return {componentId, componentUrl, componentHtml, embedIntoHybrisHtml}
  }))
}

const embedComponentsIntoHybrisHtml = (hybrisPage, componentsToEmbedIntoHybrisHtml) => {
  const $ = cheerio.load(hybrisPage);
  componentsToEmbedIntoHybrisHtml.forEach(({componentId, componentHtml}) => {
    const mountPoint = $(`[data-componentid="${componentId}"]`)
    // console.log('mountPoint before', mountPoint.html())
    mountPoint.replaceWith(componentHtml);
    mountPoint.attr('style', ''); //Remove the display:none from the mount point in the JSP
    // console.log('mountpoint after', mountPoint.html());
  })
  return $.root().html();
}