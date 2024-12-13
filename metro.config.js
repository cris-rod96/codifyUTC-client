// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    utils: `${__dirname}/src/utils`,
    components: `${__dirname}/src/components`,
    redux: `${__dirname}/src/redux`,
    services: `${__dirname}/src/services`,
    views: `${__dirname}/src/views`,
    context: `${__dirname}/src/context`,
    api: `${__dirname}/src/api`,
    config: `${__dirname}/src/config`,
    hooks: `${__dirname}/src/hooks`,
    icons: `${__dirname}/assets/icons`,
    mocks: `${__dirname}/src/mocks`,
    navigation: `${__dirname}/src/navigation`,
    assets: `${__dirname}/assets`,
  },
}

module.exports = withNativeWind(config, { input: './global.css' })
