import "../styles/globals.css"
import "../styles/bootstrap-5.3.0-dist/css/bootstrap.css"
import "../styles/bootstrap-5.3.0-dist/css/bootstrap.min.css"
import "../styles/bootstrap-5.3.0-dist/css/bootstrap-grid.css"
import "../styles/bootstrap-5.3.0-dist/css/bootstrap-grid.min.css"
import { SessionProvider } from "next-auth/react"

export default function App({Component, pageProps: { session, ...pageProps  } }) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps}/>
        </SessionProvider>
    )
}