interface Constants {
  readonly PORT: string | number
  readonly UPSTREAM_URL: string
  readonly COMPRESS_TRANSFORMED_CONTENT: boolean
}

const constants: Constants = {
  PORT: process.env.PORT || 8080,
  COMPRESS_TRANSFORMED_CONTENT: process.env.COMPRESS_TRANSFORMED_CONTENT === 'true',
  get UPSTREAM_URL() {
    const { UPSTREAM_URL } = process.env

    if (!UPSTREAM_URL) {
      throw Error('Environment variable "UPSTREAM_URL" is required and not set')
    }

    return UPSTREAM_URL
  },
}

export default constants
