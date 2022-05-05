import { Building } from './building.model';
import { Apartment } from 'src/app/model/apartment.model';

export class Floor {

  id?:                number;
  name!:              string;
  type!:              number;
  description!:       string;
  apartments:         Array<Apartment> = new Array<Apartment>();
  building!:          Building;

}
