import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'


export default function Home() {
  const fetchData = async () => {
    console.log("GET")
    let response
    // response = await fetch('api/insta')

    response = await fetch('api/insta', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        secret: process.env.NEXT_PUBLIC_API_SECRET,
        user: 'ros_skinner'
      }),
    })
    const json = await response.json()
    console.log("json", json)
  }
  useEffect(() => {
    fetchData()
    
      // .then((res) => console.log(res.json()))
      // .then((data) => {
      //   console.log("data", data)
      //   // setData(data)
      //   // setLoading(false)
      // })
  
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       hello
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}
