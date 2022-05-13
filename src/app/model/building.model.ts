import { Apartment } from "./apartment.model";
import { Floor } from "./floor.model";
import { User } from "./user.model";

export class Building {

    id:          number;
    name:        string;
    address:     string;
    description: string;
    apartments:  Array<Apartment> = new Array<Apartment>();
    users:       Array<User>      = new Array<User>();
    floors:      Array<Floor>     = new Array<Floor>();
  
  }