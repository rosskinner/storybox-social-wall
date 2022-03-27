import '../styles/globals.css'
import App from 'next/app'
import React, { createContext } from 'react'
import { setUser } from '../lib/instagram'
// import ig from '../lib/instagram'


export const GlobalContext = createContext({})

function SocialsApp({ Component, pageProps, global }) {

  return (
    <GlobalContext.Provider value={global}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  )
}

SocialsApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  // const global = await setUser()
  

  return { ...appProps }
}
export default SocialsApp
