/* eslint-disable no-underscore-dangle */
import { Writable } from 'stream'

type OnEnd = (content: Buffer) => void

class DechunkStream extends Writable {
  private onEnd: OnEnd

  private chunks: Buffer[] = []

  constructor(onEnd: OnEnd) {
    super()
    this.onEnd = onEnd
  }

  _write(chunk: Buffer, _encoding: string, callback: Function) {
    this.chunks.push(chunk)
    callback()
  }

  _final(callback: Function) {
    this.onEnd(Buffer.concat(this.chunks))
    this.end()
    callback()
  }
}

export default DechunkStream
