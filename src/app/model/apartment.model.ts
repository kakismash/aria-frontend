import { Floor } from './floor.model';
import { Building } from './building.model';

export class Apartment {

  id!:                number;
  display!:           string;
  description!:       string;
  building!:          Building;
  floors:             Array<Floor> = new Array<Floor>();
}
