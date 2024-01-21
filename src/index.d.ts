declare module 'chrome-extensions-util' {
  export function downloadExtension(extensionName: string, extensionId: string, chromeVersion: string, targetFolder: string): Promise<string | null>
}