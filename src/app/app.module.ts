import { PassresetComponent } from './passreset/passreset.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { AdminCreationComponent } from './admin-creation/admin-creation.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { Moment } from 'moment';
import { OmarChartComponent } from './omar-chart/omar-chart.component';
import { UpdateMerchantComponent } from './update-merchant/update-merchant.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChartsModule, ThemeService } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RoutingState } from "./services/RoutingState";

import { NewMerchantComponent } from './new-merchant/new-merchant.component';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
//import {AuthenticationService} from './services/authentication.sevice';
import { GipService } from './services/gip.service';
import { PayementComponent } from './payement/payement.component';
import { GestionComponent } from './gestion/gestion.component';
import { FormComponent } from './form/form.component';
import { MerchantTransactionsComponent } from './merchant-transactions/merchant-transactions.component';
import { CommonUserService } from "./services/CommonUserService";
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { CustomerComponent } from './customer/customer.component';
import { MerchantComponent } from './merchant/merchant.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PayComponent } from './pay/pay.component';
import { NStransactionComponent } from './nstransaction/nstransaction.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ModalComponent } from './modal/modal.component';
import { ParamComponent } from './param/param.component';
import { qrComponent } from './qrgeneration/qr.component';
import { qrstaticComponent } from './qrstatic/qrstatic.component';
import { qrdynamicComponent } from './qrdynamic/qrdynamic.component';
import { qrTransactionComponent } from './qrtransaction/qrtransaction.component';
//import { qrTransactionLocationComponent } from './qrtransactionlocation/qrtransactionlocation.component';
import { NewqrstaticComponent } from './new-qrstatic/new-qrstatic.component';
import { NewqrdynamicComponent } from './new-qrdynamic/new-qrdynamic.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { MyDatePickerModule } from 'mydatepicker';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';//+++
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { SuccessPassComponent } from './success-pass/success-pass.component';
import { SmsPassComponent } from './sms-pass/sms-pass.component';
import { ForgotLoginComponent } from './forgot-login/forgot-login.component';//+++
import { ResetLoginComponent } from './reset-login/reset-login.component';
//import { SuccessPassComponent } from './success-pass/success-pass.component';
import { SmsPass1Component } from './sms-pass1/sms-pass1.component';
import { NewSiteModal } from './new-merchant/new-merchant.component';
import { NewAcceptorPointModal } from './new-merchant/new-merchant.component';
import { UpdateSiteModal } from './update-merchant/update-merchant.component';
import { UpdateAcceptorPointModal, GenerateQrModal } from './update-merchant/update-merchant.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, ViewportScroller } from '@angular/common';
import { chartComponent } from './line-chart/line-chart.component';
import { MatProgressSpinnerModule } from '@angular/material';
import * as i18nIsoCountries from 'i18n-iso-countries';
import { DataTablesModule } from 'angular-datatables';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component';
import { BulkMerchantsComponent } from './bulk-merchants/bulk-merchants.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { BulkMerchantsValidationComponent } from './bulk-merchants-validation/bulk-merchants-validation.component';
import { BulkMerchantsManagementListComponent } from './bulk-merchants-management-list/bulk-merchants-management-list.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { OutSessionComponent } from './out-session/out-session.component';
const appRoutes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "signUp", component: SignupComponent },
  { path: "payement/:secure", component: PayementComponent },
  { path: "gestion", component: GestionComponent },
  { path: "form", component: FormComponent },
  { path: "addMerchant", component: NewMerchantComponent },
  { path: "merchantDetails", component: UpdateMerchantComponent },
  { path: "merchantTrans", component: MerchantTransactionsComponent },
  { path: "customer", component: CustomerComponent },
  { path: "param/session", component: ParamComponent },
  { path: "param/token", component: ParamComponent },
  { path: "merchant", component: MerchantComponent },
  { path: "transaction", component: TransactionComponent },
  { path: "nstransaction", component: NStransactionComponent },
  { path: "line-chart", component: chartComponent },
  { path: "qr", component: qrComponent },
  { path: "omar-chart", component: OmarChartComponent },
  { path: "forgotPass", component: ForgotPassComponent },
  { path: "resetPass", component: ResetPassComponent },
  { path: "forgotLogin", component: ForgotLoginComponent },
  { path: "resetLogin", component: ResetLoginComponent },
  { path: "successPass", component: SuccessPassComponent },
  { path: "smsPass", component: SmsPassComponent },
  { path: "smsPass1", component: SmsPass1Component },
  //{path:"qr",component:MerchantTransactionsComponent},
  { path: "qrstatic", component: qrstaticComponent },
  { path: "qrdynamic", component: qrdynamicComponent },
  { path: "qrtransaction", component: qrTransactionComponent },
  //{path:"qrtransactionlocation",component:qrTransactionLocationComponent},
  { path: "addqrstatic", component: NewqrstaticComponent },
  { path: "addqrdynamic", component: NewqrdynamicComponent },
  { path: "adminList", component: AdminListComponent },
  { path: "adminDetails", component: AdminDetailsComponent },
  { path: "newAdmin", component: AdminCreationComponent },
  { path: "reports", component: ReportsComponent },
  { path: "passreset", component: PassresetComponent },
  /*SAFIA 04.10.2021 */
  { path: "otp", component: OtpComponent },
  { path: "bulkMerchants", component: BulkMerchantsComponent },
  { path: "bulkMerchantsValidation", component: BulkMerchantsValidationComponent },
  { path: "merchantManagementList", component: BulkMerchantsManagementListComponent}



  //,{path:'' , redirectTo:'/login',pathMatch:'full'}

  //prefix
  /*,{path:'' , redirectTo:'/login', pathMatch:'full'}*/
];


