import '../styles/globals.css'
import App from 'next/app'
import React, { createContext } from 'react'
import { fetchUser } from '../lib/instaapi'
import { getInstagramData, getNextData } from '../lib/instadata'
import mockData from '../lib/mockData'



export const GlobalContext = createContext({})

function SocialsApp({ Component, pageProps, data }) {

  return (
    <GlobalContext.Provider value={data}>
      <Component {...pageProps} data={data} />
    </GlobalContext.Provider>
  )
}

SocialsApp.getInitialProps = async (context) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(context)

  let data = null
  let next = []
  let ctx = context.ctx
  let allData = null
  allData = mockData
  // if (ctx.req.cookies.accessTokenAPI) {
  //   const token = JSON.parse(ctx.req.cookies.accessTokenAPI)
  //   data = await getInstagramData(token)
    
  //   let count = 1
  //   let currentData = data
    
  //   for (let i = 0; i < count; i++) {        
  //     if(currentData.paging.next) {
  //       const d = await getNextData(currentData.paging.next)
  //       currentData = d
  //       next.push(...d.data)
  //       count++
  //     }
  //   }
  //      allData = [...data.data, ...next]
  // }


  return { ...appProps, data:  allData}
}

export default SocialsApp
