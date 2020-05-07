interface Constants {
  readonly PORT: string | number
  readonly UPSTREAM_URL: string
}

const constants: Constants = {
  PORT: process.env.PORT || 8080,
  get UPSTREAM_URL() {
    const { UPSTREAM_URL } = process.env

    if (!UPSTREAM_URL) {
      throw Error('Environment variable "UPSTREAM_URL" is required and not set')
    }

    return UPSTREAM_URL
  },
}

export default constants
