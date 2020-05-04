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

  const html = await response.text()

  return parseTemplate(html)
}

export default fetchTemplate
