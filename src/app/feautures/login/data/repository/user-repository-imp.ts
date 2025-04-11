import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';

import { UserDataSource } from '../datasource/remote/user-data-source';
import { DataState} from '../../../../core/resource/data-state';
import { DataFailed,DataSuccess} from '../../../../core/resource/data-state';
import { Injectable } from '@angular/core';
import { UserRepository } from '../../domain/repositories/user-repository';
import { AuthenticateResultModel, UserEntity } from '../../domain/entities/user-entity';
import { IAuthenticateModel } from '../models/authenticate-model';


@Injectable({providedIn:"root"})

export  class UserRepositoryImp implements UserRepository{

  

  constructor(private _userDataSource : UserDataSource)
  {

  }

  UserLogin(clParam: IAuthenticateModel): Observable<DataState<AuthenticateResultModel>> {

      return this._userDataSource.fechUserLogin(clParam).pipe(   
        //map((value:any)=>value["result"]),
      //   map((value:AuthenticateResultModel)=>{
      //     const Ldata  : DataSuccess<AuthenticateResultModel> = new DataSuccess<AuthenticateResultModel>;
      //           Ldata.data = value;
      //           Ldata.error = null;
      //     return Ldata;
      //   }
      // )

        map( (value:any )=>{  return proccessAuth(value); }
      )

      
      ,
        catchError((error)=>{
          console.log(error);
          const safeError = typeof error === "object" ? error:{};
   
          const dataError = safeError?.["error"]?.["error"]   
                   
          const dataFailed  : DataFailed<any> = new DataFailed<any>;
          
          dataFailed.data = [];
          //Ldata.error = `${dataError["message"] || "Unknown error"} ${dataError["details"] || ""}`.trim();
          dataFailed.error = "نام کاربری یا رمز ورود اشتباه است";                   
          return of(dataFailed);

        })

      );






      }
 }
function proccessAuth(value: any): DataState<any> {
  
  const data = typeof value === 'object' ? value : {};
  if(data["result"])
  {
    
    const dataSuccess  : DataSuccess<AuthenticateResultModel> = new DataSuccess<AuthenticateResultModel>;
    dataSuccess.success = true;
  //  const result = Object.assign(new AuthenticateResultModel(), data["result"]);
    dataSuccess.data = data["result"] ;
    //dataSuccess.data = new AuthenticateResultModel();
    
    return dataSuccess;
  }

  if(data["error"])
    {
      const dataFailed  : DataFailed<string> = new DataFailed<string>;
      dataFailed.data = data["error"]["message"];
      return dataFailed;
    } 
    const dataFailed  : DataFailed<string> = new DataFailed<string>;
    dataFailed.data  ="error";
    return dataFailed;     
}

