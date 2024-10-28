export function collectAssetsFromGlob(input: Record<string, string>, rootPath: string) {
  const result: Record<string, string> = {}

  for (const [srcPath, realPath] of Object.entries(input)) {
    const parsedPath = parseFilePath(srcPath, rootPath)
    result[parsedPath] = realPath
  }

  return result
}

export function parseFilePath(filePath: string, rootPath: string) {
  const [namespace, ...path] = filePath.replace(rootPath, '').split('/')
  const [type, subType, ...restPath] = path

  const isModel = type === 'models'

  if (namespace === undefined) {
    throw new Error('Got empty path')
  }

  if (isModel && subType !== 'entity') {
    throw new Error(`Unsupported model type "${subType}"`)
  }

  const finalPath = isModel ? restPath : path

  let result = `${namespace}:${finalPath.join('/')}`

  if (isModel) {
    result = result.replace(/\..+$/, '')
  }

  return result
}
