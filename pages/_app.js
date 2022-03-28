import '../styles/globals.css'
import App from 'next/app'
import React, { createContext } from 'react'
import { fetchUser } from '../lib/instaapi'



export const GlobalContext = createContext({})

function SocialsApp({ Component, pageProps }) {

  return (
    <GlobalContext.Provider value={pageProps}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  )
}

export default SocialsApp
