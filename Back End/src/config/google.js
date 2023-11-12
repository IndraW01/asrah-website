import { google } from "googleapis";

// Konfigurasi oauth2
export const oauth2Cient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SCREET,
  'http://localhost:5000/auth/google/callback'
)

// Buat scopenya
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

// Redirect url
export const authorizationUrl = oauth2Cient.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true
})