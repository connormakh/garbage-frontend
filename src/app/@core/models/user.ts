import {Company} from "./company";
export class User {
  id: number;
  name: string;
  password: string;
  token: string;
  companyName: string;
  contact_number: string;
  country: string;
  country_coordinates: {lat: 0, lng: 0}
  company: Company;
}
