import fetch from 'node-fetch'

import constants from './constants'
import RequestWithContext from './RequestWithContext'

const fetchTemplate = async (request: RequestWithContext, parseTemplate: Function) => {
  const url = `${constants.UPSTREAM_URL}${request.url}`

  const response = await fetch(url, {
    headers: request.headers as Record<string, string>,
    method: request.method,
  })

  request.context = { headers: response.headers }

  let html = await response.text()

  // Rewrite Tu Clothing header to inject a demo fragment
  html = html.replace(/<!-- Main Content Starts Here -->(.*)<!-- Main Content Ends Here -->/s, () => {
    return '<!-- Fragment Start --><fragment src="http://component:3000/header?name=Chris"></fragment><!-- Fragment End -->'
  })

  return parseTemplate(html)
}

export default fetchTemplate
