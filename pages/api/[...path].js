import Cookies from "cookies"
import httpProxy from "http-proxy"
import url from "url"

const API_URL = process.env.API_URL
const proxy = httpProxy.createProxyServer()
export const config = {
  api: {
    bodyParser: false,
  },
}

export default (req, res) => {
  return new Promise((resolve, reject) => {
    const pathName = url.parse(req.url).pathname
    const isLogin = pathName === "/api/auth/login"

    const cookies = new Cookies(req, res)
    const authToken = cookies.get("auth-token")

    if (pathName === "/api/auth/logout") {
      cookies.set("auth-token")
      reject()
    }

    if (authToken) {
      req.headers["Authorization"] = `Bearer ${authToken}`
    }

    if (isLogin) {
      proxy.once("proxyRes", interceptLoginResponse)
    }

    proxy.once("error", reject)

    proxy.web(req, res, {
      target: API_URL,
      changeOrigin: true,
      autoRewrite: true,
      selfHandleResponse: isLogin,
    })

    function interceptLoginResponse(proxyRes, req, res) {
      let apiResponseBody = ""
      proxyRes.on("data", (chunk) => {
        apiResponseBody += chunk
      })

      proxyRes.on("end", () => {
        try {
          const { token, user } = JSON.parse(apiResponseBody)

          if (user?.is_active) {
            const cookies = new Cookies(req, res)
            cookies.set("auth-token", token, {
              httpOnly: true,
              sameSite: "lax",
              expires: new Date(token.expiry),
            })
          }

          res.status(200).json({ user: user })
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    }
  })
}
