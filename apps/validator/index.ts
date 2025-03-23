import { randomUUIDv7 } from "bun";
import type { OutgoingMessage, OutgoingSignUpMessage, ValidateOutgoingMessage } from "common/types";

const CALLBACKS:{[callbackId:string]:(data:OutgoingSignUpMessage) => void}={};
let validatorId: string | null = null;


async function main(){

    const ws=new WebSocket("ws://localhost:8080");

    ws.onmessage=async(event)=>{
        const data:OutgoingMessage=JSON.parse(event.data);

        if(data.type==="signup"){
            CALLBACKS[data.data.callbackId]?.(data.data)
            delete CALLBACKS[data.data.callbackId]
        } else if(data.type==="validate"){
            await validateHandler(ws,data.data);
        }
    }

    ws.onopen=async()=>{
        const callbackId=randomUUIDv7();
        CALLBACKS[callbackId]=(data:OutgoingSignUpMessage)=>{
             validatorId=data.validatorId;

             ws.send(JSON.stringify({
                type:"signup",
                data:{
                    callbackId:callbackId,
                    ip:"127.0.0.1",
                }
             }))
        }
    }
}

async function validateHandler(ws:WebSocket,{url,websiteId,callbackId}:ValidateOutgoingMessage) {
    
    console.log(`Validating ${url}`);
    const startTime = Date.now();

    try{
          
        const responseTime=await fetch(url);
        const endTime=Date.now();

        const latency=endTime-startTime;
        const status=responseTime.status;

        ws.send(JSON.stringify({
            type:"validate",
            data:{
                callbackId,
                status : status===200 ? "Good" :"Bad",
                latency:latency,
                websiteId:websiteId,
                validatorId:validatorId
            }
        }))
    } catch(error){
        ws.send(JSON.stringify({
            type:"validate",
            data:{
                callbackId,
                status : 'Bad',
                latency:1000,
                websiteId:websiteId,
                validatorId:validatorId
            }
        }))
        console.log(error);
    }
}

main();

setInterval(async()=>{

},1000)