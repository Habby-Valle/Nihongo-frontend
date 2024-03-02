import Cookies from "cookies"
import httpProxy from "http-proxy"
import url from "url"

const API_URL = process.env.NEXT_PUBLIC_API_URL
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
      cookies.set("auth-token") // Remova o token ao fazer logout
      res.status(200).json({ message: "Logout successful" }) // Responda com uma mensagem de logout bem-sucedido
      return resolve()
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
          const { access, user } = JSON.parse(apiResponseBody)

          const cookies = new Cookies(req, res)
          cookies.set("auth-token", access, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          })

          res.status(200).json({ user: user })
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    }
  })
}
