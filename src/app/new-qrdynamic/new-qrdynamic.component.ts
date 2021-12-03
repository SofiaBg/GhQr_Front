import { Component, OnInit } from '@angular/core';
//import {AuthenticationService} from '../services/authentication.sevice';
import {GipService} from '../services/gip.service';
import {Router, RouterLinkActive, NavigationExtras} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import { RegistrationMerchant } from '../services/RegistrationMerchant';
import { Observable } from 'rxjs';
import { BnNgIdleService } from 'bn-ng-idle';//++
@Component({
  selector: 'app-new-qrdynamic',
  templateUrl: './new-qrdynamic.component.html',
  styleUrls: ['./new-qrdynamic.component.css']
})
export class NewqrdynamicComponent implements OnInit {
  user:any;
  banques: any;
  mode:number=0;
  errorMessage:string;
  banque;
  merchant: any;
  show:boolean=false;
  sign:String;
  isImageLoading: boolean;
  imageService: any;
  imageToShow: string | ArrayBuffer;
  httpClient: any;
//private authService:AuthenticationService,
router: Router;
payload = {}; 
qrdynamic:any;  

MerchantCategoryCode : Array <any> = [];
Country : Array <any> = [];
mySelectedCountry : any;
mySelectedmcc : any;
mySelectedCurrency : any;
mySelectedtip : any;
mySelectedpurpose : any;
mySelectedadditional : any;
mySelectedlanguage : any;
CurrencyCode : Array <any> = [];
TipCode : Array <any> = [];
PurposeTransaction : Array <any> = [];
Additional : Array <any> = [];
AlternateLanguage : Array <any> = [];
AgriculturalServicesCode : Array <any> = [];
ContractedServicesCode : Array <any> = [];
TransportationCode : Array <any> = [];
UtilitiesCode : Array <any> = [];
RetailOutletsCode : Array <any> = [];
AutomobilesAndVehiclesCode : Array <any> = [];
ClothingOutletsCode : Array <any> = [];
MiscellaneousOutletsCode : Array <any> = [];
ServiceProvidersCode : Array <any> = [];
BusinessServicesCode : Array <any> = [];
RepairServicesCode : Array <any> = [];
AmusementAndEntertainmentCode : Array <any> = [];
ProfessionalServicesAndMembershipOrganizationsCode : Array <any> = [];
GovernmentServicesCode : Array <any> = [];
SubSpiner : Array <any> = [];
timesession:any;
//+++
Title : Array <any> = [];
Function : Array <any> = [];
Type : Array <any> = [];
Usage : Array <any> = [];
Sending : Array <any> = [];


//private authService:AuthenticationService,
  constructor(private gipService:GipService,router:Router,public fb: FormBuilder,private bnIdle: BnNgIdleService) { 
    this.router = router;
    this.MerchantCategoryCode = [
      {code: '0742', name: "Agricultural_Services"},
      {code: '1520', name: "Contracted_Services"},
      {code: '4011', name: "TRANSPORTATION"},
      {code: '4812', name: "UTIlITIES"},
      {code: '5013', name: "RETAIL_OUTLETS"},
      {code: '5511', name: "AUTOMOBILES_AND_VEHICLES"},
      {code: '5611', name: "CLOTHING_OUTLETS"},
      {code: '5712', name: "MISCELLANEOUS_OUTLETS"},
      {code: '6010', name: "SERVICE_PROVIDERS"},
      {code: '7311', name: "BUSINESS_SERVICES"},
      {code: '7531', name: "REPAIR_SERVICES"},
      {code: '7829', name: "AMUSEMENT_AND_ENTERTAINMENT"},
      {code: '8011', name: "PROFESSIONAL_SERVICES_AND_MEMBERSHIP_ORGANIZATIONS"},
      {code: '9211', name: "GOVERNMENT_SERVICES"}
      ];
      this.AgriculturalServicesCode = [
      {code: '0742', name: "Veterinary Services"},
      {code: '0763', name: "Agricultural co-operatives"},
      {code: '0780', name: "Landscaping and horticultural services"}
      ];
      this.ContractedServicesCode = [
      {code: '1520', name: "General Contractors — Residential and Commercial"},
      {code: '1711', name: "Heating, plumbing and air-conditioning contractors"},
      {code: '1731', name: "Electrical contractors"},
      {code: '1740', name: "Masonry, stonework, tile setting, plastering and insulation contractors"},
      {code: '1750', name: "Carpentry contractors"},
      {code: '1761', name: "Roofing, siding and sheet metal work contractors"},
      {code: '1771', name: "Concrete work contractors"},
      {code: '1799', name: "Special trade contractors — not elsewhere classified"},
      {code: '2741', name: "Miscellaneous publishing and printing services"},
      {code: '2791', name: "Typesetting, platemaking and related service"},
      {code: '2842', name: "Speciality cleaning, polishing and sanitation preparations"}
      ];
      this.TransportationCode = [
        {code: '4011', name: "Railroads"},
        {code: '4111', name: "Local and suburban commuter passenger transportation, including ferries"},
        {code: '4112', name: "Passenger railways"},
        {code: '4119', name: "Ambulance services"},
        {code: '4121', name: "Taxi-cabs and limousines"},
        {code: '4131', name: "Bus lines"},
        {code: '4214', name: "Motor freight carriers and trucking — local and long distance, moving and\n" +
        "storage companies and local delivery"},
        {code: '4215', name: "Courier services — air and ground and freight forwarders"},
        {code: '4225', name: "Public warehousing and storage — farm products, refrigerated goods and\n" +
        "household goods "},
        {code: '4411', name: "Steamships and cruise lines"},
        {code: '4457', name: "Boat rentals and leasing"},
        {code: '4468', name: "Marinas, marine service and supplies"},
        {code: '4511', name: "Airlines and air carriers"},
        {code: '4582', name: "Airports, flying fields and airport terminals"},
        {code: '4722', name: "Travel agencies and tour operators"},
        {code: '4784', name: "Tolls and bridge fees"},
        {code: '4789', name: "Transportation services — not elsewhere classified"}
        ];
        this.UtilitiesCode = [
        {code: '4812', name: "Telecommunication equipment and telephone sales"},
        {code: '4814', name: "Telecommunication services, including local and long distance calls, credit\n" +
        "card calls, calls through use of magnetic stripe reading tele-phones and\n" +
        "faxes"},
        {code: '4815', name: "Monthly summary telephone charges"},
        {code: '4816', name: "Computer network/information services"},
        {code: '4821', name: "Telegraph services"},
        {code: '4829', name: "Wire transfers and money orders"},
        {code: '4899', name: "Cable and other pay television services"},
        {code: '4900', name: "Utilities — electric, gas, water and sanitary"}
        ];
        this.RetailOutletsCode = [
          {code: '5013', name: "Motor vehicle supplies and new parts"},
          {code: '5021', name: "Office and commercial furniture"},
          {code: '5039', name: "Construction materials — not elsewhere classified"},
          {code: '5044', name: "Office, photographic, photocopy and microfilm equipment"},
          {code: '5045', name: "Computers, computer peripheral equipment — not elsewhere classified"},
          {code: '5046', name: "Commercial equipment — not elsewhere classified"},
          {code: '5047', name: "Dental/laboratory/medical/ophthalmic hospital equipment and supplies"},
          {code: '5051', name: "Metal service centres and offices"},
          {code: '5065', name: "Electrical parts and equipment "},
          {code: '5072', name: "Hardware equipment and supplies"},
          {code: '5074', name: "Plumbing and heating equipment and supplies"},
          {code: '5085', name: "Industrial supplies — not elsewhere classified"},
          {code: '5094', name: "Precious stones and metals, watches and jewellery"},
          {code: '5099', name: "Durable goods — not elsewhere classified"},
          {code: '5111', name: "Stationery, office supplies and printing and writing paper"},
          {code: '5122', name: "Drugs, drug proprietors"},
          {code: '5131', name: "Piece goods, notions and other dry goods"},
          {code: '5137', name: "Men‘s, women‘s and children‘s uniforms and commercial clothing"},
          {code: '5139', name: "Commercial footwear"},
          {code: '5169', name: "Chemicals and allied products — not elsewhere classified"},
          {code: '5172', name: "Petroleum and petroleum products"},
          {code: '5192', name: "Books, periodicals and newspapers"},
          {code: '5193', name: "Florists‘ supplies, nursery stock and flowers"},
          {code: '5198', name: "Paints, varnishes and supplies"},
          {code: '5199', name: "Non-durable goods — not elsewhere classified"},
          {code: '5200', name: "Home supply warehouse outlets"},
          {code: '5211', name: "Lumber and building materials outlets"},
          {code: '5231', name: "Glass, paint and wallpaper shops"},
          {code: '5251', name: "Hardware shops"},
          {code: '5261', name: "Lawn and garden supplies outlets, including nurseries"},
          {code: '5271', name: "Mobile home dealers"},
          {code: '5300', name: "Wholesale clubs"},
          {code: '5309', name: "Duty-free shops"},
          {code: '5310', name: "Discount shops"},
          {code: '5311', name: "Department stores"},
          {code: '5331', name: "Variety stores"},
          {code: '5399', name: "Miscellaneous general merchandise"},
          {code: '5411', name: "Groceries and supermarkets"},
          {code: '5422', name: "Freezer and locker meat provisioners"},
          {code: '5441', name: "Candy, nut and confectionery shops"},
          {code: '5451', name: "Dairies"},
          {code: '5462', name: "Bakeries"},
          {code: '5499', name: "Miscellaneous food shops — convenience and speciality retail outlets"}
          ];
          this.AutomobilesAndVehiclesCode = [
          {code: '5511', name: "Car and truck dealers (new and used) sales, services, repairs, parts and\n" +
          "leasing"},
          {code: '5521', name: "Car and truck dealers (used only) sales, service, repairs, parts and leasing"},
          {code: '5531', name: "Auto and home supply outlets"},
          {code: '5532', name: "Automotive tyre outlets"},
          {code: '5533', name: "Automotive parts and accessories outlets"},
          {code: '5541', name: "Service stations (with or without ancillary services)"},
          {code: '5542', name: "Automated fuel dispensers"},
          {code: '5551', name: "Boat dealers"},
          {code: '5561', name: "Camper, recreational and utility trailer dealers"},
          {code: '5571', name: "Motorcycle shops and dealers"},
          {code: '5592', name: "Motor home dealers"},
          {code: '5598', name: "Snowmobile dealers"},
          {code: '5599', name: "Miscellaneous automotive, aircraft and farm equipment dealers — not\n" +
          "elsewhere classified"}
          ];
          this.ClothingOutletsCode = [
            {code: '5611', name: "Men‘s and boys‘ clothing and accessory shops"},
            {code: '5621', name: "Women‘s ready-to-wear shops"},
            {code: '5631', name: "Women‘s accessory and speciality shops"},
            {code: '5641', name: "Children‘s and infants‘ wear shops"},
            {code: '5651', name: "Family clothing shops"},
            {code: '5655', name: "Sports and riding apparel shops"},
            {code: '5661', name: "Shoe shops"},
            {code: '5681', name: "Furriers and fur shops"},
            {code: '5691', name: "Men‘s and women‘s clothing shops"},
            {code: '5697', name: "Tailors, seamstresses, mending and alterations"},
            {code: '5698', name: "Wig and toupee shops"},
            {code: '5699', name: "Miscellaneous apparel and accessory shops"}
            ];
            this.MiscellaneousOutletsCode = [
            {code: '5712', name: "Furniture, home furnishings and equipment shops and manufacturers,\n" +
            "except appliances"},
            {code: '5713', name: "Floor covering services"},
            {code: '5714', name: "Drapery, window covering and upholstery shops"},
            {code: '5718', name: "Fireplaces, fireplace screens and accessories shops"},
            {code: '5719', name: "Miscellaneous home furnishing speciality shops"},
            {code: '5722', name: "Household appliance shops"},
            {code: '5732', name: "Electronics shops"},
            {code: '5733', name: "Music shops — musical instruments, pianos and sheet music"},
            {code: '5734', name: "Computer software outlets"},
            {code: '5735', name: "Record shops"},
            {code: '5811', name: "Caterers"},
            {code: '5812', name: "Eating places and restaurants"},
            {code: '5814', name: "Fast food restaurants"},
            {code: '5815', name: "Digital Goods-Media: Books, Movies, Music"},
            {code: '5816', name: "Digital Goods: Games"},
            {code: '5817', name: "Digital Goods: Application (Excludes Games)"},
            {code: '5818', name: "Large Digital Goods Merchant"},
            {code: '5912', name: "Drug stores and pharmacies"},
            {code: '5931', name: "Used merchandise and second-hand shops"},
            {code: '5932', name: "Antique shops — sales, repairs and restoration services"},
            {code: '5933', name: "Pawn shops"},
            {code: '5935', name: "Wrecking and salvage yards"},
            {code: '5937', name: "Antique reproduction shops"},
            {code: '5940', name: "Bicycle shops — sales and service"},
            {code: '5941', name: "Sporting goods shops"},
            {code: '5942', name: "Bookshops"},
            {code: '5943', name: "Stationery, office and school supply shops"},
            {code: '5944', name: "Jewellery, watch, clock and silverware shops"},
            {code: '5945', name: "Hobby, toy and game shops"},
            {code: '5946', name: "Camera and photographic supply shops"},
            {code: '5947', name: "Gift, card, novelty and souvenir shops"},
            {code: '5948', name: "Luggage and leather goods shops"},
            {code: '5949', name: "Sewing, needlework, fabric and piece goods shops"},
            {code: '5950', name: "Glassware and crystal shops"},
            {code: '5960', name: "Direct marketing — insurance services"},
            {code: '5962', name: "Telemarketing — travel-related arrangement services"},
            {code: '5963', name: "Door-to-door sales"},
            {code: '5964', name: "Direct marketing — catalogue merchants"},
            {code: '5965', name: "Direct marketing — combination catalogue and retail merchants"},
            {code: '5966', name: "Direct marketing — outbound telemarketing merchants"},
            {code: '5967', name: "Direct marketing — inbound telemarketing merchants"},
            {code: '5968', name: "Direct marketing — continuity/subscription merchants"},
            {code: '5969', name: "Direct marketing/direct marketers — not elsewhere classified"},
            {code: '5970', name: "Artist supply and craft shops"},
            {code: '5971', name: "Art dealers and galleries"},
            {code: '5972', name: "Stamp and coin shops"},
            {code: '5973', name: "Religious goods and shops"},
            {code: '5975', name: "Hearing aids — sales, service and supplies"},
            {code: '5976', name: "Orthopaedic goods and prosthetic devices"},
            {code: '5977', name: "Cosmetic shops"},
            {code: '5978', name: "Typewriter outlets — sales, service and rentals"},
            {code: '5983', name: "Fuel dealers — fuel oil, wood, coal and liquefied petroleum"},
            {code: '5992', name: "Florists"},
            {code: '5993', name: "Cigar shops and stands"},
            {code: '5994', name: "Newsagents and news-stands"},
            {code: '5995', name: "Pet shops, pet food and supplies"},
            {code: '5996', name: "Swimming pools — sales, supplies and services"},
            {code: '5997', name: "Electric razor shops — sales and service"},
            {code: '5998', name: "Tent and awning shops"},
            {code: '5999', name: "Miscellaneous and speciality retail outlets"}
            ];
            this.ServiceProvidersCode = [
              {code: '6010', name: "Financial institutions — manual cash disbursements"},
              {code: '6011', name: "Financial institutions — automated cash disbursements"},
              {code: '6012', name: "Financial institutions — merchandise and services"},
              {code: '6051', name: "Non-financial institutions — foreign currency, money orders (not wire\n" +
              "transfer), scrip and travellers‘ checks"},
              {code: '6211', name: "Securities — brokers and dealers"},
              {code: '6300', name: "Insurance sales, underwriting and premiums"},
              {code: '7011', name: "Lodging — hotels, motels and resorts"},
              {code: '7012', name: "Timeshares"}, 
              {code: '7032', name: "Sporting and recreational camps"},
              {code: '7033', name: "Trailer parks and camp-sites"},
              {code: '7210', name: "Laundry, cleaning and garment services"},
              {code: '7211', name: "Laundry services — family and commercial"}, 
              {code: '7216', name: "Dry cleaners"},
              {code: '7217', name: "Carpet and upholstery cleaning"}, 
              {code: '7221', name: "Photographic studios"},
              {code: '7230', name: "Beauty and barber shops"}, 
              {code: '7251', name: "Shoe repair shops, shoe shine parlours and hat cleaning shops"},
              {code: '7261', name: "Funeral services and crematoriums"}, 
              {code: '7276', name: "Tax preparation services"},
              {code: '7277', name: "Counselling services — debt, marriage and personal"},
              {code: '7278', name: "Buying and shopping services and clubs"},
              {code: '7296', name: "Clothing rentals — costumes, uniforms and formal wear"},
              {code: '7297', name: "Massage parlours"},
              {code: '7298', name: "Health and beauty spas"},
              {code: '7299', name: "Miscellaneous personal services — not elsewhere classified"}
              ];
              this.BusinessServicesCode = [
              {code: '7311', name: "Advertising services"},
              {code: '7321', name: "Consumer credit reporting agencies"},
              {code: '7322', name: "Debt collection agencies"},
              {code: '7333', name: "Commercial photography, art and graphics"},
              {code: '7338', name: "Quick copy, reproduction and blueprinting services"},
              {code: '7339', name: "Stenographic and secretarial support services"},
              {code: '7342', name: "Exterminating and disinfecting services"},
              {code: '7349', name: "Cleaning, maintenance and janitorial services"},
              {code: '7361', name: "Employment agencies and temporary help services"},
              {code: '7372', name: "Computer programming, data processing and integrated systems design\n" +
              "services"},
              {code: '7375', name: "Information retrieval services"},
              {code: '7379', name: "Computer maintenance and repair services — not elsewhere classified"},
              {code: '7392', name: "Management, consulting and public relations services"},
              {code: '7393', name: "Detective agencies, protective agencies and security services, including\n" +
              "armoured cars and guard dogs"},
              {code: '7394', name: "Equipment, tool, furniture and appliance rentals and leasing"},
              {code: '7395', name: "Photofinishing laboratories and photo developing"},
              {code: '7399', name: "Business services — not elsewhere classified"},
              {code: '7512', name: "Automobile rentals"},
              {code: '7513', name: "Truck and utility trailer rentals"},
              {code: '7519', name: "Motor home and recreational vehicle rentals"},
              {code: '7523', name: "Parking lots and garages"}
              ];
              this.RepairServicesCode = [
                {code: '7531', name: "Automotive body repair shops"},
                {code: '7534', name: "Tyre retreading and repair shops"},
                {code: '7535', name: "Automotive paint shops"},
                {code: '7538', name: "Automotive service shops (non-dealer)"},
                {code: '7542', name: "Car washes"},
                {code: '7549', name: "Towing services"},
                {code: '7622', name: "Electronics repair shops"},
                {code: '7623', name: "Air conditioning and refrigeration repair shops"},
                {code: '7629', name: "Electrical and small appliance repair shops"},
                {code: '7631', name: "Watch, clock and jewellery repair shops"},
                {code: '7641', name: "Furniture reupholstery, repair and refinishing"},
                {code: '7692', name: "Welding services"},
                {code: '7699', name: "Miscellaneous repair shops and related services"}
                ];
                this.AmusementAndEntertainmentCode = [
                {code: '7829', name: "Motion picture and video tape production and distribution"},
                {code: '7832', name: "Motion picture theatres"},
                {code: '7841', name: "Video tape rentals"},
                {code: '7911', name: "Dance halls, studios and schools"},
                {code: '7922', name: "Theatrical producers (except motion pictures) and ticket agencies"},
                {code: '7929', name: "Bands, orchestras and miscellaneous entertainers — not elsewhere\n" +
                "classified"},
                {code: '7932', name: "Billiard and pool establishments"},
                {code: '7933', name: "Bowling alleys"},
                {code: '7941', name: "Commercial sports, professional sports clubs, athletic fields and sports\n" +
                "promoters"},
                {code: '7991', name: "Tourist attractions and exhibits"},
                {code: '7992', name: "Public golf courses"},
                {code: '7993', name: "Video amusement game supplies"},
                {code: '7994', name: "Video game arcades and establishments"},
                {code: '7996', name: "Amusement parks, circuses, carnivals and fortune tellers"},
                {code: '7997', name: "Membership clubs (sports, recreation, athletic), country clubs and private\n" +
                "golf courses"},
                {code: '7998', name: "Aquariums, seaquariums and dolphinariums"},
                {code: '7999', name: "Recreation services — not elsewhere classified"}
                ];
                this.ProfessionalServicesAndMembershipOrganizationsCode = [
                  {code: '8011', name: "Doctors and physicians — not elsewhere classified"},
                  {code: '8021', name: "Dentists and orthodontists"},
                  {code: '8031', name: "Osteopaths"},
                  {code: '8041', name: "Chiropractors"},
                  {code: '8042', name: "Optometrists and ophthalmologists"},
                  {code: '8043', name: "Opticians, optical goods and eyeglasses"},
                  {code: '8049', name: "Podiatrists and chiropodists"},
                  {code: '8050', name: "Nursing and personal care facilities"},
                  {code: '8062', name: "Hospitals"},
                  {code: '8071', name: "Medical and dental laboratories"},
                  {code: '8099', name: "Medical services and health practitioners — not elsewhere classified"},
                  {code: '8111', name: "Legal services and attorneys"},
                  {code: '8211', name: "Elementary and secondary schools"},
                  {code: '8220', name: "Colleges, universities, professional schools and junior colleges"},
                  {code: '8241', name: "Correspondence schools"},
                  {code: '8244', name: "Business and secretarial schools"},
                  {code: '8249', name: "Trade and vocational schools"},
                  {code: '8299', name: "Schools and educational services — not elsewhere classified"},
                  {code: '8351', name: "Child care services"},
                  {code: '8398', name: "Charitable and social service organizations"},
                  {code: '8641', name: "Civic, social and fraternal associations"},
                  {code: '8651', name: "Political organizations"},
                  {code: '8661', name: "Religious organizations"},
                  {code: '8675', name: "Automobile associations"},
                  {code: '8699', name: "Membership organizations — not elsewhere classified"},
                  {code: '8734', name: "Testing laboratories (non-medical)"},
                  {code: '8911', name: "Architectural, engineering and surveying services"},
                  {code: '8931', name: "Accounting, auditing and bookkeeping services"},
                  {code: '8999', name: "Professional services — not elsewhere classified"}
                  ];
                  this.GovernmentServicesCode = [
                  {code: '9211', name: "Court costs, including alimony and child support"},
                  {code: '9222', name: "Fines"},
                  {code: '9223', name: "Bail and bond payments"},
                  {code: '9311', name: "Tax payments"},
                  {code: '9399', name: "Government services — not elsewhere classified"},
                  {code: '9402', name: "Postal services — government only"}
                  ];
      this.SubSpiner = this.AgriculturalServicesCode;

      this.CurrencyCode = [
        {code: '999', name: "XXX"},
        {code: '965', name: "XUA"},
        {code: '971', name: "AFN"},
        {code: '012', name: "DZD"},
        {code: '051', name: "AMD"},
        {code: '032', name: "ARS"},
        {code: '036', name: "AUD"},
        {code: '533', name: "AWG"},
        {code: '944', name: "AZN"},
        {code: '044', name: "BSD"},
        {code: '764', name: "THB"},
        {code: '999', name: "PAB"},
        {code: '052', name: "BBD"},
        {code: '048', name: "BHD"},
        {code: '933', name: "BYN"},
        {code: '974', name: "BYR"},
        {code: '084', name: "BZD"},
        {code: '060', name: "BMD"},
        {code: '937', name: "VEB"},
        {code: '068', name: "BOB"},
        {code: '955', name: "XBA"},
        {code: '956', name: "XBB"},
        {code: '957', name: "XBC"},
        {code: '958', name: "XBD"},
        {code: '986', name: "BRL"},
        {code: '096', name: "BND"},
        {code: '975', name: "BGN"},
        {code: '108', name: "BIF"},
        {code: '132', name: "CVE"},
        {code: '124', name: "CAD"},
        {code: '136', name: "KYD"},
        {code: '952', name: "XOF"},
        {code: '950', name: "XAF"},
        {code: '953', name: "XPF"},
        {code: '152', name: "CLP"},
        {code: '170', name: "COP"},
        {code: '174', name: "KMF"},
        {code: '977', name: "BAM"},
        {code: '957', name: "CDF"},
        {code: '558', name: "NIO"},
        {code: '188', name: "CRC"},
        {code: '192', name: "CUP"},
        {code: '203', name: "CZK"},
        {code: '270', name: "GMD"},
        {code: '208', name: "DKK"},
        {code: '807', name: "MKD"},
        {code: '262', name: "DJF"},
        {code: '678', name: "STD"},
        {code: '214', name: "DOP"},
        {code: '704', name: "VND"},
        {code: '951', name: "XCD"},
        {code: '818', name: "EGP"},
        {code: '222', name: "SVC"},
        {code: '230', name: "ETB"},
        {code: '978', name: "EUR"},
        {code: '238', name: "FKP"},
        {code: '242', name: "FJD"},
        {code: '348', name: "HUF"},
        {code: '936', name: "GHS"},
        {code: '959', name: "XAU"},
        {code: '332', name: "HTG"},
        {code: '292', name: "GIP"},
        {code: '600', name: "PYG"},
        {code: '324', name: "GNF"},
        {code: '328', name: "GYD"},
        {code: '344', name: "HKD"},
        {code: '980', name: "UAH"},
        {code: '356', name: "INR"},
        {code: '368', name: "IQD"},
        {code: '364', name: "IRR"},
        {code: '352', name: "ISK"},
        {code: '388', name: "JMD"},
        {code: '400', name: "JOD"},
        {code: '404', name: "KES"},
        {code: '598', name: "PGK"},
        {code: '418', name: "LAK"},
        {code: '191', name: "HRK"},
        {code: '414', name: "KWD"},
        {code: '973', name: "AOA"},
        {code: '104', name: "MMK"},
        {code: '981', name: "GEL"},
        {code: '422', name: "LBP"},
        {code: '008', name: "ALL"},
        {code: '340', name: "HNL"},
        {code: '964', name: "SLL"},
        {code: '430', name: "LRD"},
        {code: '434', name: "LYD"},
        {code: '748', name: "SZL"},
        {code: '426', name: "LSL"},
        {code: '969', name: "MGA"},
        {code: '454', name: "MWK"},
        {code: '458', name: "MYR"},
        {code: '480', name: "MUR"},
        {code: '484', name: "MXN"},
        {code: '979', name: "MXV"},
        {code: '498', name: "MDL"},
        {code: '504', name: "MAD"},
        {code: '943', name: "MZM"},
        {code: '984', name: "BOV"},
        {code: '566', name: "NGN"},
        {code: '232', name: "ERN"},
        {code: '516', name: "NAD"},
        {code: '524', name: "NPR"},
        {code: '532', name: "ANG"},
        {code: '376', name: "ILS"},
        {code: '901', name: "TWD"},
        {code: '554', name: "NZD"},
        {code: '064', name: "BTN"},
        {code: '408', name: "KPW"},
        {code: '578', name: "NOK"},
        {code: '478', name: "MRO"},
        {code: '776', name: "TOP"},
        {code: '586', name: "PKR"},
        {code: '964', name: "XPD"},
        {code: '446', name: "MOP"},
        {code: '931', name: "CUC"},
        {code: '858', name: "UYU"},
        {code: '608', name: "PHP"},
        {code: '962', name: "XPT"},
        {code: '826', name: "GBP"},
        {code: '072', name: "BWP"},
        {code: '634', name: "QAR"},
        {code: '320', name: "GTQ"},
        {code: '710', name: "ZAR"},
        {code: '512', name: "OMR"},
        {code: '116', name: "KHR"},
        {code: '946', name: "RON"},
        {code: '462', name: "MVR"},
        {code: '360', name: "IDR"},
        {code: '643', name: "RUB"},
        {code: '646', name: "RWF"},
        {code: '654', name: "SHP"},
        {code: '682', name: "SAR"},
        {code: '941', name: "RSD"},
        {code: '690', name: "SCR"},
        {code: '961', name: "XAG"},
        {code: '702', name: "SGD"},
        {code: '604', name: "PEN"},
        {code: '090', name: "SBD"},
        {code: '417', name: "KGS"},
        {code: '706', name: "SOS"},
        {code: '972', name: "TJS"},
        {code: '728', name: "SSP"},
        {code: '960', name: "XDR"},
        {code: '144', name: "LKR"},
        {code: '994', name: "XSU"},
        {code: '938', name: "SDG"},
        {code: '968', name: "SRD"},
        {code: '752', name: "SEK"},
        {code: '756', name: "CHF"},
        {code: '760', name: "SYP"},
        {code: '050', name: "BDT"},
        {code: '882', name: "WST"},
        {code: '834', name: "TZS"},
        {code: '398', name: "KZT"},
        {code: '780', name: "TTD"},
        {code: '496', name: "MNT"},
        {code: '788', name: "TND"},
        {code: '949', name: "TRY"},
        {code: '934', name: "TMT"},
        {code: '784', name: "AED"},
        {code: '800', name: "UGX"},
        {code: '990', name: "CLF"},
        {code: '970', name: "COU"},
        {code: '940', name: "UYI"},
        {code: '840', name: "USD"},
        {code: '860', name: "UZS"},
        {code: '548', name: "VUV"},
        {code: '947', name: "CHE"},
        {code: '948', name: "CHW"},
        {code: '410', name: "KRW"},
        {code: '392', name: "JPY"},
        {code: '886', name: "YER"},
        {code: '156', name: "CNY"},
        {code: '967', name: "ZMW"},
        {code: '932', name: "ZML"},
        {code: '98', name: "PLN"}
        ];
        this.TipCode = [
          {code: '01', name: "PROMPTED_TO_ENTER_TIP"},
          {code: '02', name: "FLAT_CONVENIENCE_FEE"},
          {code: '03', name: "PERCENTAGE_CONVENIENCE_FEE"}
          ];
          this.PurposeTransaction = [
            {code: '001', name: "Own_Account_Transfer"},
            {code: '002', name: "Education_Fees"},
            {code: '003', name: "Utility_Bill_Payments"},
            {code: '004', name: "Government_Payments"},
            {code: '101', name: "Tickets_Airline"},
            {code: '102', name: "Tickets_Metro_Train"},
            {code: '103', name: "Tickets_Taxi"},
            {code: '104', name: "Tickets_Entertainment"},
            {code: '201', name: "Credit_Card_Payments"},
            {code: '202', name: "Purchase_of_Physical_Goods"},
            {code: '203', name: "Purchase_of_Digital_Goods"},
            {code: '204', name: "Purchase_of_Services"},
            {code: '301', name: "Rental_Payment_Residential"},
            {code: '302', name: "Rental_Payment_Commercial"},
            {code: '401', name: "Stored_Value_Account_Cash_In"},
            {code: '402', name: "Stored_Value_Account_Cash_Out"}
            ];
            this.Additional = [
              {code: '01', name: "A"},
              {code: '02', name: "M"},
              {code: '03', name: "E"}
              ];
              
              this.Country = [
                
                
                {name: "Afghanistan", code: "AF"}, 
    {"name": "land Islands", "code": "AX"}, 
    {"name": "Albania", "code": "AL"}, 
    {"name": "Algeria", "code": "DZ"}, 
    {"name": "American Samoa", "code": "AS"}, 
    {"name": "AndorrA", "code": "AD"}, 
    {"name": "Angola", "code": "AO"}, 
    {"name": "Anguilla", "code": "AI"}, 
    {"name": "Antarctica", "code": "AQ"}, 
    {"name": "Antigua and Barbuda", "code": "AG"}, 
    {"name": "Argentina", "code": "AR"}, 
    {"name": "Armenia", "code": "AM"}, 
    {"name": "Aruba", "code": "AW"}, 
    {"name": "Australia", "code": "AU"}, 
    {"name": "Austria", "code": "AT"}, 
    {"name": "Azerbaijan", "code": "AZ"}, 
    {"name": "Bahamas", "code": "BS"}, 
    {"name": "Bahrain", "code": "BH"}, 
    {"name": "Bangladesh", "code": "BD"}, 
    {"name": "Barbados", "code": "BB"}, 
    {"name": "Belarus", "code": "BY"}, 
    {"name": "Belgium", "code": "BE"}, 
    {"name": "Belize", "code": "BZ"}, 
    {"name": "Benin", "code": "BJ"}, 
    {"name": "Bermuda", "code": "BM"}, 
    {"name": "Bhutan", "code": "BT"}, 
    {"name": "Bolivia", "code": "BO"}, 
    {"name": "Bosnia and Herzegovina", "code": "BA"}, 
    {"name": "Botswana", "code": "BW"}, 
    {"name": "Bouvet Island", "code": "BV"}, 
    {"name": "Brazil", "code": "BR"}, 
    {"name": "British Indian Ocean Territory", "code": "IO"}, 
    {"name": "Brunei Darussalam", "code": "BN"}, 
    {"name": "Bulgaria", "code": "BG"}, 
    {"name": "Burkina Faso", "code": "BF"}, 
    {"name": "Burundi", "code": "BI"}, 
    {"name": "Cambodia", "code": "KH"}, 
    {"name": "Cameroon", "code": "CM"}, 
    {"name": "Canada", "code": "CA"}, 
    {"name": "Cape Verde", "code": "CV"}, 
    {"name": "Cayman Islands", "code": "KY"}, 
    {"name": "Central African Republic", "code": "CF"}, 
    {"name": "Chad", "code": "TD"}, 
    {"name": "Chile", "code": "CL"}, 
    {"name": "China", "code": "CN"}, 
    {"name": "Christmas Island", "code": "CX"}, 
    {"name": "Cocos (Keeling) Islands", "code": "CC"}, 
    {"name": "Colombia", "code": "CO"}, 
    {"name": "Comoros", "code": "KM"}, 
    {"name": "Congo", "code": "CG"}, 
    {"name": "Congo, The Democratic Republic of the", "code": "CD"}, 
    {"name": "Cook Islands", "code": "CK"}, 
    {"name": "Costa Rica", "code": "CR"}, 
    {"name": "Cote D\"Ivoire", "code": "CI"}, 
    {"name": "Croatia", "code": "HR"}, 
    {"name": "Cuba", "code": "CU"}, 
    {"name": "Cyprus", "code": "CY"}, 
    {"name": "Czech Republic", "code": "CZ"}, 
    {"name": "Denmark", "code": "DK"}, 
    {"name": "Djibouti", "code": "DJ"}, 
    {"name": "Dominica", "code": "DM"}, 
    {"name": "Dominican Republic", "code": "DO"}, 
    {"name": "Ecuador", "code": "EC"}, 
    {"name": "Egypt", "code": "EG"}, 
    {"name": "El Salvador", "code": "SV"}, 
    {"name": "Equatorial Guinea", "code": "GQ"}, 
    {"name": "Eritrea", "code": "ER"}, 
    {"name": "Estonia", "code": "EE"}, 
    {"name": "Ethiopia", "code": "ET"}, 
    {"name": "Falkland Islands (Malvinas)", "code": "FK"}, 
    {"name": "Faroe Islands", "code": "FO"}, 
    {"name": "Fiji", "code": "FJ"}, 
    {"name": "Finland", "code": "FI"}, 
    {"name": "France", "code": "FR"}, 
    {"name": "French Guiana", "code": "GF"}, 
    {"name": "French Polynesia", "code": "PF"}, 
    {"name": "French Southern Territories", "code": "TF"}, 
    {"name": "Gabon", "code": "GA"}, 
    {"name": "Gambia", "code": "GM"}, 
    {"name": "Georgia", "code": "GE"}, 
    {"name": "Germany", "code": "DE"}, 
    {"name": "Ghana", "code": "GH"}, 
    {"name": "Gibraltar", "code": "GI"}, 
    {"name": "Greece", "code": "GR"}, 
    {"name": "Greenland", "code": "GL"}, 
    {"name": "Grenada", "code": "GD"}, 
    {"name": "Guadeloupe", "code": "GP"}, 
    {"name": "Guam", "code": "GU"}, 
    {"name": "Guatemala", "code": "GT"}, 
    {"name": "Guernsey", "code": "GG"}, 
    {"name": "Guinea", "code": "GN"}, 
    {"name": "Guinea-Bissau", "code": "GW"}, 
    {"name": "Guyana", "code": "GY"}, 
    {"name": "Haiti", "code": "HT"}, 
    {"name": "Heard Island and Mcdonald Islands", "code": "HM"}, 
    {"name": "Holy See (Vatican City State)", "code": "VA"}, 
    {"name": "Honduras", "code": "HN"}, 
    {"name": "Hong Kong", "code": "HK"}, 
    {"name": "Hungary", "code": "HU"}, 
    {"name": "Iceland", "code": "IS"}, 
    {"name": "India", "code": "IN"}, 
    {"name": "Indonesia", "code": "ID"}, 
    {"name": "Iran, Islamic Republic Of", "code": "IR"}, 
    {"name": "Iraq", "code": "IQ"}, 
    {"name": "Ireland", "code": "IE"}, 
    {"name": "Isle of Man", "code": "IM"}, 
    {"name": "Israel", "code": "IL"}, 
    {"name": "Italy", "code": "IT"}, 
    {"name": "Jamaica", "code": "JM"}, 
    {"name": "Japan", "code": "JP"}, 
    {"name": "Jersey", "code": "JE"}, 
    {"name": "Jordan", "code": "JO"}, 
    {"name": "Kazakhstan", "code": "KZ"}, 
    {"name": "Kenya", "code": "KE"}, 
    {"name": "Kiribati", "code": "KI"}, 
    {"name": "Korea, Democratic People\"S Republic of", "code": "KP"}, 
    {"name": "Korea, Republic of", "code": "KR"}, 
    {"name": "Kuwait", "code": "KW"}, 
    {"name": "Kyrgyzstan", "code": "KG"}, 
    {"name": "Lao People\"S Democratic Republic", "code": "LA"}, 
    {"name": "Latvia", "code": "LV"}, 
    {"name": "Lebanon", "code": "LB"}, 
    {"name": "Lesotho", "code": "LS"}, 
    {"name": "Liberia", "code": "LR"}, 
    {"name": "Libyan Arab Jamahiriya", "code": "LY"}, 
    {"name": "Liechtenstein", "code": "LI"}, 
    {"name": "Lithuania", "code": "LT"}, 
    {"name": "Luxembourg", "code": "LU"}, 
    {"name": "Macao", "code": "MO"}, 
    {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"}, 
    {"name": "Madagascar", "code": "MG"}, 
    {"name": "Malawi", "code": "MW"}, 
    {"name": "Malaysia", "code": "MY"}, 
    {"name": "Maldives", "code": "MV"}, 
    {"name": "Mali", "code": "ML"}, 
    {"name": "Malta", "code": "MT"}, 
    {"name": "Marshall Islands", "code": "MH"}, 
    {"name": "Martinique", "code": "MQ"}, 
    {"name": "Mauritania", "code": "MR"}, 
    {"name": "Mauritius", "code": "MU"}, 
    {"name": "Mayotte", "code": "YT"}, 
    {"name": "Mexico", "code": "MX"}, 
    {"name": "Micronesia, Federated States of", "code": "FM"}, 
    {"name": "Moldova, Republic of", "code": "MD"}, 
    {"name": "Monaco", "code": "MC"}, 
    {"name": "Mongolia", "code": "MN"}, 
    {"name": "Montenegro", "code": "ME"},
    {"name": "Montserrat", "code": "MS"},
    {"name": "Morocco", "code": "MA"}, 
    {"name": "Mozambique", "code": "MZ"}, 
    {"name": "Myanmar", "code": "MM"}, 
    {"name": "Namibia", "code": "NA"}, 
    {"name": "Nauru", "code": "NR"}, 
    {"name": "Nepal", "code": "NP"}, 
    {"name": "Netherlands", "code": "NL"}, 
    {"name": "Netherlands Antilles", "code": "AN"}, 
    {"name": "New Caledonia", "code": "NC"}, 
    {"name": "New Zealand", "code": "NZ"}, 
    {"name": "Nicaragua", "code": "NI"}, 
    {"name": "Niger", "code": "NE"}, 
    {"name": "Nigeria", "code": "NG"}, 
    {"name": "Niue", "code": "NU"}, 
    {"name": "Norfolk Island", "code": "NF"}, 
    {"name": "Northern Mariana Islands", "code": "MP"}, 
    {"name": "Norway", "code": "NO"}, 
    {"name": "Oman", "code": "OM"}, 
    {"name": "Pakistan", "code": "PK"}, 
    {"name": "Palau", "code": "PW"}, 
    {"name": "Palestinian Territory, Occupied", "code": "PS"}, 
    {"name": "Panama", "code": "PA"}, 
    {"name": "Papua New Guinea", "code": "PG"}, 
    {"name": "Paraguay", "code": "PY"}, 
    {"name": "Peru", "code": "PE"}, 
    {"name": "Philippines", "code": "PH"}, 
    {"name": "Pitcairn", "code": "PN"}, 
    {"name": "Poland", "code": "PL"}, 
    {"name": "Portugal", "code": "PT"}, 
    {"name": "Puerto Rico", "code": "PR"}, 
    {"name": "Qatar", "code": "QA"}, 
    {"name": "Reunion", "code": "RE"}, 
    {"name": "Romania", "code": "RO"}, 
    {"name": "Russian Federation", "code": "RU"}, 
    {"name": "RWANDA", "code": "RW"}, 
    {"name": "Saint Helena", "code": "SH"}, 
    {"name": "Saint Kitts and Nevis", "code": "KN"}, 
    {"name": "Saint Lucia", "code": "LC"}, 
    {"name": "Saint Pierre and Miquelon", "code": "PM"}, 
    {"name": "Saint Vincent and the Grenadines", "code": "VC"}, 
    {"name": "Samoa", "code": "WS"}, 
    {"name": "San Marino", "code": "SM"}, 
    {"name": "Sao Tome and Principe", "code": "ST"}, 
    {"name": "Saudi Arabia", "code": "SA"}, 
    {"name": "Senegal", "code": "SN"}, 
    {"name": "Serbia", "code": "RS"}, 
    {"name": "Seychelles", "code": "SC"}, 
    {"name": "Sierra Leone", "code": "SL"}, 
    {"name": "Singapore", "code": "SG"}, 
    {"name": "Slovakia", "code": "SK"}, 
    {"name": "Slovenia", "code": "SI"}, 
    {"name": "Solomon Islands", "code": "SB"}, 
    {"name": "Somalia", "code": "SO"}, 
    {"name": "South Africa", "code": "ZA"}, 
    {"name": "South Georgia and the South Sandwich Islands", "code": "GS"}, 
    {"name": "Spain", "code": "ES"}, 
    {"name": "Sri Lanka", "code": "LK"}, 
    {"name": "Sudan", "code": "SD"}, 
    {"name": "Suriname", "code": "SR"}, 
    {"name": "Svalbard and Jan Mayen", "code": "SJ"}, 
    {"name": "Swaziland", "code": "SZ"}, 
    {"name": "Sweden", "code": "SE"}, 
    {"name": "Switzerland", "code": "CH"}, 
    {"name": "Syrian Arab Republic", "code": "SY"}, 
    {"name": "Taiwan, Province of China", "code": "TW"}, 
    {"name": "Tajikistan", "code": "TJ"}, 
    {"name": "Tanzania, United Republic of", "code": "TZ"}, 
    {"name": "Thailand", "code": "TH"}, 
    {"name": "Timor-Leste", "code": "TL"}, 
    {"name": "Togo", "code": "TG"}, 
    {"name": "Tokelau", "code": "TK"}, 
    {"name": "Tonga", "code": "TO"}, 
    {"name": "Trinidad and Tobago", "code": "TT"}, 
    {"name": "Tunisia", "code": "TN"}, 
    {"name": "Turkey", "code": "TR"}, 
    {"name": "Turkmenistan", "code": "TM"}, 
    {"name": "Turks and Caicos Islands", "code": "TC"}, 
    {"name": "Tuvalu", "code": "TV"}, 
    {"name": "Uganda", "code": "UG"}, 
    {"name": "Ukraine", "code": "UA"}, 
    {"name": "United Arab Emirates", "code": "AE"}, 
    {"name": "United Kingdom", "code": "GB"}, 
    {"name": "United States", "code": "US"}, 
    {"name": "United States Minor Outlying Islands", "code": "UM"}, 
    {"name": "Uruguay", "code": "UY"}, 
    {"name": "Uzbekistan", "code": "UZ"}, 
    {"name": "Vanuatu", "code": "VU"}, 
    {"name": "Venezuela", "code": "VE"}, 
    {"name": "Viet Nam", "code": "VN"}, 
    {"name": "Virgin Islands, British", "code": "VG"}, 
    {"name": "Virgin Islands, U.S.", "code": "VI"}, 
    {"name": "Wallis and Futuna", "code": "WF"}, 
    {"name": "Western Sahara", "code": "EH"}, 
    {"name": "Yemen", "code": "YE"}, 
    {"name": "Zambia", "code": "ZM"}, 
    {"name": "Zimbabwe", "code": "ZW"} 
                ];
                this.AlternateLanguage = [
                  
                  
                  {"code":"ab","name":"Abkhaz","nativeName":"аҧсуа"},
      {"code":"aa","name":"Afar","nativeName":"Afaraf"},
      {"code":"af","name":"Afrikaans","nativeName":"Afrikaans"},
      {"code":"ak","name":"Akan","nativeName":"Akan"},
      {"code":"sq","name":"Albanian","nativeName":"Shqip"},
      {"code":"am","name":"Amharic","nativeName":"አማርኛ"},
      {"code":"ar","name":"Arabic","nativeName":"العربية"},
      {"code":"an","name":"Aragonese","nativeName":"Aragonés"},
      {"code":"hy","name":"Armenian","nativeName":"Հայերեն"},
      {"code":"as","name":"Assamese","nativeName":"অসমীয়া"},
      {"code":"av","name":"Avaric","nativeName":"авар мацӀ, магӀарул мацӀ"},
      {"code":"ae","name":"Avestan","nativeName":"avesta"},
      {"code":"ay","name":"Aymara","nativeName":"aymar aru"},
      {"code":"az","name":"Azerbaijani","nativeName":"azərbaycan dili"},
      {"code":"bm","name":"Bambara","nativeName":"bamanankan"},
      {"code":"ba","name":"Bashkir","nativeName":"башҡорт теле"},
      {"code":"eu","name":"Basque","nativeName":"euskara, euskera"},
      {"code":"be","name":"Belarusian","nativeName":"Беларуская"},
      {"code":"bn","name":"Bengali","nativeName":"বাংলা"},
      {"code":"bh","name":"Bihari","nativeName":"भोजपुरी"},
      {"code":"bi","name":"Bislama","nativeName":"Bislama"},
      {"code":"bs","name":"Bosnian","nativeName":"bosanski jezik"},
      {"code":"br","name":"Breton","nativeName":"brezhoneg"},
      {"code":"bg","name":"Bulgarian","nativeName":"български език"},
      {"code":"my","name":"Burmese","nativeName":"ဗမာစာ"},
      {"code":"ca","name":"Catalan; Valencian","nativeName":"Català"},
      {"code":"ch","name":"Chamorro","nativeName":"Chamoru"},
      {"code":"ce","name":"Chechen","nativeName":"нохчийн мотт"},
      {"code":"ny","name":"Chichewa; Chewa; Nyanja","nativeName":"chiCheŵa, chinyanja"},
      {"code":"zh","name":"Chinese","nativeName":"中文 (Zhōngwén), 汉语, 漢語"},
      {"code":"cv","name":"Chuvash","nativeName":"чӑваш чӗлхи"},
      {"code":"kw","name":"Cornish","nativeName":"Kernewek"},
      {"code":"co","name":"Corsican","nativeName":"corsu, lingua corsa"},
      {"code":"cr","name":"Cree","nativeName":"ᓀᐦᐃᔭᐍᐏᐣ"},
      {"code":"hr","name":"Croatian","nativeName":"hrvatski"},
      {"code":"cs","name":"Czech","nativeName":"česky, čeština"},
      {"code":"da","name":"Danish","nativeName":"dansk"},
      {"code":"dv","name":"Divehi; Dhivehi; Maldivian;","nativeName":"ދިވެހި"},
      {"code":"nl","name":"Dutch","nativeName":"Nederlands, Vlaams"},
      {"code":"en","name":"English","nativeName":"English"},
      {"code":"eo","name":"Esperanto","nativeName":"Esperanto"},
      {"code":"et","name":"Estonian","nativeName":"eesti, eesti keel"},
      {"code":"ee","name":"Ewe","nativeName":"Eʋegbe"},
      {"code":"fo","name":"Faroese","nativeName":"føroyskt"},
      {"code":"fj","name":"Fijian","nativeName":"vosa Vakaviti"},
      {"code":"fi","name":"Finnish","nativeName":"suomi, suomen kieli"},
      {"code":"fr","name":"French","nativeName":"français, langue française"},
      {"code":"ff","name":"Fula; Fulah; Pulaar; Pular","nativeName":"Fulfulde, Pulaar, Pular"},
      {"code":"gl","name":"Galician","nativeName":"Galego"},
      {"code":"ka","name":"Georgian","nativeName":"ქართული"},
      {"code":"de","name":"German","nativeName":"Deutsch"},
      {"code":"el","name":"Greek, Modern","nativeName":"Ελληνικά"},
      {"code":"gn","name":"Guaraní","nativeName":"Avañeẽ"},
      {"code":"gu","name":"Gujarati","nativeName":"ગુજરાતી"},
      {"code":"ht","name":"Haitian; Haitian Creole","nativeName":"Kreyòl ayisyen"},
      {"code":"ha","name":"Hausa","nativeName":"Hausa, هَوُسَ"},
      {"code":"he","name":"Hebrew (modern)","nativeName":"עברית"},
      {"code":"hz","name":"Herero","nativeName":"Otjiherero"},
      {"code":"hi","name":"Hindi","nativeName":"हिन्दी, हिंदी"},
      {"code":"ho","name":"Hiri Motu","nativeName":"Hiri Motu"},
      {"code":"hu","name":"Hungarian","nativeName":"Magyar"},
      {"code":"ia","name":"Interlingua","nativeName":"Interlingua"},
      {"code":"id","name":"Indonesian","nativeName":"Bahasa Indonesia"},
      {"code":"ie","name":"Interlingue","nativeName":"Originally called Occidental; then Interlingue after WWII"},
      {"code":"ga","name":"Irish","nativeName":"Gaeilge"},
      {"code":"ig","name":"Igbo","nativeName":"Asụsụ Igbo"},
      {"code":"ik","name":"Inupiaq","nativeName":"Iñupiaq, Iñupiatun"},
      {"code":"io","name":"Ido","nativeName":"Ido"},
      {"code":"is","name":"Icelandic","nativeName":"Íslenska"},
      {"code":"it","name":"Italian","nativeName":"Italiano"},
      {"code":"iu","name":"Inuktitut","nativeName":"ᐃᓄᒃᑎᑐᑦ"},
      {"code":"ja","name":"Japanese","nativeName":"日本語 (にほんご／にっぽんご)"},
      {"code":"jv","name":"Javanese","nativeName":"basa Jawa"},
      {"code":"kl","name":"Kalaallisut, Greenlandic","nativeName":"kalaallisut, kalaallit oqaasii"},
      {"code":"kn","name":"Kannada","nativeName":"ಕನ್ನಡ"},
      {"code":"kr","name":"Kanuri","nativeName":"Kanuri"},
      {"code":"ks","name":"Kashmiri","nativeName":"कश्मीरी, كشميري‎"},
      {"code":"kk","name":"Kazakh","nativeName":"Қазақ тілі"},
      {"code":"km","name":"Khmer","nativeName":"ភាសាខ្មែរ"},
      {"code":"ki","name":"Kikuyu, Gikuyu","nativeName":"Gĩkũyũ"},
      {"code":"rw","name":"Kinyarwanda","nativeName":"Ikinyarwanda"},
      {"code":"ky","name":"Kirghiz, Kyrgyz","nativeName":"кыргыз тили"},
      {"code":"kv","name":"Komi","nativeName":"коми кыв"},
      {"code":"kg","name":"Kongo","nativeName":"KiKongo"},
      {"code":"ko","name":"Korean","nativeName":"한국어 (韓國語), 조선말 (朝鮮語)"},
      {"code":"ku","name":"Kurdish","nativeName":"Kurdî, كوردی‎"},
      {"code":"kj","name":"Kwanyama, Kuanyama","nativeName":"Kuanyama"},
      {"code":"la","name":"Latin","nativeName":"latine, lingua latina"},
      {"code":"lb","name":"Luxembourgish, Letzeburgesch","nativeName":"Lëtzebuergesch"},
      {"code":"lg","name":"Luganda","nativeName":"Luganda"},
      {"code":"li","name":"Limburgish, Limburgan, Limburger","nativeName":"Limburgs"},
      {"code":"ln","name":"Lingala","nativeName":"Lingála"},
      {"code":"lo","name":"Lao","nativeName":"ພາສາລາວ"},
      {"code":"lt","name":"Lithuanian","nativeName":"lietuvių kalba"},
      {"code":"lu","name":"Luba-Katanga","nativeName":""},
      {"code":"lv","name":"Latvian","nativeName":"latviešu valoda"},
      {"code":"gv","name":"Manx","nativeName":"Gaelg, Gailck"},
      {"code":"mk","name":"Macedonian","nativeName":"македонски јазик"},
      {"code":"mg","name":"Malagasy","nativeName":"Malagasy fiteny"},
      {"code":"ms","name":"Malay","nativeName":"bahasa Melayu, بهاس ملايو‎"},
      {"code":"ml","name":"Malayalam","nativeName":"മലയാളം"},
      {"code":"mt","name":"Maltese","nativeName":"Malti"},
      {"code":"mi","name":"Māori","nativeName":"te reo Māori"},
      {"code":"mr","name":"Marathi (Marāṭhī)","nativeName":"मराठी"},
      {"code":"mh","name":"Marshallese","nativeName":"Kajin M̧ajeļ"},
      {"code":"mn","name":"Mongolian","nativeName":"монгол"},
      {"code":"na","name":"Nauru","nativeName":"Ekakairũ Naoero"},
      {"code":"nv","name":"Navajo, Navaho","nativeName":"Diné bizaad, Dinékʼehǰí"},
      {"code":"nb","name":"Norwegian Bokmål","nativeName":"Norsk bokmål"},
      {"code":"nd","name":"North Ndebele","nativeName":"isiNdebele"},
      {"code":"ne","name":"Nepali","nativeName":"नेपाली"},
      {"code":"ng","name":"Ndonga","nativeName":"Owambo"},
      {"code":"nn","name":"Norwegian Nynorsk","nativeName":"Norsk nynorsk"},
      {"code":"no","name":"Norwegian","nativeName":"Norsk"},
      {"code":"ii","name":"Nuosu","nativeName":"ꆈꌠ꒿ Nuosuhxop"},
      {"code":"nr","name":"South Ndebele","nativeName":"isiNdebele"},
      {"code":"oc","name":"Occitan","nativeName":"Occitan"},
      {"code":"oj","name":"Ojibwe, Ojibwa","nativeName":"ᐊᓂᔑᓈᐯᒧᐎᓐ"},
      {"code":"cu","name":"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic","nativeName":"ѩзыкъ словѣньскъ"},
      {"code":"om","name":"Oromo","nativeName":"Afaan Oromoo"},
      {"code":"or","name":"Oriya","nativeName":"ଓଡ଼ିଆ"},
      {"code":"os","name":"Ossetian, Ossetic","nativeName":"ирон æвзаг"},
      {"code":"pa","name":"Panjabi, Punjabi","nativeName":"ਪੰਜਾਬੀ, پنجابی‎"},
      {"code":"pi","name":"Pāli","nativeName":"पाऴि"},
      {"code":"fa","name":"Persian","nativeName":"فارسی"},
      {"code":"pl","name":"Polish","nativeName":"polski"},
      {"code":"ps","name":"Pashto, Pushto","nativeName":"پښتو"},
      {"code":"pt","name":"Portuguese","nativeName":"Português"},
      {"code":"qu","name":"Quechua","nativeName":"Runa Simi, Kichwa"},
      {"code":"rm","name":"Romansh","nativeName":"rumantsch grischun"},
      {"code":"rn","name":"Kirundi","nativeName":"kiRundi"},
      {"code":"ro","name":"Romanian, Moldavian, Moldovan","nativeName":"română"},
      {"code":"ru","name":"Russian","nativeName":"русский язык"},
      {"code":"sa","name":"Sanskrit (Saṁskṛta)","nativeName":"संस्कृतम्"},
      {"code":"sc","name":"Sardinian","nativeName":"sardu"},
      {"code":"sd","name":"Sindhi","nativeName":"सिन्धी, سنڌي، سندھی‎"},
      {"code":"se","name":"Northern Sami","nativeName":"Davvisámegiella"},
      {"code":"sm","name":"Samoan","nativeName":"gagana faa Samoa"},
      {"code":"sg","name":"Sango","nativeName":"yângâ tî sängö"},
      {"code":"sr","name":"Serbian","nativeName":"српски језик"},
      {"code":"gd","name":"Scottish Gaelic; Gaelic","nativeName":"Gàidhlig"},
      {"code":"sn","name":"Shona","nativeName":"chiShona"},
      {"code":"si","name":"Sinhala, Sinhalese","nativeName":"සිංහල"},
      {"code":"sk","name":"Slovak","nativeName":"slovenčina"},
      {"code":"sl","name":"Slovene","nativeName":"slovenščina"},
      {"code":"so","name":"Somali","nativeName":"Soomaaliga, af Soomaali"},
      {"code":"st","name":"Southern Sotho","nativeName":"Sesotho"},
      {"code":"es","name":"Spanish; Castilian","nativeName":"español, castellano"},
      {"code":"su","name":"Sundanese","nativeName":"Basa Sunda"},
      {"code":"sw","name":"Swahili","nativeName":"Kiswahili"},
      {"code":"ss","name":"Swati","nativeName":"SiSwati"},
      {"code":"sv","name":"Swedish","nativeName":"svenska"},
      {"code":"ta","name":"Tamil","nativeName":"தமிழ்"},
      {"code":"te","name":"Telugu","nativeName":"తెలుగు"},
      {"code":"tg","name":"Tajik","nativeName":"тоҷикӣ, toğikī, تاجیکی‎"},
      {"code":"th","name":"Thai","nativeName":"ไทย"},
      {"code":"ti","name":"Tigrinya","nativeName":"ትግርኛ"},
      {"code":"bo","name":"Tibetan Standard, Tibetan, Central","nativeName":"བོད་ཡིག"},
      {"code":"tk","name":"Turkmen","nativeName":"Türkmen, Түркмен"},
      {"code":"tl","name":"Tagalog","nativeName":"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"},
      {"code":"tn","name":"Tswana","nativeName":"Setswana"},
      {"code":"to","name":"Tonga (Tonga Islands)","nativeName":"faka Tonga"},
      {"code":"tr","name":"Turkish","nativeName":"Türkçe"},
      {"code":"ts","name":"Tsonga","nativeName":"Xitsonga"},
      {"code":"tt","name":"Tatar","nativeName":"татарча, tatarça, تاتارچا‎"},
      {"code":"tw","name":"Twi","nativeName":"Twi"},
      {"code":"ty","name":"Tahitian","nativeName":"Reo Tahiti"},
      {"code":"ug","name":"Uighur, Uyghur","nativeName":"Uyƣurqə, ئۇيغۇرچە‎"},
      {"code":"uk","name":"Ukrainian","nativeName":"українська"},
      {"code":"ur","name":"Urdu","nativeName":"اردو"},
      {"code":"uz","name":"Uzbek","nativeName":"zbek, Ўзбек, أۇزبېك‎"},
      {"code":"ve","name":"Venda","nativeName":"Tshivenḓa"},
      {"code":"vi","name":"Vietnamese","nativeName":"Tiếng Việt"},
      {"code":"vo","name":"Volapük","nativeName":"Volapük"},
      {"code":"wa","name":"Walloon","nativeName":"Walon"},
      {"code":"cy","name":"Welsh","nativeName":"Cymraeg"},
      {"code":"wo","name":"Wolof","nativeName":"Wollof"},
      {"code":"fy","name":"Western Frisian","nativeName":"Frysk"},
      {"code":"xh","name":"Xhosa","nativeName":"isiXhosa"},
      {"code":"yi","name":"Yiddish","nativeName":"ייִדיש"},
      {"code":"yo","name":"Yoruba","nativeName":"Yorùbá"},
      {"code":"za","name":"Zhuang, Chuang","nativeName":"Saɯ cueŋƅ, Saw cuengh"}
                  ];

//+++++++++++++++++++++
this.Title = [
  {code: '01', name: "Sr"},
  {code: '02', name: "M"},
  {code: '03', name: "MS"}
  ];
  this.Function = [
    {code: '01', name: "Manager"},
    {code: '02', name: "M"},
    {code: '03', name: "S"}
    ];
    this.Type = [
      {code: '01', name: "Legal Representative"},
      {code: '02', name: "M"},
      {code: '03', name: "MS"}
      ];
      this.Usage = [
        {code: '01', name: "Mail"},
        {code: '02', name: "M"},
        {code: '03', name: "S"}
        ];
        this.Sending = [
          {code: '01', name: "Email"},
          {code: '02', name: "M"},
          {code: '03', name: "S"}
          ];


  }
  onCCSelection(value: string){
    console.log("the selected value is" +value);
  }
  
  //++++
  onMCCSelection(value: string){
  console.log("the selected value is" +value);
  switch(value){
  case "0742":
  this.SubSpiner = this.AgriculturalServicesCode;
  break;
  case "1520":
  this.SubSpiner = this.ContractedServicesCode;
  break;
  case "4011":
  this.SubSpiner = this.TransportationCode;
  break;
  case "4812":
  this.SubSpiner = this.UtilitiesCode;
  break;
  case "5013":
  this.SubSpiner = this.RetailOutletsCode;
  break;
  case "5511":
  this.SubSpiner = this.AutomobilesAndVehiclesCode;
  break;
  case "5611":
  this.SubSpiner = this.ClothingOutletsCode;
  break;
  case "5712":
  this.SubSpiner = this.MiscellaneousOutletsCode;
  break;
  case "6010":
  this.SubSpiner = this.ServiceProvidersCode;
  break;
  case "7311":
  this.SubSpiner = this.BusinessServicesCode;
  break;
  case "7531":
  this.SubSpiner = this.RepairServicesCode;
  break;
  case "7829":
  this.SubSpiner = this.AmusementAndEntertainmentCode;
  break;
  case "8011":
  this.SubSpiner = this.ProfessionalServicesAndMembershipOrganizationsCode;
  break;
  case "9211":
  this.SubSpiner = this.GovernmentServicesCode;
  break;
  default:
  //code block
  }
  }
  

  onRegister2(qrdynamic){
    console.log(qrdynamic);
    
  /*  this.gipService.generateSignture(merchant).subscribe(
 
     data=>{
       
       this.merchant = data;
       console.log("signature " + this.merchant )
     }
     ,err=>{ 
       console.log(" erreur siganture")
    
     });
    console.log(merchant)
 */
    this.gipService.register2(qrdynamic).subscribe(
       data=>{
         console.log("start");
         this.qrdynamic=data;
         this.mode= 1;
         this.show=true;
         console.log(" qrdynamic returned "+this.qrdynamic);
         //this.router.navigateByUrl("/qrstatic",);
     /*    let route = this.router.config.find(r => r.path === '/qrstatic');
         route.data = { data: this.qrstatic };*/
        // this.router.navigateByUrl('/qrstatic');
       // this.router.navigate(['/qrstatic',this.qrstatic]);
       let navigationExtras: NavigationExtras = {
         state: {
          qrdynamic: this.qrdynamic
         }
       };
       this.router.navigate(['/qrdynamic'], navigationExtras);
       // this.router.navigate(['/qrstatic'], {state: this.qrstatic});
 
         
        
       }
       ,err=>{
        // this.mode= 0;
         //console.log("erreuur")
         console.log("error exception code error: err---this.errorMessage,err.error,err.message");
         console.log(err);
         console.log("-----------------------------------");
         this.mode=0;
 
         console.log(this.errorMessage);
         console.log(err.error);
         console.log(err.message);
       });
   }
 
   //+++
   getImageFromService() {
     this.isImageLoading = true;
     this.imageService.getImage(this.qrdynamic).subscribe(data => {
       this.createImageFromBlob(data);
       this.isImageLoading = false;
     }, error => {
       this.isImageLoading = false;
       console.log(error);
     });
 }
 
 createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
   }, false);
 
   if (image) {
      reader.readAsDataURL(image);
   }
 }
 getImage(imageUrl: string): Observable<Blob> {
   return this.httpClient.get(imageUrl, { responseType: 'blob' });
 }
 


  ngOnInit() {
     // this.merchant = new RegistrationMerchant();
    this.autochargement()
    this.TimeSession()
    //++++++++++++++
   /* this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('session expired');
        this.gipService.logOutMerchant();
        this.router.navigateByUrl("/login")
      }
    });*/
  }
