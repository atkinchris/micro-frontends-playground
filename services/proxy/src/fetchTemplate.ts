import fetch from 'node-fetch'

import constants from './constants'
import { RequestWithContext } from './types'

const fetchTemplate = async (request: RequestWithContext, parseTemplate: Function) => {
  const url = `${constants.UPSTREAM_URL}${request.url}`

  const response = await fetch(url, {
    headers: request.headers as Record<string, string>,
    method: request.method,
  })

  // Get headers from the upstream response in object form
  const responseHeaders = response.headers.raw()

  // Remove response content specific headers, which would conflict with final content
  delete responseHeaders['content-length']
  delete responseHeaders['content-encoding']

  // Add add headers from upstream response to the request safe context object
  request.context.headersToAddToResponse = responseHeaders

  let html = await response.text()

  // Rewrite Tu Clothing header to inject a demo fragment
  html = html.replace(/<!-- Main Content Starts Here -->(.*)<!-- Main Content Ends Here -->/s, () => {
    return '<!-- Fragment Start --><fragment src="http://component:3000/header?name=Chris"></fragment><!-- Fragment End -->'
  })

  return parseTemplate(html)
}

export default fetchTemplate
