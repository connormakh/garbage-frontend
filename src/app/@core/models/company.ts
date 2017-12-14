import {TrashCan} from "../../pages/trash/trash-card/trash-can";
import {Driver} from "./driver";
export class Company {
  id: string;
  name: string;
  country: string;
  contact_number: string;
  truck_count: number;
  truck_volume: number;
  drivers: Driver[]
  garbageCans: TrashCan[]
  latitude: string;
  longitude: string;
}
