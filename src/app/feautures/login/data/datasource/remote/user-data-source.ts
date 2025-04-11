import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import 'rxjs/operators';
import AUtils from "../../../../../core/utility/autils";
import * as RxJS from "../../../../../core/rxjs-operators";
import { IAuthenticateModel,AuthenticateModel } from "../../models/authenticate-model";









@Injectable({providedIn:"root"})
export class UserDataSource{

  constructor(private _http:HttpClient){

  }
  
  fechUserLogin(clParam: IAuthenticateModel): RxJS.Observable <any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'text/plain',
      //'X-XSRF-TOKEN': 'CfDJ8Fw0la4BtGRHvRcDFGhNthcX3VhRzVTJGEI5Zv61UYBzy4q-tSntxVlzLBlcsM5eAbJu5exBigyFdreMtLGcSyexxcaHIBcOkPA9iB8agCK_aADREiZWd4teqicAbKj9cJ11BaBsSRq71HN3S9AK-KI'
    });
    const authModel = new AuthenticateModel(clParam);
    const body = authModel.toJSON();
    
    return this._http.post('http://192.168.20.12:2023/api/TokenAuth/Authenticate', body, { headers });
 
  }

}
