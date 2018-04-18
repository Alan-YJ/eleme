 export function saveStore(id,key,val){
     let seller = window.localStorage.__seller__;
     if(!seller){
         seller={};
         seller[id]={};
     }else{
         seller = JSON.parse(seller);
         if(!seller[id]){
            seller[id]={};
         }
     }
     seller[id] = val;
     window.localStorage.__seller__ = JSON.stringify(seller);
 }
 
 export function localFromLocal(id,key,def){
     let seller = window.localStorage.__seller__;
     if(!seller){
         return def;
     }
     seller = JSON.parse(seller);
     if(!seller[id]){
         return def;
     }
     return seller[id]||def;
 }