import mongoose = require('mongoose');
import Mockgoose = require('mockgoose-fix');
const mockgoose = new Mockgoose.Mockgoose(mongoose);
mongoose.Promise = global.Promise;
mockgoose.helper.setDbVersion('3.4.3');
import { MessageModel, Message } from './message';

describe('Message', () => {
  beforeAll(done => {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://foobar/bar');
      mongoose.connection.on('connected', () => {
        done();
      });
    });
  });

  afterEach(done => {
    mockgoose.helper.reset().then(done);
  });

  it('should get none', async done => {
    const res = await Message.retrieve();
    expect(res.length).toBe(0);
    done();
  });

  it('should get none by id', async done => {
    const createdM = await Message.create('Author1', 'Message1');
    const retrievedM = await Message.retrieveById(createdM._id);
    expect(retrievedM.author).toBe('Author1');
    done();
  });

  it('should create one', async done => {
    const res = await Message.create('Author1', 'Message1');
    expect(res.author).toBe('Author1');
    expect(res.content).toBe('Message1');
    expect(res.votes).toBe(0);
    expect(res.flagged).toBe(0);
    expect(res.dateCreated).toBeDefined();
    expect(res.dateModified).toBeDefined();
    const allMessages = await Message.retrieve();
    expect(allMessages.length).toBe(1);
    done();
  });

  it('should get all', async done => {
    const mock = [
      { author: 'Author1', content: 'Content1' },
      { author: 'Author2', content: 'Content2' },
      { author: 'Author3', content: 'Content3' },
    ];
    await Promise.all(mock.map(e => Message.create(e.author, e.content)));
    const allMessages = await Message.retrieve();
    expect(allMessages.length).toBe(3);
    allMessages.forEach((e, index) => {
      expect(e.author).toBe(mock[index].author);
      expect(e.content).toBe(mock[index].content);
    });
    done();
  });

  it('should update one', async done => {
    const createdM = await Message.create('Author1', 'Message1');
    const updatedM = await Message.update(createdM._id, 'newContent', 2, 5);
    expect(updatedM.author).toBe('Author1');
    expect(updatedM.content).toBe('newContent');
    expect(updatedM.votes).toBe(2);
    expect(updatedM.flagged).toBe(5);
    const allMessages = await Message.retrieve();
    expect(allMessages.length).toBe(1);
    expect(allMessages[0].content).toBe('newContent');
    done();
  });

  it('should delete one', async done => {
    const mock = [
      { author: 'Author1', content: 'Content1' },
      { author: 'Author2', content: 'Content2' },
      { author: 'Author3', content: 'Content3' },
    ];
    await Promise.all(mock.map(e => Message.create(e.author, e.content)));
    const allMessages = await Message.retrieve();
    await Message.delete(allMessages[0]._id);
    const allMessagesAfterDeletion = await Message.retrieve();
    expect(allMessagesAfterDeletion.length).toBe(2);
    done();
  });
});
