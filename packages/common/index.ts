

export interface IncomingSignUpMessage{
   callbackId:string,
   ip:string,
   publicKey:string,
   SignedMessage:string
}

export interface ValidateIncomingMessage{
    callbackId:string,
    status:"Good" | "Bad",
    latency:number,
    websiteId:string,
    validatorId:string,
    signedMessage:string
}

export interface ValidateOutgoingMessage{
    callbackId:string,
    url:string,
    websiteId:string
}


export interface OutgoingSignUpMessage{
  callbackId:string,
  validatorId:string,
}

export type IncomingMessage={
    type:"signup",
    data:IncomingSignUpMessage
} | {
   type:"validate",
   data:ValidateIncomingMessage
} 


export type OutgoingMessage={
    type:"signup",
    data:OutgoingSignUpMessage
} | {
   type:"validate",
   data:ValidateOutgoingMessage
} 