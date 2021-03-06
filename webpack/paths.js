const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (resolvePath) => path.resolve(appDirectory, resolvePath)

const moduleFileExtensions = ['js', 'ts', 'tsx', 'json', 'jsx']

const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`)),
  )

  if (extension) {
    return resolveFn(`${filePath}.${extension}`)
  }

  return resolveFn(`${filePath}.js`)
}

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appFavicon: resolveApp('public/favicon.ico'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  appNodeModules: resolveApp('node_modules'),
  publicUrlOrPath: '/',
}

module.exports.moduleFileExtensions = moduleFileExtensions
