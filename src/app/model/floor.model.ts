import { Apartment } from "./apartment.model";
import { Building } from "./building.model";

export class Floor {
    
    id:          number;
    name:        string;
    type:        number;
    description: string;
    apartments:  Array<Apartment> = new Array<Apartment>();
    building:    Building; 
  }