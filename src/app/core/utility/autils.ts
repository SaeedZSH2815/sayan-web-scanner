// export function AgetClassName(clObject : any):string{
//   if (clObject == null) {
//    return "null";
//   }
//   else if (typeof clObject === "undefined" ){
//     return "undefined";
//   }
//   return clObject.constructor.name;
// }

import { Subscription } from "rxjs";

class AUtils{

 static getClassName(clObject : any):string{


    if (clObject == null) {
     return "null";
    }
    else if (typeof clObject === "undefined" ){
      return "undefined";
    }
    return clObject.constructor.name;
  }

 static objectIsArray(clObject : any): boolean{
   return Array.isArray(clObject);
  }

 static Unsubscribed(clObj : Subscription){
   if(clObj)
    clObj.unsubscribe();
 }
}

export default AUtils;
