import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  //create user inside database
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  });

  //return user object without password as a response to client
  const { password, ...resWithoutPass } = user;
  return new Response(JSON.stringify(resWithoutPass));
}
