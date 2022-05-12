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
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
import { BulkMerchantsManagementListComponent } from './merchants-management-list/merchants-management-list.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { OutSessionComponent } from './out-session/out-session.component';
import { BulkMerchantsManagementDetailsComponent } from './merchants-management-details/merchants-management-details.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { GenerateQrModalDetails, MerchantDetailsComponent, SiteDetailComponent, UpdateAcceptorPointDetails } from './merchant-details/merchant-details.component';
import { GenerateQrComponent, GenerateQrModalAcceptorPoint } from './generate-qr/generate-qr.component';
import { CreateSingleBulkMerchantComponent } from './create-single-bulk-merchant/create-single-bulk-merchant.component';
import { BulkMerchantsValidationAtBranchComponent } from './bulk-merchants-validation-at-branch/bulk-merchants-validation-at-branch.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SuccessChangeComponent } from './success-change/success-change.component';
import { SubUserManagementComponent } from './sub-user-management/sub-user-management.component';
import { SubUserManagementCreationComponent } from './sub-user-management-creation/sub-user-management-creation.component';
import { SubUserManagementDetailsComponent } from './sub-user-management-details/sub-user-management-details.component';
import { ReportsBulkMerchantComponent } from './reports-bulk-merchant/reports-bulk-merchant.component';
import { GestionReportsComponent } from './gestion-reports/gestion-reports.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MerchantsTransactionsComponent } from './merchants-transactions/merchants-transactions.component';
import { DetailsMerchantsComponent } from './details-merchants/details-merchants.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllMerchantsComponent } from './gestion-reports/all-merchants/all-merchants.component';
import { AllSuspendedMerchantsComponent } from './gestion-reports/all-suspended-merchants/all-suspended-merchants.component';
import { AllActivatedMerchantsComponent } from './gestion-reports/all-activated-merchants/all-activated-merchants.component';
import { AllBulkMerchantsComponent } from './gestion-reports/all-bulk-merchants/all-bulk-merchants.component';
import { AllRejectedMerchantsComponent } from './gestion-reports/all-rejected-merchants/all-rejected-merchants.component';
import { AllValidatedMerchantsComponent } from './gestion-reports/all-validated-merchants/all-validated-merchants.component';
import { AllValidatedBulkMerchantsByBranchAComponent } from './gestion-reports/all-validated-bulk-merchants-by-branch-a/all-validated-bulk-merchants-by-branch-a.component';
import { AllRejectedBulkMerchantsAByBranchComponent } from './gestion-reports/all-rejected-bulk-merchants-a-by-branch/all-rejected-bulk-merchants-a-by-branch.component';
import { AllValidatedBulkMerchantsByBranchComponent } from './gestion-reports/all-validated-bulk-merchants-by-branch/all-validated-bulk-merchants-by-branch.component';
import { AllRejectedBulkMerchantsByBranchComponent } from './gestion-reports/all-rejected-bulk-merchants-by-branch/all-rejected-bulk-merchants-by-branch.component';

// import { ShowHidePasswordModule } from 'ngx-show-hide-password';

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
  { path: "merchantList", component: MerchantListComponent },
  { path: "transaction", component: TransactionComponent },
  { path: "nstransaction", component: NStransactionComponent },
  { path: "line-chart", component: chartComponent },
  { path: "qr", component: qrComponent },
  { path: "omar-chart", component: OmarChartComponent },
  { path: "forgotPass", component: ForgotPassComponent },
  { path: "resetPass", component: ResetPassComponent },
  { path: "resetPasswordFirstConnection", component: ResetPasswordComponent },
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
  { path: "merchantManagementList", component: BulkMerchantsManagementListComponent},
  { path: "merchantManagementDetail", component: BulkMerchantsManagementDetailsComponent},
  { path: "merchantDetail", component: MerchantDetailsComponent},
  { path: "generateQr", component: GenerateQrComponent},
  { path: "createSingleBulkMerchant", component: CreateSingleBulkMerchantComponent},
  { path: "getAllBulkMerchantsFoValidation", component: BulkMerchantsValidationAtBranchComponent},
  { path: "resetPasswordFirstConnection", component: ResetPasswordComponent},
  { path: "successChange", component: SuccessChangeComponent},
  { path: "subUserManagement", component: SubUserManagementComponent},
  { path: "subUserManagementCreation", component: SubUserManagementCreationComponent},
  { path: "subUserManagementDetails", component: SubUserManagementDetailsComponent},
  { path: "reportsBulkMerchant", component: ReportsBulkMerchantComponent},
  { path: "gestionReports", component: GestionReportsComponent},
  { path: "transactions", component: MerchantsTransactionsComponent},
  { path: "detailsMerchant", component: DetailsMerchantsComponent},
  { path: "allMerchantsReports", component: AllMerchantsComponent},
  { path: "allSuspendedMerchant", component: AllSuspendedMerchantsComponent},
  { path: "allActivatedMerchant", component: AllActivatedMerchantsComponent},
  { path: "allRejectedBulkMerchant", component: AllRejectedMerchantsComponent},
  { path: "allValidatedBulkMerchant", component: AllValidatedMerchantsComponent},
  { path: "allBulkMerchantsReport", component: AllBulkMerchantsComponent},
  { path: "allValidatedBulkMerchantByBranch", component: AllValidatedBulkMerchantsByBranchAComponent},
  { path: "allRejectedBulkMerchantByBranch", component: AllRejectedBulkMerchantsAByBranchComponent},
  { path: "allValidatedBulkMerchantByBranchReport", component: AllValidatedBulkMerchantsByBranchComponent},
  { path: "allRejectedBulkMerchantByBranchReport", component: AllRejectedBulkMerchantsByBranchComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}


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
    SiteDetailComponent,
    UpdateAcceptorPointDetails,
    UpdateAcceptorPointModal,
    GenerateQrModal,
    GenerateQrModalDetails,
    SignupComponent,
    OtpComponent,
    BulkMerchantsComponent,
    BulkMerchantsValidationComponent,
    BulkMerchantsManagementListComponent,
    ScrollToTopComponent,
    BulkMerchantsManagementDetailsComponent,
    MerchantListComponent,
    MerchantDetailsComponent,
    GenerateQrComponent,
    CreateSingleBulkMerchantComponent,
    BulkMerchantsValidationAtBranchComponent,
    ResetPasswordComponent,
    SuccessChangeComponent,
    SubUserManagementComponent,
    SubUserManagementCreationComponent,
    SubUserManagementDetailsComponent,
    ReportsBulkMerchantComponent,
    GestionReportsComponent,
    MerchantsTransactionsComponent,
    DetailsMerchantsComponent,
    PageNotFoundComponent,
    GenerateQrModalAcceptorPoint,
    AllMerchantsComponent,
    AllSuspendedMerchantsComponent,
    AllActivatedMerchantsComponent,
    AllRejectedMerchantsComponent,
    AllBulkMerchantsComponent,
    AllValidatedMerchantsComponent,
    AllValidatedBulkMerchantsByBranchAComponent,
    AllRejectedBulkMerchantsAByBranchComponent,
    AllRejectedBulkMerchantsByBranchComponent,
    AllValidatedBulkMerchantsByBranchComponent
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
    // ShowHidePasswordModule,
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
    SiteDetailComponent,
    UpdateAcceptorPointModal,
    UpdateAcceptorPointDetails,
    GenerateQrModal,
    GenerateQrModalDetails,
    GenerateQrModalAcceptorPoint
  ],
})
export class AppModule { }
