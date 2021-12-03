import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt'
import { Merchant } from '../new-merchant/new-merchant.component';
import { MerchantCities } from '../classes/MerchantCities';
import { MerchantRegions } from '../classes/MerchantRegions';
import { MerchantStatus } from '../classes/MerchantStatus';
import { MerchantLegalForm } from '../classes/MerchantLegalForm';
import { MerchantMCC } from '../classes/MerchantMCC';
import { MerchantLegalIDType } from '../classes/MerchantLegalDType';
import { Countries } from '../classes/Countries';
import { ZipCodes } from '../classes/ZipCodes';
import { MerchantUsage } from '../classes/MerchantUsage';
import { MerchantBank } from '../classes/MerchantBank';
import { MerchantBranch } from '../classes/MerchantBranch';
import { ModeSending } from '../classes/ModeSending';
import { SiteStatus } from '../classes/SiteStatus';
import { strictEqual } from 'assert';
import { data } from 'jquery';
//import {JwtHelperService} from 'angular-jwt'
//import {JwtHelperService} from

@Injectable()
export class GipService {

  //
  // private host: string = "http://172.27.21.74:8080/ACPG";
  // 172.27.8.74 //172.27.21.74
  /* SAFIA 15.09.2021 */
  // private host: string = "http://localhost:8080";
  // test server 

  /* SAFIA  15.09.2021 */
  // private host: string = "https://172.30.180.44:8443/ACPG-1-0.0.1-SNAPSHOTomar";
  /* SAFIA 23.09.2021 */
  private host: string = "https://qrtest.apps.cbg.com.gh/ACPG-1-0.0.1-SNAPSHOTomar";

  //private host: string = "http://172.30.180.44:8080/ACPG-1-0.0.1-SNAPSHOT";

  //private host: string = "http://172.30.180.60:8080/ACPG-1-0.0.1-SNAPSHOT";
  //private host: string = "http://192.168.1.26:8080/ACPG-1-0.0.1-SNAPSHOT";
  //private host: string = "http://192.168.140.98:8080/ACPG-1-0.0.1-SNAPSHOT";

  private jwtToken: string;
  private idAccount: string;
  private roles: Array<any> = [];
  private signature: string;

  constructor(private http: HttpClient) {
    this.jwtToken = localStorage.getItem("token");
  }

  login(user) {
    return this.http.post(this.host + "/login", user, { observe: 'response' })
  }

  saveIdAccount(id) {
    this.idAccount = id;
    localStorage.setItem("idAccount", id);
  }

  loadIdAccount() {
    this.idAccount = localStorage.getItem('idAccount');
    return this.idAccount;
  }

  logOutMerchant() {
    this.idAccount = null;
    localStorage.removeItem('idAccount');
    this.logout();
  }

  stringJson: any;

  stringObject: any;

  saveToken(jwtToken) {
    this.jwtToken = jwtToken;
    localStorage.setItem("token", jwtToken);
    let jwtHelper = new JwtHelperService()
    console.log(jwtHelper.decodeToken(this.jwtToken))


    this.stringJson = JSON.stringify(jwtHelper.decodeToken(this.jwtToken));
      // console.log("String json object :", this.stringJson);
      // console.log("Type :", typeof this.stringJson);

      // ConvertjSON to an object
      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);
      console.log(this.stringObject.name)
      localStorage.setItem('Name',this.stringObject.name);

    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
    let username = jwtHelper.decodeToken(this.jwtToken).sub;
    console.log("usernammmmmmmmmmmmmmmmeeeeeeeeee " + username);

