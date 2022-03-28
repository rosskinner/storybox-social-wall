export async function getInstagramData (token) {
  console.log('getInstagramData token', token)

  const res = await fetch('https://graph.instagram.com/me/media?' + 
    new URLSearchParams({
      fields: 'id,caption,media_type,media_url,username',
      access_token: token.access_token   
    })
  )
  const data = await res.json()
  return data

}

export async function getNextData(url) {
  const res = await fetch(url)
  const data = await res.json()
  return data
}