//+++++
TimeSession(){
  this.gipService.getTimesession().subscribe(data=>{
    this.timesession=data;
  
    this.bnIdle.startWatching(this.timesession).subscribe((isTimedOut: boolean) => {
      //++++
      
            if (isTimedOut) {
              console.log('session expired');
              this.gipService.logOutMerchant();
              this.router.navigateByUrl("/login")
            }
          });
    
  },err=>{
    this.gipService.logout();
    this.router.navigateByUrl("/login");
  })
  }
  
  

dsign(merchant){
console.log("signature " + merchant )
  this.gipService.generateSignture(merchant).subscribe(

    data=>{
      console.log("signature " + data )
      merchant = data;
      
    }
    ,err=>{ 
      console.log(" erreur siganture")
   
    });
  
}

  onRegister(merchant){
   console.log(merchant)
   
 /*  this.gipService.generateSignture(merchant).subscribe(

    data=>{
      
      this.merchant = data;
      console.log("signature " + this.merchant )
    }
    ,err=>{ 
      console.log(" erreur siganture")
   
    });
   console.log(merchant)
*/
   this.gipService.register(merchant).subscribe(
      data=>{
        this.merchant=data;
        this.mode= 1;
        this.show=true;
        console.log(" merchant returned "+this.merchant)
        console.log("commercant  est ajouter")
      }
      ,err=>{
        this.mode= 0;
        console.log("erreuur")
      });
  }

  
   autochargement(){
    this.gipService.getBanques().subscribe(datab=>{

    this.banques=datab;
    console.log(this.banques)
  },err=>{
      console.log("erreur de connexion")
    //this.authenticatService.logout();
    this.router.navigateByUrl("/addMerchant")

  });
  
}
//+++
getLogin() {
  return JSON.parse(localStorage.getItem('user')).login;
}

}
