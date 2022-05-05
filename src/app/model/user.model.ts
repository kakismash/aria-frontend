import { Building } from './building.model';
import { Role } from './role.model';

export class User {

  id!:                  number;
  username!:            string;
  firstname!:           string;
  lastname!:            string;
  password!:            string;
  enabled!:             boolean;
  phoneNumber!:         string;
  socialSecurity!:      string;
  defaultBuilding!:     number;
  role!:                Role;
  token!:               string;
  buildings:            Array<Building> = new Array<Building>();

}
