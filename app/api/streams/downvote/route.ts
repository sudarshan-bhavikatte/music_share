import { prismaClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";

const UpVoteSchema = z.object({
    streamId : z.string(),

})

export async function POST(req : NextRequest){
    const session = await getServerSession();

    const user = await prismaClient.user.findFirst({
        where : {
            email : session?.user?.email ?? ""
        }
    })
    if(!user){
        return NextResponse.json({
            message : "user is not authenticated"
        },{
            status : 403
        })

    }
    try{
        const data = UpVoteSchema.parse(await req.json());
        await prismaClient.upVotes.delete({
            where : {
                userId_streamId : {
                    userId : user.id,
                    streamId : data.streamId
                }
            }
        })

    } catch(e){
        return NextResponse.json({
            message : "already voted"
        },{
            status : 403
        })
    }


}