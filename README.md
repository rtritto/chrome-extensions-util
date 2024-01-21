# Install
`yarn add chrome-extensions-util@github:rtritto/chrome-extensions-util`


# Example
```ts
import { downloadExtension } from 'chrome-extensions-util'

await downloadExtension('DarkReader', 'eimadpbcbfnmbkopoojfekhnkhdbieeh', '120.0.6099.200', './extensions')
```