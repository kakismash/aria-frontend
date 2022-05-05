import { Floor } from './floor.model';
import { User } from 'src/app/model/user.model';
import { Apartment } from './apartment.model';

export class Building {

  id!:                  number;
  name!:                string;
  description!:         string;
  apartments:           Array<Apartment> = new Array<Apartment>();
  users:                Array<User>      = new Array<User>();
  floors:               Array<Floor>     = new Array<Floor>();

}
