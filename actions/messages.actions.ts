"use server";

import { redis } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type SendMessageArgument = 
{
    content: string;
    recieverID: string;
    messagetype: "text" | "image";
};


export async function sendMessageAction({content,messagetype,recieverID}:SendMessageArgument)
{
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) return ({success:false ,message:"User not authenticated" })

    const senderId = user.id;

    const conversationID = `conversation:${[senderId,recieverID].sort().join(":")}`   // this is to keep same ip for sending message;

    const conversationExists = await redis.exists(conversationID);

    if(!conversationExists){
        await redis.hset(conversationID,{
            participant1 : senderId,
            participant2 : recieverID
        })
        await redis.sadd(`user:${senderId}:conversation`,conversationID)
        await redis.sadd(`user:${recieverID}:conversation`,conversationID)
    }
    const messageId = `message:${Date.now()}:${Math.random().toString(36).substring(2,9)}` 
    const timestamp = Date.now();


    // create a message hash
    await redis.hset(messageId,{
        senderId,
        content,
        timestamp,
        messagetype
    })

    await redis.zadd(`${conversationID}:messages`,{score:timestamp,member:JSON.stringify(messageId)})

    return {success:true , conversationID, messageId};
}