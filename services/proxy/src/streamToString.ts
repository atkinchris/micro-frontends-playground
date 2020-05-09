import { IncomingMessage } from 'http'
import zlib from 'zlib'
import { PassThrough, Writable } from 'stream'

const streamToString = (upstreamResponse: IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    // Check the upstream content encoding to determine if it is compressed
    const upstreamContentEncoding = String(upstreamResponse.headers['content-encoding'])
    const isUpstreamCompressed = upstreamContentEncoding === 'gzip'

    // Create a decompression stream if required, otherwise passthrough
    const decompress = isUpstreamCompressed ? zlib.createGunzip() : new PassThrough()

    // Create an array to hold the chunks of upstream content
    const chunks: Buffer[] = []

    // Create a writeable stream to pipe the upstream content into, pushing each chunk into the array
    const serialiser = new Writable({
      write(chunk: Buffer, encoding, callback) {
        chunks.push(chunk)
        callback()
      },
    })

    // When the writeable stream has finished, construct and resolve the string
    serialiser.once('finish', () => {
      const htmlString = Buffer.concat(chunks).toString()
      resolve(htmlString)
    })

    // Reject the Promise on any errors
    decompress.on('error', reject)
    serialiser.on('error', reject)

    // Pipe the upstream response through the streams.
    upstreamResponse.pipe(decompress).pipe(serialiser)
  })

export default streamToString
