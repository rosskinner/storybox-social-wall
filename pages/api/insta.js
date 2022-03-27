// import { IgApiClient } from 'instagram-private-api'
// import { sample } from 'lodash'


// const ig = new IgApiClient();
// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
// ig.state.generateDevice("storybox_places");
// Optionally you can setup proxy url
// ig.state.proxyUrl = process.env.IG_PROXY;
import {getFeed} from "../../lib/instagram";

export default async function handler(req, res) {

  // if (req.method === 'POST' && req.cookies.secret == req.body.secret) {
    // console.log("POST")

    // await ig.simulate.preLoginFlow();
    // console.log(process.env[`NEXT_PUBLIC_${req.body.user.toUpperCase()}_PASSWORD`])
    // const loggedInUser = await ig.account.login(req.body.user, process.env[`NEXT_PUBLIC_${req.body.user.toUpperCase()}_PASSWORD`]);

    // process.nextTick(async () => await ig.simulate.postLoginFlow());

    // console.log(loggedInUser.pk)
    // const userFeed = await getFeed(req.body.user)
    // console.log("IG FEED",  userFeed)
    // const userFeed = ig.user(req.body.user)
    
    // const myPostsFirstPage = await userFeed.items();
    // res.status(200).json({feed: userFeed})
    // res.status(200).json({feed: userFeed})
    
  // } else {
  //   res.status(400).json({"error": "No valid credentials"})
  // }

}


