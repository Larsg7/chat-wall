import { MessageModel } from '../../server/model/message';
export class Message {
  constructor(
    public id: number,
    public author: string,
    public content: string,
    public votes: number,
    public flagged: number,
    public dateCreated: Date,
    public dateModified: Date,
  ) {}

  public static fromApi(m: MessageModel): Message {
    return new Message(
      m._id,
      m.author,
      m.content,
      m.votes,
      m.flagged,
      m.dateCreated,
      m.dateModified,
    );
  }

  public toApi(): MessageModel {
    return <MessageModel>{
      id: this.id,
      author: this.author,
      content: this.content,
      votes: this.votes,
      flagged: this.flagged
    };
  }
}
