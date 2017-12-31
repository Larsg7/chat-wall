import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortParticipants'
})
export class SortParticipantsPipe implements PipeTransform {

  transform(users: string[], user?: string): any {
    if (user) {
      const newUsers = Array.from(users);
      const index = newUsers.indexOf(user);
      if (index > -1) {
        newUsers.splice(index, 1);
        return [user].concat(newUsers);
      }
    }
    return users;
  }

}
