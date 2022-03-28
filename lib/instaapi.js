// import axios from 'axios'

async function fetchUser () {

  const res = await fetch('https://api.instagram.com/oauth/authorize?' + 
    new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_APP_ID,
      redirect_uri: process.env.NEXT_PUBLIC_APP_REDIRECT,
      scope: 'user_profile,user_media',
      response_type: 'code'
    })
  )

  // console.log("RES",res.url)
  return {url: res.url}

}

async function fetchllToken (token) {
  const res = await fetch('https://graph.instagram.com/access_token?' +
    new URLSearchParams({
      grant_type:'ig_exchange_token',
      client_secret:process.env.NEXT_PUBLIC_APP_SECRET,
      access_token:token
    })
  )
  
  const llToken = await res.json()
  console.log('fetchllToken', llToken)
  return llToken
}

async function fetchAccessToken (code) {

  const res = await fetch('https://api.instagram.com/oauth/access_token?', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_APP_ID,
      client_secret: process.env.NEXT_PUBLIC_APP_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: process.env.NEXT_PUBLIC_APP_REDIRECT,
      code: code
    })
  })
  // console.log('fetchAccessToken res', )
  const json  = await res.json()
  const shortAccessToken = json.access_token
  console.log(json)
  const accessToken = await fetchllToken(shortAccessToken)
  return accessToken

}

async function fetchNewToken (token) {
  const res = await fetch('https://graph.instagram.com/refresh_access_token?' +
    new URLSearchParams({
      grant_type:'ig_refresh_token',
      access_token:token
    })
  )
  
  const llToken = await res.json()
  console.log('fetchNewToken', llToken)
  return llToken
}

module.exports = {
  fetchUser,
  fetchAccessToken,
  fetchNewToken
}