    // jwtHelper.dec
    /* letjwtHelper = newJwtHelper();
     this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
     */
    return username;
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
    return this.jwtToken;
  }

  logout() {
    this.jwtToken = null;
    localStorage.removeItem('token');
    localStorage.removeItem('merchant');
    localStorage.removeItem('user');//+++
  }

  isAdmin() {
    for (let r of this.roles) {
      if (r.authority == 'ADMIN') return true;
    }
    return false;
  }

  isSuperAdmin() {
    for (let r of this.roles) {
      if (r.authority == 'SUPERADMIN') return true;
    }
    return false;
  }
  //

  /* SAFIA 14.09.2021*/
  getMerchantCities(): Observable<MerchantCities[]> {
    return this.http.get<MerchantCities[]>(this.host + "/allMerchantCities", { headers: { 'Authorization': this.jwtToken } });
  }

  /* SAFIA 14.09.2021 */
  getMerchantRegions(): Observable<MerchantRegions[]> {
    return this.http.get<MerchantRegions[]>(this.host + "/allMerchantRegions", { headers: { 'Authorization': this.jwtToken } });
  }

  /* SAFIA 14.09.2021 */
  getMerchantStatus(): Observable<MerchantStatus[]> {
    return this.http.get<MerchantStatus[]>(this.host + "/allMerchantStatus", { headers: { 'Authorization': this.jwtToken } });
  }

  /* SAFIA 14.09.2021 */
  getMerchantLegalForm(): Observable<MerchantLegalForm[]> {
    return this.http.get<MerchantLegalForm[]>(this.host + "/allMerchantLegalForm", { headers: { 'Authorization': this.jwtToken } });
  }

  /* SAFIA 15.09.2021 */
  getMerchantMCC(): Observable<MerchantMCC[]> {
    return this.http.get<MerchantMCC[]>(this.host + "/allMerchantMCC", { headers: { 'Authorization': this.jwtToken } });
  }

  /* SAFIA 15.09.2021 */
  getMerchantLegalIDType(): Observable<MerchantLegalIDType[]> {
    return this.http.get<MerchantLegalIDType[]>(this.host + "/allMerchantLegalIDType", { headers: { 'Authorization': this.jwtToken } });
  }

  /* SAFIA 15.09.2021 */
  getCountries(): Observable<Countries[]> {
    return this.http.get<Countries[]>(this.host + "/allCountries", { headers: { 'Authorization': this.jwtToken } });
  }

  /* SAFIA 15.09.2021 */
  getZipCodes(): Observable<ZipCodes[]> {
    return this.http.get<ZipCodes[]>(this.host + "/allZipCodes", { headers: { 'Authorization': this.jwtToken } });
  }

  /* SAFIA 15.09.2021 */
  getMerchantUsage(): Observable<MerchantUsage[]> {
    return this.http.get<MerchantUsage[]>(this.host + "/allMerchantUsage", { headers: { 'Authorization': this.jwtToken } });
  }

  /* SAFIA 15.09.2021 */
  getMerchantBank(): Observable<MerchantBank[]> {
    return this.http.get<MerchantBank[]>(this.host + "/allMerchantBank", { headers: { 'Authorization': this.jwtToken } })
  }

  /* SAFIA 15.09.2021 */
  getMerchantBranch(): Observable<MerchantBranch[]> {
    return this.http.get<MerchantBranch[]>(this.host + "/allMerchantBranch", { headers: { 'Authorization': this.jwtToken } })
  }

  /* SAFIA 16.09.2021 */
  getModeSending(): Observable<ModeSending[]> {
    return this.http.get<ModeSending[]>(this.host + "/allModeSending", { headers: { 'Authorization': this.jwtToken } })
  }

  /* SAFIA 20.09.2021 */
  deleteMerchant(id: string) {
    return this.http.get(this.host + "/deleteQrMerchant/" + id, { headers: { 'Authorization': this.jwtToken } })
  }

  /* SAFIA 21.09.2021 */
  getSiteStatus(): Observable<SiteStatus[]> {
    return this.http.get<SiteStatus[]>(this.host + "/allSiteStatus/", { headers: { 'Authorization': this.jwtToken } })
  }

  /* SAFIA 28.09.2021*/
  getMerchantInfoByAccountNumber(accountNumber: string) {
    return this.http.get(this.host + "/getMerchantInfoByAccountNumber/" + accountNumber, { headers: { 'Authorization': this.jwtToken } })
  }

  /* SAFIA 30.09.2021*/
  checkAcceptorPointByPhoneNumber(phoneNumber: string) {
    return this.http.get(this.host + "/checkAcceptorPointByPhoneNumber/" + phoneNumber)
  }

  /*SAFIA 01.10.2021*/
  checkPersonByPhone(phone: string) {
    return this.http.get(this.host + "/checkPersonByPhone/" + phone)
  }

  //   //SAFIA 01.10.2021
  // checkUserInfo(accountNumber){
  //   return this.http.get(this.host + "/checkUserInfo/" + accountNumber)
  // }

  /*SAFIA 04.10.2021*/
  checkByMobileNumberToSave(phone: string) {
    return this.http.get(this.host + "/checkByMobileNumberToSave/" + phone)
  }

  checkOtpCode(mobileNumber: string, otp: any) {
    return this.http.get(this.host + "/checkOtpCode?mobileNumber=" + mobileNumber + "&otp=" + otp)

  }

  /*SAFIA 04.10.2021*/
  sendOtpCode(mobileNumber: string) {
    return this.http.get(this.host + "/sendOTPCode/" + mobileNumber)
  }

  /* SAFIA 06.10.2021 */
  saveUser(user) {
    return this.http.post(this.host + "/saveUser", user);
  }

  /* SAFIA 08.10.2021 */
  allMerchantsPdf(dateFrom: string, dateTo: string) {
    return this.http.get(this.host + "/allMerchantsPdf?dateFrom=" + dateFrom + "&dateTo=" + dateTo, { headers: { 'Authorization': this.jwtToken } })
  }

  /* SAFIA 08.10.2021 */
  allSuspendedMerchantsPdf(dateFrom: string, dateTo: string) {
    return this.http.get(this.host + "/allSuspendedMerchantsPdf?dateFrom=" + dateFrom + "&dateTo=" + dateTo, { headers: { 'Authorization': this.jwtToken } })
  }
  /* SAFIA 08.10.2021 */
  allActivatedMerchantsPdf(dateFrom: string, dateTo: string) {
    return this.http.get(this.host + "/allActivatedMerchantsPdf?dateFrom=" + dateFrom + "&dateTo=" + dateTo, { headers: { 'Authorization': this.jwtToken } })
  }

  /* SAFIA 24.11.2021 */
  allQrTransactionPdf(id: any, dateFrom: string, dateTo: string) {
    return this.http.get(this.host + "/qrTransactionsPdf?id=" + id + "&dateFrom=" + dateFrom + "&dateTo=" + dateTo, { headers: { 'Authorization': this.jwtToken } })
  }

  /* SAFIA 26.11.2021 */
  allQrTransactionSearch(id: any, dateFrom: string, dateTo: string) {
    return this.http.get(this.host + "/qrTransactionSearch?id=" + id + "&dateFrom=" + dateFrom + "&dateTo=" + dateTo, { headers: { 'Authorization': this.jwtToken } })
  }
  //

  getBanques() {
    return this.http.get(this.host + "/banques");
  }


  generateSignture(data) {
    return this.http.post(this.host + "/signBase64", data);
  }

  register(merchant) {

    return this.http.post(this.host + "/merchants", merchant);
  }
  //+++
  register1(qrstatic) {

    return this.http.post(this.host + "/qrstatic", qrstatic, { responseType: "blob" });
  }

  //+++
  register2(qrdynamic) {

    return this.http.post(this.host + "/qrdynamic", qrdynamic, { responseType: "blob" });
  }
  /*
  // ++ 
  qrstatic() {
    //console.log("merchant " + id +" "+ paramToke)
    
    return this.http.get(this.host + "/qrstatic", {headers: new HttpHeaders({'authorization': this.jwtToken})});
  }*/

  // time out token / session  siham 
  MparamToken(paramToke, id) {
    console.log("merchant " + id + " " + paramToke)
    return this.http.post(this.host + "/MparamToken/" + id + "/" + paramToke, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getMPToken(id) {
    console.log("merchant " + id)
    return this.http.post(this.host + "/getMPToken/" + id, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  //++++

  MparamPass(paramPass, paramPass1, paramPass2, id) {
    console.log("merchant " + id + " " + paramPass)
    return this.http.post(this.host + "/MparamPass/" + id + "/" + paramPass + "/" + paramPass1 + "/" + paramPass2, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  MparamPass1(paramPass2, id) {
    console.log("merchant " + id + " " + paramPass2)
    return this.http.post(this.host + "/MparamPass1/" + id + "/" + paramPass2, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getMPPass(id) {
    console.log("merchant " + id)
    return this.http.post(this.host + "/getMPPass/" + id, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  AparamToken(paramToke, id) {
    console.log("merchant " + id + " " + paramToke)
    return this.http.post(this.host + "/AparamToken/" + id + "/" + paramToke, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  AparamSession(timeSession, id) {
    return this.http.post(this.host + "/AparamSession/" + id + "/" + timeSession, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getAparamToken(id) {
    console.log("merchant " + id)
    return this.http.post(this.host + "/getAPToken/" + id, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getAparamSession(id) {
    console.log("merchant " + id)
    return this.http.post(this.host + "/getAPSession/" + id, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  //
  verifiyToken(secure) {
    return this.http.post(this.host + "/gip/verifyToken", secure);
  }

  sendInformations(payement) {

    return this.http.post(this.host + "/gip/payementInfo", payement);
    //,{headers:new HttpHeaders({'Access-Control-Allow-Origin':'*'})});
  }

  sendOTP(payement) {
    return this.http.post(this.host + "/gip/sendOTP", payement);
    //,{headers:new HttpHeaders({'Access-Control-Allow-Origin':'*'})});
  }

  //Access-Control-Allow-Origin
  // }
  confirmPayement(payement) {

    return this.http.post(this.host + "/gip/confirmPayement", payement);
  }

  getMerchants(motCle: string, page: number, size: number) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + "/ghips/merchants?motCle=" + motCle + "&page=" + page + "&size=" + size + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getCostumers(motCle: string, page: number, size: number) {

    return this.http.get(this.host + "/ghips/costumers?motCle=" + motCle + "&page=" + page + "&size=" + size + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getAllAdmin() {
    return this.http.get(this.host + "/SA/getAllAdmin", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getAllUser() {
    return this.http.get(this.host + "/SA/getAllAdmin", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getTransactions(motCle: string, page: number, size: number) {
    return this.http.get(this.host + "/ghips/transactions?motCle=" + motCle + "&page=" + page + "&size=" + size + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  getNSTransactions(motcle: string, page: number, size: number) {
    return this.http.get(this.host + "/getNScredit/" + motcle + "?page=" + page + "&size=" + size + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  setNSTransactions(id: string, status: string) {
    return this.http.get(this.host + "/msetllemencredit/" + id + "/" + status + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  getAccountofPersonne(id) {
    return this.http.get(this.host + "/ghips/accountsPers/" + id + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getAccountMerchant(id) {
    return this.http.get(this.host + "/ghips/accountMerch/" + id + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getTransactionsCostByAccount(id) {
    return this.http.get(this.host + "/ghips/transactAccountCost/" + id + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getTransactionsMerchByAccount(id) {
    return this.http.get(this.host + "/ghips/transactAccountMerch/" + id + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  /*generate(payement) : Observable<string> {
    return this.http.post(this.host+"/gip/generate",payement);
  }*/
  generate(payement) {
    return this.http.post(this.host + "/gip/generate", payement);
  }
  ///modification
  getTransactionsofMerchant(id, page: number, size: number) {
    // if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + "/ghips/transactAccountMerchpage/" + id + "?page=" + page + "&size=" + size + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getTransactionsofCost(id: string, page: number, size: number) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + "/ghips/transactAccountCostpage/" + id + "?page=" + page + "&size=" + size + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  sendCiv(id: string) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + "/ghips/sendCiv/" + id + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }


  getIdAccount(username: String) {
    console.log("----------------username:+++++++++++++" + username)
    return this.http.get(this.host + "/getIdAccount?username=" + username, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
    //  https://localhost:8090/getIdAccount?username=merchant
  }

  getCostumerCb(code: string, page: number, size: number) {
    this.signature = "localhost::2400";
    return this.http.get(this.host + "/getCustomerBc/" + code +
      "?page=" + page + "&size=" + size, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getCostumer(id: string) {
    // console.log("----------------this.jwtToken11:+++++++++++++" + this.jwtToken )
    this.signature = "localhost::2400";
    return this.http.get(this.host + "/getCustomer/" + id, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getMerchantCb(code: string) {
    this.signature = "localhost::2400";
    return this.http.get(this.host + "/getMerchantBc/" + code, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  //+++
  getMerchantAn(id: string) {
    this.signature = "localhost::2400";
    return this.http.get(this.host + "/getMerchantAn/" + id, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  //+++
  getMerchantMn(id: string) {
    this.signature = "localhost::2400";
    return this.http.get(this.host + "/getMerchantMn/" + id, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getMerchant(id: string) {
    this.signature = "localhost::2400";
    // console.log("----------------this.jwtToken:+++++++++++++" + this.jwtToken )
    return this.http.get(this.host + "/getMerchant/" + id, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }


  deleteCostumer(id: string) {
    //console.log("----------------this.jwtToken:+++++++++++++" + this.jwtToken )

    return this.http.get(this.host + "/deleteCustomer/" + id + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  transactionBy(mot: string) {
    return this.http.get(this.host + "/gettransaction/" + mot + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  //++++++
  transactionBy1(mot: string) {
    return this.http.get(this.host + "/gettransaction1/" + mot + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  /* transactionByDate(id, from: string, to: string,page: number, size: number) {
     return this.http.get(this.host + "/gettransaction1/?id=" +id + "&from=" + from + "&to=" + to   +  "?page=" + page + "&size=" + size + "", {headers: new HttpHeaders({'authorization': this.jwtToken})});
   }*/
  transactionByDate(id, from: string, to: string) {
    return this.http.get(this.host + "/gettransaction1/?id=" + id + "&from=" + from + "&to=" + to + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  //++++
  transactionByName(from: string) {
    return this.http.get(this.host + "/gettransaction2/?from=" + from + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  //++++
  qrtransactionBy() {
    return this.http.get(this.host + "/getqrtransaction" + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  getQrTransactions(motCle: string, page: number, size: number) {
    return this.http.get(this.host + "/ghips/qrtransactions?motCle=" + motCle + "&page=" + page + "&size=" + size + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  updateStatus(id: string, status: string) {
    return this.http.get(this.host + "/ghips/updateStatus/" + id + "/" + status + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getCostumerByStatus(status: string, page: number, size: number) {
    return this.http.get(this.host + "/getCustomerstatus/" + status + "?page=" + page + "&size=" + size + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  getMerchantByStatus(status: string, page: number, name: string) {
    return this.http.get(this.host + "/qrMerchantQuery?status=" + status + "&page=" + page + "&name=" + name + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  getMerchantsAll() {
    return this.http.get(this.host + "/qrMerchants", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  //+++++
  getQrTransactionsMerchByAccount(id, page: number, size: number) {
    return this.http.get(this.host + "/ghips/qrtransactAccountMerch/" + id + "?page=" + page + "&size=" + size + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  //+++
  //+++++
  getQrTransactionsMerchByAccount1() {
    return this.http.get(this.host + "/ghips/qrtransactAccountMerch1/" + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  //+++++++++++++++++
  getQrTransactionsofMerchant(id: string, page: number, size: number) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + "/ghips/qrtransactAccountMerchpage/" + id + "?page=" + page + "&size=" + size + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  //+++++++++++++++++
  getQrTransactionsofMerchant2(page: number, size: number) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + "/qrtransactAccountMerchpage2/" + "?page=" + page + "&size=" + size + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  //+++++
  getQrTransactionsMerch(page: number, size: number) {
    return this.http.get(this.host + "/getqrtransaction/" + "?page=" + page + "&size=" + size + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  //+++++++++++++++++
  getQrTransactionsofMerchant1(page: number, size: number) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + "/qrtransactAccountMerchpage" + "?page=" + page + "&size=" + size + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  //+++
  //++++
  qrtransactionBy1(mot: string) {
    return this.http.get(this.host + "/getqrtransactionBymot/" + mot + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  /*qrtransactionBy2(mot: string) {
    return this.http.get(this.host + "/getqrtransactionBymot1/" +  mot + "", {headers: new HttpHeaders({'authorization': this.jwtToken})});
  }*/
  qrtransactionBy2(mot: string, page: number, size: number) {
    return this.http.get(this.host + "/getqrtransactionBymot1?mot=" + mot + "&page=" + page + "&size=" + size, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  transactionSearch(merchantName: string, merchantID: string, terminalID: string, dateFrom: string, dateTo: string, page: number, size: number) {
    return this.http.get(this.host + "/transactionSearch?merchantName=" + merchantName + "&merchantID=" + merchantID + "&terminalID=" + terminalID + "&dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&page=" + page + "&size=" + size, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  transactionSearchList(merchantName: string, merchantID: string, dateFrom: string, dateTo: string) {
    return this.http.get(this.host + "/transactionSearchList?merchantName=" + merchantName + "&merchantID=" + merchantID + "&dateFrom=" + dateFrom + "&dateTo=" + dateTo, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  transactionValueSearch(merchantName: string, merchantID: string, dateFrom: string, dateTo: string) {
    return this.http.get(this.host + "/transactionValueSearch?merchantName=" + merchantName + "&merchantID=" + merchantID + "&dateFrom=" + dateFrom + "&dateTo=" + dateTo, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  QrTransSearch(id: String, dateFrom: String, dateTo: String, location: String) {
    return this.http.get(this.host + "/QrTransSearch/" + id + "?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&location=" + location, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  QrTransMerch(id: String) {
    return this.http.get(this.host + "/QrTransMerchant" + "?id=" + id, { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  //++++

  getTimesession() {
    return this.http.post(this.host + "/ghips/AparamSession1", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }
  ///++++ forgot pass
  forgotpassword(e) {
    return this.http.post(this.host + "/Forgotpassword", e, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  //+++
  checkotp(f) {
    //--return this.http.post(this.host + "/login", f, {observe: 'response'})
    return this.http.post(this.host + "/checkotp", f, { observe: 'response' })
  }
  //+++
  updatepassword(e) {
    return this.http.post(this.host + "/updatepassword", e, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  ///++++ forgot login
  forgotlogin(e) {
    return this.http.post(this.host + "/Forgotlogin", e, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  qrtransactionByLocation(id, mot: string) {
    return this.http.get(this.host + "/gettransactionlocation/?id=" + id + "&mot=" + mot + "", { headers: new HttpHeaders({ 'authorization': this.jwtToken }) });
  }

  //omar
  addMerchant(merchant) {
    return this.http.post(this.host + "/onboardQrMerchant", merchant, { headers: { 'Authorization': this.jwtToken } });
  }

  //omar
  updateMerchantStatus(id: number, status: String) {
    return this.http.post(this.host + "/updateMerchantStatus", { merchantId: id, status: status }, { headers: { 'Authorization': this.jwtToken } });
  }

  //omar
  generateQrCode(data, amount) {
    return this.http.get(this.host + "/generateAcceptorPointQr?merchantId=" + data.merchantId + "&siteId=" + data.siteId + "&acceptorPointId=" + data.acceptorPointId + "&amount=" + amount, { observe: 'response', responseType: 'blob', headers: { 'Authorization': this.jwtToken } });
  }

  //omar
  unblockMerchant(id: number) {
    return this.http.post(this.host + "/unblockMerchant", id.toString(), { headers: { 'Authorization': this.jwtToken } });
  }

  //omar
  createAdmin(admin) {
    return this.http.post(this.host + "/SA/createAdmin", admin, { headers: { 'Authorization': this.jwtToken } });
  }

  //omar
  updateAdmin(admin) {
    return this.http.post(this.host + "/SA/updateAdmin", admin, { headers: { 'Authorization': this.jwtToken } });
  }

  //omar
  deleteAdmin(admin) {
    return this.http.post(this.host + "/SA/deleteAdmin", admin, { headers: { 'Authorization': this.jwtToken } });
  }

  //omar
  updateMerchantAddressDetails(merchant) {
    return this.http.post(this.host + "/updateMerchantAddressDetails", merchant, { headers: { 'Authorization': this.jwtToken } });
  }

  //omar
  updateMerchantContactDetails(merchant) {
    return this.http.post(this.host + "/updateMerchantContactDetails", merchant, { headers: { 'Authorization': this.jwtToken } });
  }

  //omar
  updateMerchantDescription(merchant) {
    return this.http.post(this.host + "/updateMerchantDescription", merchant, { headers: { 'Authorization': this.jwtToken } });
  }

  //omar
  updateMerchantSite(merchant) {
    return this.http.post(this.host + "/updateMerchantSite", merchant, { headers: { 'Authorization': this.jwtToken } });
  }

  //omar
  updateMerchantTerminal(merchant) {
    return this.http.post(this.host + "/updateMerchantTerminal", merchant, { headers: { 'Authorization': this.jwtToken } });
  }

  //omar
  updateMerchantSiteStatus(merchant) {
    return this.http.post(this.host + "/updateMerchantSiteStatus", merchant, { headers: { 'Authorization': this.jwtToken } });
  }

}
