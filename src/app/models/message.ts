export interface MessageApi {
  id: number;
  author: string;
  content: string;
  votes: number;
}

export class Message {
  constructor(
    public id: number,
    public author: string,
    public content: string,
    public votes: number,
  ) {}

  public static fromApi(m: MessageApi): Message {
    return new Message(
      m.id,
      m.author,
      m.content,
      m.votes,
    );
  }

  public toApi(): MessageApi {
    return {
      id: this.id,
      author: this.author,
      content: this.content,
      votes: this.votes,
    };
  }
}
