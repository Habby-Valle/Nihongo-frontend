const { withNativebase } = require("@native-base/next-adapter")
const path = require("path")

module.exports = withNativebase({
  dependencies: ["@native-base/icons", "react-native-web-linear-gradient"],
  nextConfig: {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.ttf$/,
        loader: "url-loader", // or directly file-loader
        include: path.resolve(__dirname, "node_modules/@native-base/icons"),
      })
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "react-native$": "react-native-web",
        "react-native-linear-gradient": "react-native-web-linear-gradient",
      }
      config.resolve.extensions = [".web.js", ".web.ts", ".web.tsx", ...config.resolve.extensions]
      return config
    },
    reactStrictMode: true,
    images: {
      domains: ["nihongo-gaido-4ec2db96e424.herokuapp.com", "127.0.0.1", "localhost", "kanjialive-api.p.rapidapi.com"], // Adicione o domínio correto aqui
    },
  },
})
