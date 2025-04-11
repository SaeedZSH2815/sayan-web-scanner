import { Observable } from "rxjs";
import { DataState } from "../../../../core/resource/data-state";
import { AuthenticateResultModel, UserEntity } from "../entities/user-entity";
import { IAuthenticateModel } from "../../data/models/authenticate-model";

export abstract class UserRepository{

    abstract UserLogin(clParam:IAuthenticateModel):Observable<DataState<AuthenticateResultModel>>;
  }