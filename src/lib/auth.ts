import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-key")

export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}



export async function getSession() {
  const cookieStore = await cookies(); // ✅ Await the cookies()
  const tokenCookie = cookieStore.get("token"); // ✅ Now it works

  if (!tokenCookie) return null;

  return await verifyToken(tokenCookie.value);
}
