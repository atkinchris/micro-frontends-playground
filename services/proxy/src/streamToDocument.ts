import { IncomingMessage } from 'http'
import zlib from 'zlib'
import ParserStream from 'parse5-parser-stream'
import { Document } from 'parse5'
import { PassThrough } from 'stream'

const streamToDocument = (upstreamResponse: IncomingMessage): Promise<Document> =>
  new Promise((resolve, reject) => {
    // Check the upstream content encoding to determine if it is compressed
    const upstreamContentEncoding = String(upstreamResponse.headers['content-encoding'])
    const isUpstreamCompressed = upstreamContentEncoding === 'gzip'

    // Create a decompression stream if required, otherwise passthrough
    const decompress = isUpstreamCompressed ? zlib.createGunzip() : new PassThrough()
    // Encoding needs to be utf8 to ensure the downstream HTML parser can read the content
    decompress.setEncoding('utf8')

    const parser = new ParserStream<Document>()

    parser.once('finish', () => resolve(parser.document))

    // Reject the Promise on any errors
    decompress.on('error', reject)
    parser.on('error', reject)

    // Pipe the upstream response through the streams.
    upstreamResponse.pipe(decompress).pipe(parser)
  })

export default streamToDocument
