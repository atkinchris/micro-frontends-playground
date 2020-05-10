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
  const patchedHeaders = {
    ...req.headers
  }
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  const hybrisRes = await fetch(`https://dev.tuclothing.sainsburys.co.uk:9002/`, { agent: httpsAgent })
  const html = await hybrisRes.text();
  return {
    props: {
      hybrisHTML: html
    }, // will be passed to the page component as props
  }
}