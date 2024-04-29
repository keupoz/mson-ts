export function processAssetsGlobs(input: Record<string, string>) {
  const commonRegexp = /^\/src\/assets\/mson\/(\w+)\/(.*)/;

  return Object.keys(input).map((key) => {
    const match = key.match(commonRegexp);

    if (match === null) {
      throw new Error('Can\'t match string');
    }

    const [, namespace, path] = match;

    if (namespace === undefined || path === undefined) {
      throw new Error('Empty match result');
    }

    return `${namespace}:${path}`;
  });
}
