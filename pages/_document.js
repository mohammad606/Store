import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  return (
    <Html lang="en">
      <Head />
        <meta charSet="UTF-8"/>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
        <meta name='author' content='Mohammad Al Halabi'/>
        <meta name='description' content='To create a secure store for products with the issuance of invoices'/>
        <meta name='keywords' content='Store,invoices,Afak,afak,products,issuance'/>
      <title>Morek</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
