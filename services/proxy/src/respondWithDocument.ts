import { ServerResponse } from 'http'
import { Document, serialize } from 'parse5'
import { gzip as gzipWithCallback } from 'zlib'
import { promisify } from 'util'

import constants from './constants'

const { COMPRESS_TRANSFORMED_CONTENT } = constants

const gzip = promisify<Buffer, Buffer>(gzipWithCallback)

const respondWithDocument = async (res: ServerResponse, document: Document) => {
  // Serialise the document to a HTML string
  const html = serialize(document)

  // Convert the string to a Buffer, for byte length and sending
  let htmlBuffer = Buffer.from(html)

  // We're about to modify the content, so remove existing "content-length" and "content-encoding".
  res.removeHeader('content-length')
  res.removeHeader('content-encoding')

  // Only compress the content if enabled
  if (COMPRESS_TRANSFORMED_CONTENT) {
    // Compress the HTML buffer with gzip
    htmlBuffer = await gzip(htmlBuffer)

    // Calculate content-length and set it on the response
    res.setHeader('content-encoding', 'gzip')
  }

  // Calculate content-length and set it on the response
  const contentLength = htmlBuffer.byteLength
  res.setHeader('content-length', contentLength)

  // Write the content and send the response
  res.write(htmlBuffer)
  res.end()
}

export default respondWithDocument
