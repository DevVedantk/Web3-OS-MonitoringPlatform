import { client } from "@repo/db/client";

import express from 'express';
const app=express();

//add your site
app.post("api/v1/website",async(req,res)=>{
    //here we want userId from token
    const tokenUserId=req.cookies.uidcookie;
    if(!tokenUserId){
        res.json({
            message:"unauths"
        })
        return;
    }   

   
    const {WebsiteUrl}=req.body;
      
   const resp=await client.website.create({
        data:{
        url:WebsiteUrl,
        userId:tokenUserId
        }
     })

     res.json({
        websiteId:resp.id
     })
})


app.get("api/v1/userwebsites",async(req,res)=>{
           //here we want userId from token
    const tokenUserId=req.cookies.uidcookie;
    if(!tokenUserId){
        res.json({
            message:"unauths"
        })
        return;
    }  
     await client.website.findMany({
        where:{
         userId:tokenUserId,
         disabled:false

        }
     })

})



app.get("api/v1/website/status",async(req,res)=>{
    const tokenUserId=req.cookies.uidcookie;
    if(!tokenUserId){
        res.json({
            message:"unauths"
        })
        return;
    }  
    const {WebsiteId}=req.body;
    const resp=await client.website.findFirst({
     where:{
       id:WebsiteId,
       userId:tokenUserId,
       disabled:false
     },
      include:{
        websiteTick:true
      }
    })

  if(resp) { res.json({
        message:"it 's up"
    })
}
})

app.delete("api/v1/website/delete",async(req,res)=>{
           
    const tokenUserId=req.cookies.uidcookie;
    if(!tokenUserId){
        res.json({
            message:"unauths"
        })
        return;
    }  
    const {WebsiteId}=req.body;

    const resp=await client.website.update({
        where:{
            id:WebsiteId
        },
        data:{
          disabled:true
        }
    })

    res.json({
        message:"Deleted!!!"
    })
})

app.listen(3000,()=>{
    console.log("server started!!")
})