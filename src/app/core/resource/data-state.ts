export class DataState<T>{
   public  data?   : T;
   public  success : boolean = false;
   public  error?  : any;
 }



 export class DataSuccess<T> extends DataState<T> {

}

export class DataFailed<T> extends DataState<T> {

}

