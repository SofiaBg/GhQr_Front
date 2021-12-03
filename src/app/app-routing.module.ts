import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/service/auth/auth.guard';//++++
import { SignGuard } from 'src/app/service/auth/sign.guard';
import { SignGuard1 } from 'src/app/service/auth/sign1.guard';
import { MerchantTransactionsComponent } from './merchant-transactions/merchant-transactions.component';
import { LoginComponent } from './login/login.component';
import { qrstaticComponent } from './qrstatic/qrstatic.component';
import { qrdynamicComponent } from './qrdynamic/qrdynamic.component';
import { NewqrstaticComponent } from './new-qrstatic/new-qrstatic.component';
import { NewqrdynamicComponent } from './new-qrdynamic/new-qrdynamic.component';
import { NewMerchantComponent } from './new-merchant/new-merchant.component';
import { MerchantComponent } from './merchant/merchant.component';
import { qrTransactionComponent } from './qrtransaction/qrtransaction.component';
//import { qrTransactionLocationComponent } from './qrtransactionlocation/qrtransactionlocation.component';
import { qrComponent } from './qrgeneration/qr.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';//+++
import { ResetPassComponent } from './reset-pass/reset-pass.component';//+++
import { SuccessPassComponent } from './success-pass/success-pass.component';//+++
import { SmsPassComponent } from './sms-pass/sms-pass.component';//+++
import { ForgotLoginComponent } from './forgot-login/forgot-login.component';//+++
import { ResetLoginComponent } from './reset-login/reset-login.component';//+++
//--import { SuccessLoginComponent } from './success-login/success-login.component';//+++
import { SmsPass1Component } from './sms-pass1/sms-pass1.component';//+++


const routes: Routes = [
  { path: '', redirectTo :'/login', pathMatch: 'full' },//+++
  //{path:"login", component:LoginComponent, canActivate: [SignGuard]},//+++
  {path:"login", component:LoginComponent, canActivate: [SignGuard1]},
//+++
/*{
  path: 'merchantTrans',
  canActivate: [AuthGuard],
  component: MerchantTransactionsComponent
},

  {path:"qrstatic",canActivate: [AuthGuard],component:qrstaticComponent},
  {path:"qrdynamic",canActivate: [AuthGuard],component:qrdynamicComponent},
  {path:"addqrstatic",canActivate: [AuthGuard],component:NewqrstaticComponent},
  {path:"addqrdynamic",canActivate: [AuthGuard],component:NewqrdynamicComponent},
  {path:"merchant",canActivate: [AuthGuard],component:MerchantComponent},
  {path:"qrtransaction",canActivate: [AuthGuard],component:qrTransactionComponent},
  {path:"addMerchant",canActivate: [AuthGuard],component:NewMerchantComponent},
  //{path:"qrtransactionlocation",canActivate: [AuthGuard],component:qrTransactionLocationComponent},
  {path:"qr",canActivate: [AuthGuard],component:qrComponent},
  {path: 'forgotPass', component: ForgotPassComponent},
{path: 'resetPass', component: ResetPassComponent},
{path: 'successPass', component: SuccessPassComponent},
{path: 'smsPass', component: SmsPassComponent},
{path: 'forgotLogin', component: ForgotLoginComponent},
{path: 'resetLogin', component: ResetLoginComponent},
{path: 'smsPass1', component: SmsLoginComponent},*/

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard,SignGuard, SignGuard1]
})
export class AppRoutingModule { }