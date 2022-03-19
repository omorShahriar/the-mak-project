import { createCookieSessionStorage } from "remix";

const EXPIRATION_DURATION_IN_SECONDS = 3600;

const expires = new Date();
expires.setSeconds(expires.getSeconds() + EXPIRATION_DURATION_IN_SECONDS);

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "sb", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["new@45sghOne!"],
    expires, // replace this with an actual secret
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
