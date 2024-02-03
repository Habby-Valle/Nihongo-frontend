import Cookies from "cookies"
import { IncomingMessage, ServerResponse } from "http"

export function redirectIfNoCredentials({ req, res }: { req: IncomingMessage; res: ServerResponse }) {
  const cookies = new Cookies(req, res)

  if (!cookies.get("auth-token")) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
  return { props: {} }
}
