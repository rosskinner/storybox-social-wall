import { IgApiClient } from 'instagram-private-api'

// export default ig
// import { sample } from 'lodash'



// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time

// Optionally you can setup proxy url
// ig.state.proxyUrl = process.env.IG_PROXY;

export async function setUser() {
  const ig = new IgApiClient();
let igInstance
  // if (req.method === 'POST' && req.cookies.secret == req.body.secret) {
  //   console.log("POST")
    
    ig.state.generateDevice(process.env.NEXT_PUBLIC_INSTA_DEFAULT);

    await ig.simulate.preLoginFlow();
    const user = process.env.NEXT_PUBLIC_INSTA_DEFAULT
    const loggedInUser = await ig.account.login(user, process.env[`NEXT_PUBLIC_${user.toLocaleUpperCase()}_PASSWORD`]);

    process.nextTick(async () => await ig.simulate.postLoginFlow());
    igInstance = ig
    // console.log(loggedInUser.pk)
  return loggedInUser
  

}
export async function getFeed(user) {
  const userFeed = igInstance.feed.user(user)
    
  const items = await userFeed.items()
  return items
}

// export class Instagram {
//   constructor() {
//     this.ig = ig
//   }
  
  // setUser = () => {

  //   // if (req.method === 'POST' && req.cookies.secret == req.body.secret) {
  //   //   console.log("POST")
      
  //     this.ig.state.generateDevice(process.env.NEXT_PUBLIC_INSTA_DEFAULT);
  
  //     await this.ig.simulate.preLoginFlow();
  //     const user = process.env.NEXT_PUBLIC_INSTA_DEFAULT
  //     const loggedInUser = await this.ig.account.login(user, process.env[`NEXT_PUBLIC_${user.toLocaleUpperCase()}_PASSWORD`]);
  
  //     process.nextTick(async () => await this.ig.simulate.postLoginFlow());
  
  //     // console.log(loggedInUser.pk)
  //   return loggedInUser.pk
    
  
  // }

  // getFeed = (user) => {
  //   const userFeed = this.ig.feed.user(user)
      
  //   const items = await userFeed.items()
  //   return items
  // }
// }

// const insta = async () => {
//   setUser = async () => {
//     ig.state.generateDevice(process.env.NEXT_PUBLIC_INSTA_DEFAULT);

//     await ig.simulate.preLoginFlow();
//     const user = process.env.NEXT_PUBLIC_INSTA_DEFAULT
//     const loggedInUser = await ig.account.login(user, process.env[`NEXT_PUBLIC_${user.toLocaleUpperCase()}_PASSWORD`]);

//     // process.nextTick(async () => await ig.simulate.postLoginFlow());

//     // console.log(loggedInUser.pk)

//     return { ig: ig, user: loggedInUser.pk }
//   }
//   const getFeed = async (user) => {
//     const userFeed = ig.feed.user(user)
    
//     const items = await userFeed.items()
//     return items
//   }
//   return {...setUser, ...getFeed}
// }

// export default insta

