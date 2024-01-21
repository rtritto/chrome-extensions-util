import fs from 'node:fs'
import path from 'node:path'
import { request } from 'undici'

const URL_CRX = 'https://clients2.google.com/service/update2/crx'

export const downloadExtension = async (extensionName: string, extensionId: string, chromeVersion: string, targetFolder: string) => {
  const redirectedResponse = await request(URL_CRX, {
    query: {
      response: 'redirect',
      prodversion: chromeVersion,
      acceptformat: 'crx2,crx3',
      x: `id=${extensionId}&uc`
    }
  })
  if (redirectedResponse.statusCode === 302) {
    const { location } = redirectedResponse.headers as { location: string }
    const response = await request(location)

    if (response.statusCode === 200) {
      const arrayBuffer = await response.body.arrayBuffer()
      const crxData = Buffer.from(arrayBuffer)
      const crxVersion = location.split('/').at(-1)?.split('_').slice(1).slice(0, -1).join('.')
      const crxFileName = `${extensionName}_${crxVersion}_${extensionId}.crx`
      const crxFilePath = path.join(targetFolder, crxFileName)

      if (fs.existsSync(crxFilePath) === true) {
        return
      }

      fs.mkdirSync(targetFolder, { recursive: true })

      fs.writeFileSync(crxFilePath, crxData)
      return crxFileName
    }
    console.error(`response.statusCode !== 200; extensionName=${extensionName}, extensionId=${extensionId}`)
    throw response
  }
  console.error(`redirectedResponse.statusCode !== 302; extensionName=${extensionName}, extensionId=${extensionId}`)
  throw redirectedResponse
}