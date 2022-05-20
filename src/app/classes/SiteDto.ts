import { AcceptorPointDto } from "./AcceptorPointDto";

export class SiteDto{
    public siteName: any;
    public statusS: any;
    public location: any;
    public typeOfSite: any;
    public openingDateS: any;
    public countryS: any;
    public regionS: any;
    public cityS: any;
    public physicalAddress1: any;
    public physicalAddress2: any;
    public physicalAddress3: any;
    public digitalAddressS: any;
    public stateS: any;
    public postalCode: any;
    public zipCodeS: any;
    public emailS: any;
    public mobileNumberS: any;

    acceptorPoints:AcceptorPointDto[]=[];

    idItem:number=0;

}