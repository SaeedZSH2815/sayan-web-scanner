import { Observable } from "rxjs";
import { DataState } from "../../../../core/resource/data-state";
import { UseCase } from "../../../../core/resource/use-case";
import { AuthenticateResultModel, UserEntity } from "../entities/user-entity";
import { UserRepository } from "../repositories/user-repository";
import { IAuthenticateModel } from "../../data/models/authenticate-model";
import { Injectable } from "@angular/core";


@Injectable()
export class  UserLoginUseCase implements UseCase<IAuthenticateModel,DataState<AuthenticateResultModel>>
{


  constructor(private _userRepository : UserRepository)
  {

  }

  
  exceute(clParam: IAuthenticateModel ): Observable<DataState<AuthenticateResultModel>> {
    
    return this._userRepository.UserLogin(clParam).pipe();

  }



}