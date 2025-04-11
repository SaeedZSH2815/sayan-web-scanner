import { AfterViewInit, Component, computed, effect, ElementRef, OnDestroy, OnInit, resource, signal, viewChild, ViewChild } from '@angular/core';

import { UserLoginUseCase } from '../../domain/use-case/user-login-use-case';
import { UserRepository } from '../../domain/repositories/user-repository';
import { UserRepositoryImp } from '../../data/repository/user-repository-imp';
import { rxResource } from '@angular/core/rxjs-interop';
import { IAuthenticateModel } from '../../data/models/authenticate-model';
import { catchError, EMPTY, finalize, Observable, throwError, timeout } from 'rxjs';
import { CommonModule } from '@angular/common';
import {  FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataState } from '../../../../core/resource/data-state';
import { AuthenticateResultModel } from '../../domain/entities/user-entity';
import AUtils from '../../../../core/utility/autils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers:
  
  [
    { provide :UserRepository , useClass : UserRepositoryImp},
   
    {provide:UserLoginUseCase,
     useFactory:(userRepository:UserRepository)=>new UserLoginUseCase(userRepository),
     deps:[UserRepository]
    },
  
  ]
})
export class LoginComponent implements OnInit,AfterViewInit,OnDestroy {
 
  //#region \Properties
  userNameValue : string = "admin";
  passWordValue : string = "123qwe";
 
  messagePage : string = "";

  isLoading = signal(false);
 

  @ViewChild("loginForm") loginForm?: NgForm;
  @ViewChild("userNameEle") userNameEle?:ElementRef;
  @ViewChild("passwordEle") passwordEle?:ElementRef;

  credentials = signal<IAuthenticateModel | null>(null);
  
  
  loginResource = rxResource({
  
    request: () => this.credentials(), // Uses signal as input    
    
    loader: ({ request }) => 
            { if(request)
              {
               this.isLoading.set(true);
               return this.userLoginUseCase.exceute(request).pipe(
                
                // timeout(50000),
                // catchError(error => {
                //   if (error.name === 'TimeoutError') {
                //     this.messageLogin = '⏱ سرور پاسخ نداد. لطفاً دوباره تلاش کنید.';
                //   }
                //   return throwError(() => error);
                // }),
                
                
                
                finalize(() => this.isLoading.set(false))
               );           
            
             }
             else 
              {
                this.isLoading.set(false);
                return EMPTY
              }
             },

 
   });


  //#endregion

  
  constructor(public userLoginUseCase : UserLoginUseCase,private _router : Router)   
  {

    
    
    effect( () => {
    
      const state = this.loginResource.value();
     
      if (state?.data) {
        {               
          this.messagePage = state.error;  
          if( state.success ) 
          {
            this.setSectionTypeRouter();
          }
          
        }
      } else if (state?.error) {
        
      }
    });

        
   
  
  }
  ngOnDestroy(): void {
    this.loginResource.destroy();
  }
  
  ngAfterViewInit(): void {
   

  }
  
  ngOnInit(): void {

  }

  
  onChangeInput(clEvent : any)
  {
      this.messagePage = "";
  }

  
  onSubmitLoginForm(clLoginForm:NgForm){
    
      if(this.loginResource.status() == 2)
        return;
   
      if(!clLoginForm.valid)   
      {      
        
       
        if(!clLoginForm.controls["userName"].valid)
        {
          this.userNameEle?.nativeElement.focus();
          
        }
        if(!clLoginForm.controls["password"].valid)
        {
          this.passwordEle?.nativeElement.focus();
        }
      }
      else
       this.credentials.set({ userNameOrEmailAddress: this.userNameValue, password: this.passWordValue, rememberClient: false });
 
   }

   setSectionTypeRouter()
   {
     this._router.navigate(["/sectionTypeListPage"],{queryParams:[]});
   }

}