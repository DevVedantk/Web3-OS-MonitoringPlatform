// import { client } from "@repo/db/client";
import dotenv from 'dotenv';
dotenv.config();
import z from 'zod';
import { client } from "@repo/db/client";
import otpgenerator from 'otp-generator';
import express from 'express';
const app=express();
import jwt from 'jsonwebtoken';
const JWT_KEY=process.env.JWT_KEY as string;
import cors from 'cors'
import cookieparser from 'cookie-parser';
app.use(cookieparser());
app.use(cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow credentials (cookies)
}))
app.use(express.json());


//add your site
app.post("/api/v1/website",async(req,res)=>{
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


app.get("/api/v1/userwebsites",async(req,res)=>{
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



app.get("/api/v1/website/status",async(req,res)=>{
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

app.delete("/api/v1/website/delete",async(req,res)=>{
           
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


app.post("/api/v1/user/signup",async(req,res)=>{
    console.log("reached!!")
try{
const RequiredTypes=z.object({
    email:z.string().min(5).max(100).email(),
    password:z.string().min(5).max(50).optional()
})
console.log("reached here");

const CheckedRequiredTypes=RequiredTypes.safeParse(req.body);
console.log(CheckedRequiredTypes)

if(!CheckedRequiredTypes.success){
    res.status(422).send("Invalid Input types");
    return;
}

console.log("reached here also");

const {email,password}=req.body;
console.log(email);
console.log(password);

const CheckedByEmail=await client.user.findUnique({
    where:{
        email:email
    }
})

if(CheckedByEmail){
    res.json({
        message:"Email_exists"
    })
    return;
}

 const PutUserIntoDB=await client.user.create({
    data:{
        email:email,
        password:password,
    }
 })

 const token=jwt.sign({
    userId:PutUserIntoDB.id
},JWT_KEY);

// console.log("token is : ",token);

 
res.cookie("uidcookie",token,{
    httpOnly:true,
    secure:false
})

res.json({
    message:"SignedUp"
})

} catch(e){
   console.log(e)
res.status(500).send("Something went Wrong!!!");
return;
}
})


app.post("/api/v1/user/signin",async(req,res)=>{
    
    console.log("recieved")
    console.log(req.body.email);
   try {
     
    const RequiredTypes=z.object({
        email:z.string().min(5).max(100).email(),
    })

    const CheckedRequiredTypes=RequiredTypes.safeParse(req.body);
     
    if(!CheckedRequiredTypes.success){
       res.status(422).send("Invalid_Input");
       return;
    }
    console.log("here also");
 
    const {email}=req.body;
    console.log("email is :",email);
   
    
    const CheckedByEmail=await client.user.findUnique({
        where:{
           email:email 
        }
    })

    console.log("here 2");
    console.log(CheckedByEmail);

    if(!CheckedByEmail){
       res.json({
        message:"not_found"
       })
       return;
    }


    const token=jwt.sign({
        userId:CheckedByEmail.id
    },JWT_KEY);
  
    res.cookie("uidcookie",token,{
        httpOnly:false,
        secure:false
    })
    res.json({
        message:"found",
        data:CheckedByEmail
    })


   } catch (error) {
       console.log(error);
       res.status(500).send("Something went wrong!!");
       return;
   }
})


app.post("/api/v1/user/logout",(req,res)=>{

    const token=req.cookies.uidcookie;
    if(!token){
        res.json({
            message:"unauths"
        })
        return;
    }   

    res.clearCookie("uidcookie", {
        httpOnly: false,  // Ensures the cookie cannot be accessed via JavaScript
        secure: true,    // Ensures the cookie is only sent over HTTPS
    });

    res.json({
        message:"logout"
    })
})


app.get("/api/v1/auths",async(req,res)=>{

    const token=req.cookies.uidcookie;
        if(!token){
            res.json({
                message:"unauths"
            })
            return;
        }   
       
        res.json({
            message:"authenticated"
         })
}) 


app.listen(3000,()=>{
    console.log("server started!!")
})