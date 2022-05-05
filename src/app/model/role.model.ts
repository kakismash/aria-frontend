import { User } from './user.model';

export class Role {

  id!:            number;
  name!:          string;
  level!:         number;
  users:          Array<User> = new Array<User>();

}
