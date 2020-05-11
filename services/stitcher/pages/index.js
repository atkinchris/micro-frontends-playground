import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import https from 'https'
console.reportErrorsAsExceptions = false;

export default function Home({hybrisHTML}) {

  return (
    <>
      <div>HEADER</div>
      <div dangerouslySetInnerHTML={{__html: hybrisHTML}}></div>
      <div>FOOTER</div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, res, query, params } = context
  const { UPSTREAM_URL, HYBRIS_PORT } = process.env;
  const patchedHeaders = {
    ...req.headers
  }
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  const url = `${UPSTREAM_URL}:${HYBRIS_PORT}/`
  console.log('index: url', url)
  console.log('index: patchedHeaders', patchedHeaders);
  const hybrisRes = await fetch(url, { agent: httpsAgent, headers: patchedHeaders })
  const html = await hybrisRes.text();
  return {
    props: {
      hybrisHTML: html
    }, // will be passed to the page component as props
  }
}