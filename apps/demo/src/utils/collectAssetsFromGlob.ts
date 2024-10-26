export function collectAssetsFromGlob(
  input: Record<string, string>,
  rootPath: string,
  skipType = false,
  removeExtension = false,
) {
  const result: Record<string, string> = {}

  for (const key in input) {
    const value = input[key]

    if (!value) {
      continue
    }

    const [namespace, type, ...path] = key.replace(rootPath, '').split('/')

    if (namespace === undefined) {
      throw new Error('Got empty path')
    }

    let newKey = `${namespace}:${skipType ? '' : `${type}/`}${path.join('/')}`

    if (removeExtension) {
      newKey = newKey.replace(/\..+$/, '')
    }

    result[newKey] = value
  }
  return result
}
