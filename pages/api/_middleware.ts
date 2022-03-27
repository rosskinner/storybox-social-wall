import { NextRequest, NextResponse } from 'next/server'


export function middleware(req: NextRequest, ev ) {
  let response = NextResponse.next()
  console.log(response)
  // console.log(req.page)
  // console.log(req)
  // response.cookie('secret')
  return response
  
}