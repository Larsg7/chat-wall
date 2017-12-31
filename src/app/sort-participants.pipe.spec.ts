import { SortParticipantsPipe } from './sort-participants.pipe';

describe('SortParticipantsPipe', () => {
  it('create an instance', () => {
    const pipe = new SortParticipantsPipe();
    expect(pipe).toBeTruthy();
  });

  it('sorts username to the top', () => {
    const user = 'Test';
    const users = ['Test2', 'Test3', user, 'Test4'];
    const pipe = new SortParticipantsPipe();
    const newUsers = pipe.transform(users, user);
    expect(newUsers).toEqual([user, 'Test2', 'Test3', 'Test4']);
  });

  it('changes nothing if user is not found', () => {
    const users = ['Test2', 'Test3', 'Test4'];
    const pipe = new SortParticipantsPipe();
    const newUsers = pipe.transform(users, 'Test');
    expect(newUsers).toEqual(users);
  });
});
