import { client } from "@repo/db/client";
import {randomUUIDv7, type ServerWebSocket } from "bun";
import type { IncomingMessage, IncomingSignUpMessage } from "common/types";

const availableValidator:{validatorId:string,socket:ServerWebSocket<unknown>}[]=[];
const CALLBACKS:{[callbackId:string]:(data:IncomingMessage)=>void}={};

Bun.serve({
    fetch(req,server){
      if(server.upgrade(req)){
        return;
      }
      return new Response("upgrade fail",{status:500})
    },
    port:8080,
    websocket:{
        
        async message(ws:ServerWebSocket<unknown>,message:string){ 
              const data:IncomingMessage=JSON.parse(message);

              console.log("inside socekt function");
              if(data.type==="signup"){
                console.log("inside signup function")
                 await signedUpHandler(ws,data.data);
              } else if(data.type==="validate"){
                 CALLBACKS[data.data.callbackId](data);
                 delete CALLBACKS[data.data.callbackId]
              }
        },
        async close(ws:ServerWebSocket<unknown>) {
             availableValidator.splice(availableValidator.findIndex(v=>v.socket===ws),1);
        }
    }
})


async function signedUpHandler(ws:ServerWebSocket<unknown>,{ip,callbackId,publicKey,SignedMessage}:IncomingSignUpMessage){
      
   const resp=await client.validator.findFirst({
        where:{
            publicKey:publicKey
        }
    })
    let validatorId="";

    if(resp){
         ws.send(JSON.stringify({
             type:"signup",
             data:{
                validatorId:resp.id,
                callbackId:callbackId
             }
         }))

         validatorId=resp.id;
    } else{
       const putValidator=await client.validator.create({
         data:{
            ipAddress:ip,
            publicKey:publicKey,
            Location:"unknown"
         }
        })
         
        ws.send(JSON.stringify({
            type:"signup",
            data:{
               validatorId:putValidator.id,
               callbackId:callbackId
            }
        }))

        validatorId=putValidator.id;
    }

    availableValidator.push({
        validatorId:validatorId,
        socket:ws
    })
    
}


setInterval(async()=>{
    
    const websiteToMonitors=await client.website.findMany({
        where:{
            disabled:false
        }
    })

    for(const website of websiteToMonitors){
        availableValidator.forEach(validator=>{
            const callbackId=randomUUIDv7();
            validator.socket.send(JSON.stringify({
                type:"validate",
                data:{
                    url:website.url,
                    callbackId:callbackId
                }
            }))
            
            CALLBACKS[callbackId]=async(data:IncomingMessage)=>{

                if(data.type==="validate"){

                    const {latency,status,websiteId,validatorId}=data.data;
                   
                    await client.webSiteTick.create({
                        data:{
                            latency:latency,
                            websiteStatus:status,
                            createdAt:new Date(),
                            WebsiteId:websiteId,
                            ValidatorId:validatorId
                        }
                    })
                }
            }
        })
    }
    



},1000*60)