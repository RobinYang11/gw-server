
import { CHAIN } from '@tonconnect/ui';
import * as jose from 'jose'
const { decodeJwt, jwtVerify, SignJWT } = jose;

/**
 * Secret key for the token.
 */
const JWT_SECRET_KEY = 'your_secret_key';

/**
 * Payload of the token.
 */
export type AuthToken = {
  address: string;
  network: CHAIN;
};

export type PayloadToken = {
  payload: string;
};

/**
 * Create a token with the given payload.
 */
function buildCreateToken<T extends jose.JWTPayload>(expirationTime: string): (payload: T) => Promise<string> {
  return async (payload: T) => {
    const encoder = new TextEncoder();
    const key = encoder.encode(JWT_SECRET_KEY);
    return new SignJWT(payload)
      .setProtectedHeader({alg: 'HS256'})
      .setIssuedAt()
      .setExpirationTime(expirationTime)
      .sign(key);
  };
}

export const createAuthToken = buildCreateToken<AuthToken>('1Y');
export const createPayloadToken = buildCreateToken<PayloadToken>('15m');

/**
 * Verify the given token.
 */
export async function verifyToken(token: string): Promise<jose.JWTPayload | null> {
  const encoder = new TextEncoder();
  const key = encoder.encode(JWT_SECRET_KEY);
  try {
    const {payload} = await jwtVerify(token, key);
    return payload;
  } catch (e) {
    return null;
  }
}


/**
 * Decode the given token.
 */
function buildDecodeToken<T extends jose.JWTPayload>(): (token: string) => T | null {
  return (token: string) => {
    try {
      return decodeJwt(token) as T;
    } catch (e) {
      return null;
    }
  };
}

export const decodeAuthToken = buildDecodeToken<AuthToken>();
export const decodePayloadToken = buildDecodeToken<PayloadToken>();
