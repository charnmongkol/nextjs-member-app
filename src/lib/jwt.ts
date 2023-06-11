import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}
const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};
export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  //add secret key for sucurity
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

//to veryfy token
export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    //decode jwt token
    const decoded = jwt.verify(token, secret_key!);

    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
