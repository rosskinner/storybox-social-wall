import { IgApiClient } from 'instagram-private-api'
// import { sample } from 'lodash'


const ig = new IgApiClient();
// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
ig.state.generateDevice("ros_skinner");
// Optionally you can setup proxy url
// ig.state.proxyUrl = process.env.IG_PROXY;

export default async function handler(req, res) {
  // console.log('reqss', req.cookies.secret)
  // console.log('req', req.body)
  if (req.method === 'POST' && req.cookies.secret == req.body.secret) {
    console.log("POST")
    // Execute all requests prior to authorization in the real Android application
// Not required but recommended
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login("ros_skinner", "M00nfac3");
    // The same as preLoginFlow()
    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
    process.nextTick(async () => await ig.simulate.postLoginFlow());
    // Create UserFeed instance to get loggedInUser's posts
    const userFeed = ig.feed.user(loggedInUser.pk);
    const myPostsFirstPage = await userFeed.items();
    // All the feeds are auto-paginated, so you just need to call .items() sequentially to get next page
    // const myPostsSecondPage = await userFeed.items();
    console.log(myPostsFirstPage)
    res.status(200).json(myPostsFirstPage)
    
  
  } else {
    res.status(400).json({"error": "No valid credentials"})
  }

  
  

  // await ig.media.like({
  //   // Like our first post from first page or first post from second page randomly
  //   mediaId: sample([myPostsFirstPage[0].id, myPostsSecondPage[0].id]),
  //   moduleInfo: {
  //     module_name: 'profile',
  //     user_id: loggedInUser.pk,
  //     username: loggedInUser.username,
  //   },
  //   d: sample([0, 1]),
  // });

}