import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SECRET = process.env.NEXT_PUBLIC_API_SECRET
export function middleware(req: NextResponse, ev) {
  let response = NextResponse.next()
  // console.log(req)
  response.cookie('secret', SECRET)
  return response
  
}