@NgModule({
  declarations: [
    AppComponent,
    PassresetComponent,
    ReportsComponent,
    LoginComponent,
    chartComponent,
    OmarChartComponent,
    NewMerchantComponent,
    PayementComponent,
    GestionComponent,
    FormComponent,
    MerchantTransactionsComponent,
    ForgotPassComponent,
    ResetPassComponent,
    ForgotLoginComponent,
    ResetLoginComponent,
    SuccessPassComponent,
    SmsPassComponent,
    SmsPass1Component,
    AppheaderComponent,
    AppmenuComponent,
    CustomerComponent,
    MerchantComponent,
    TransactionComponent,
    PayComponent,
    NStransactionComponent,
    ModalComponent,
    qrComponent,
    qrstaticComponent,
    qrdynamicComponent,
    qrTransactionComponent,
    AdminListComponent,
    AdminCreationComponent,
    AdminDetailsComponent,
    //qrTransactionLocationComponent,
    NewqrstaticComponent,
    NewqrdynamicComponent,
    ParamComponent,
    NewSiteModal,
    NewAcceptorPointModal,
    UpdateMerchantComponent,
    UpdateSiteModal,
    UpdateAcceptorPointModal,
    GenerateQrModal,
    SignupComponent,
    OtpComponent,
    BulkMerchantsComponent,
    BulkMerchantsValidationComponent,
    BulkMerchantsManagementListComponent,
    ScrollToTopComponent
    // , OutSessionComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    FontAwesomeModule,//omar
    NgbModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    // DataTablesModule,
    Ng2SearchPipeModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    /* SAFIA 08.12.2021 
    FIXING ROUTES ISSUE ON SERVER 
    */
    RouterModule.forRoot(appRoutes, { useHash: true })
    //, DataTableModule
  ],
  //AuthenticationService,
  providers: [NgxNavigationWithDataComponent, GipService, RoutingState, ThemeService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    ModalComponent,
    NewSiteModal,
    NewAcceptorPointModal,
    UpdateSiteModal,
    UpdateAcceptorPointModal,
    GenerateQrModal
  ],
})
export class AppModule { }
