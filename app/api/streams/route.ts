import { prismaClient } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-ignore
import youtubeSearchApi from "youtube-search-api"
var YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;


const CreateStreamSchema = z.object({
    creatorId : z.string(),
    url : z.string()
})

export async function POST(req : NextRequest){
    console.log("visited")
    try{

        const data = await CreateStreamSchema.parse(await req.json());
        const isYT = data.url.match(YT_REGEX);
        if(!isYT){
            return NextResponse.json({
                message : "worng url for youtube"
            },{
                status : 411
            })    
        }
        const extractedId = data.url.split("?v=")[1]

        const res = await youtubeSearchApi.GetVideoDetails(extractedId);
        console.log(res.title)
        const thumbnails = res.thumbnail.thumbnails;

        thumbnails.sort((a:{width : Number},b:{width : Number}) => a.width < b.width ? -1 : 1);

        const stream = await prismaClient.stream.create({
            data : {

                userId : data.creatorId,
                url : data.url,
                extractedId,
                type : "Youtube",
                title : res.title ?? "No name ",
                smallImageUrl : (thumbnails.length > 1 ? thumbnails[thumbnails.length -2].url : thumbnails[thumbnails.length -1].url) ?? "https://www.pexels.com/photo/portrait-of-a-tabby-cat-with-green-eyes-28989919/",
                bigImageUrl : (thumbnails[thumbnails.length -1].url) ?? "https://www.pexels.com/photo/portrait-of-a-tabby-cat-with-green-eyes-28989919/"
            }

        });
        return NextResponse.json({
            message : "stream created",
            id : stream.id
        })
    }
    catch(e){
        return NextResponse.json({
            message : "error creating a stream",
            error : e
        },{
            status : 411
        })
    }
    }

export async function GET(req : NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prismaClient.stream.findMany({
    where : {
        userId : creatorId ?? ""
    }})

    return NextResponse.json({
        streams
    })
}