"use server";
import { redis } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function checkAuthStatus()
{
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) return {success:false}

    // namespaces are fundamental in redis to identify the table 
    const userId = `user:${user.id}`

    const existingUser = await redis.hgetall(userId);

    // sign up case is below
    if(!existingUser || Object.keys(existingUser).length === 0){
        const imgisNull = user.picture?.includes("gravatar");   // gravatar is by default image provided by redis if null

        const image = imgisNull ? "":user.picture;
        await redis.hset(userId,
            {
                id:user.id,
                email:user.email,
                name: `${user.given_name}${user.family_name}`,
                image:user.picture,
            }
        )
    }
    // already login so return true
    return {success:true}
}