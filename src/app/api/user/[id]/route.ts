import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  //protect api with jwt access_token
  const access_token = request.headers.get("Authorization");
  if (!access_token || !verifyJwt(access_token)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }
  const userPosts = await prisma.post.findMany({
    //posts that authorId = user id
    where: {
      authorId: +params.id,
    },
    include: {
      author: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(userPosts));
}
