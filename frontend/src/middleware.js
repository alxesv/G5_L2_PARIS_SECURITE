import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./utils/getCurrentUser";

const protectedRoutes = ["/allergy", "/admin", "/my-allergies"];
const adminRoutes = ["/admin",  /^\/admin\/[^\/]+$/];


export default function middleware(req) {
    const token = req.cookies.get('accessToken')?.value
    
  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if(token){
  const isAdmin = getCurrentUser(token).isAdmin
  if(isAdmin === false &&  adminRoutes.some(route => {
    if (typeof route === 'string') {
        return route === req.nextUrl.pathname;
    } else if (route instanceof RegExp) {
        return route.test(req.nextUrl.pathname);
    }
})){
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }}
}