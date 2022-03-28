const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const Cookies = require('cookies')
const {fetchUser, fetchNewToken, fetchAccessToken} = require('./lib/instaapi')


const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query, search } = parsedUrl
      const cookies = new Cookies(req, res)
      
      if (cookies.get('tokenExpire') && cookies.get('accessTokenAPI')) {
        // if (cookies.get('tokenExpire'))
        const expireTime = cookies.get('tokenExpire')
        const daysLeft = (expireTime - Date.now()) / 1000 / 60 / 60 / 24
        if (daysLeft < 20) {
          const oldAccessToken = JSON.parse(cookies.get('accessTokenAPI'))
          const accessToken = await fetchNewToken(oldAccessToken.access_token)
          console.log('NEW ACCESS TOKEN', daysLeft)
          cookies.set('accessTokenAPI', JSON.stringify(accessToken))
          cookies.set('tokenExpire', Date.now() + accessToken.expires_in*1000)
        }
      }

      if (pathname === '/auth') {
        console.log('PATH', pathname, query, search, pathname === '/auth', cookies.get('accessTokenAPI'))
        if (!cookies.get('accessTokenAPI') && search === null) {
          const access = await fetchUser()
          console.log(access)
          // return NextResponse.redirect(access.url)
          res.writeHead(301, {
            Location: access.url
          }).end()
        }
        if (parsedUrl.search) {
          const code = parsedUrl.search.split('?code=')[1]
          const accessToken = await fetchAccessToken(code)

          cookies.set('accessTokenAPI', JSON.stringify(accessToken))
          cookies.set('tokenExpire', Date.now() + accessToken.expires_in*1000)
          await app.render(req, res, '/', query)
        } else {
          await app.render(req, res, '/auth', query)
        }
        
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})