import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID, // must match your frontend client ID
  });
  return ticket.getPayload(); // returns { sub, email, name, profile_picture }
}

export default verifyGoogleToken;
