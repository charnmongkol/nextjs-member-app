import { signJwtAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
interface RequestBody {
  username: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.username,
    },
  });
  if (user && (await bcrypt.compare(body.password, user.password))) {
    //destruct password and the rest objects of the user
    const { password, ...userWithoutPass } = user;
    //pass jwt token
    const access_token = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      access_token,
    };
    return new Response(JSON.stringify(result));
  } else {
    return new Response(JSON.stringify(null));
  }
}
