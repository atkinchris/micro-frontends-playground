import fetch from 'isomorphic-unfetch'
import https from 'https'
import cheerio from 'cheerio';

console.reportErrorsAsExceptions = false;

export default function PLP({hybrisHtml}) {

  return (
    <>
      <div>HEADER</div>
      <div dangerouslySetInnerHTML={{__html: hybrisHtml}}></div>
      <div>FOOTER</div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, res, query, params } = context
  const {category, subCategory} = params

  const hybrisHtml = await getHybrisPage(context);
  const componentsUrlsFromHybris = getComponentsRefsEmbeddedInHybrisPage(hybrisHtml);
  const componentUrlsManifests = [
    componentsUrlsFromHybris,
    // {
    //   componentId: 'header',
    //   componentUrl: 'http://localhost:3010'
    // }
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

  const patchedHeaders = {
    ...req.headers
  };

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const hybrisRes = await fetch(`https://dev.tuclothing.sainsburys.co.uk:9002/c/${category}/${subCategory}${req.url}`, { agent: httpsAgent })
  return hybrisRes.text();
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
    const componentResponse = await fetch(componentUrl);
    const componentJson = await componentResponse.json();
    return {componentId, componentUrl, componentHtml: componentJson.html, embedIntoHybrisHtml}
  }))
}

const embedComponentsIntoHybrisHtml = (hybrisPage, componentsToEmbedIntoHybrisHtml) => {
  const $ = cheerio.load(hybrisPage);
  componentsToEmbedIntoHybrisHtml.forEach(({componentId, componentHtml}) => {
    const mountPoint = $(`[data-componentid="${componentId}"]`)
    // console.log('mountPoint before', mountPoint.html())
    mountPoint.html(componentHtml);
    // console.log('mountpoint after', mountPoint.html());
  })
  return $.root().html();
}