import { Schema, Document, model } from 'mongoose';
import { RepositoryBase } from './repository';

export interface MessageModel extends Document {
  author: string;
  content: string;
  votes: number;
  flagged: number;
  dateCreated?: Date;
  dateModified?: Date;
}

const schema = new Schema({
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: false
  },
  flagged: {
    type: Number,
    required: false
  },
  dateCreated: {
    type: Date,
    required: false
  },
  dateModified: {
    type: Date,
    required: false
  }
}).pre('save', (next) => {
  if (this._doc) {
    const doc = <MessageModel>this._doc;
    const now = new Date();
    if (!doc.dateCreated) {
      doc.dateCreated = now;
    }
    doc.dateModified = now;
  }
  next();
  return this;
});

export const MessageSchema = model<MessageModel>('message', schema, 'messages', true);

export class Message {
  constructor(private message: MessageModel) {
  }

  public static retrieve(): Promise<MessageModel[]> {
    return new Promise((resolve, reject) => {
      const repo = new MessageRepository();
      repo.retrieve((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  public static create(author: string, content: string): Promise<MessageModel> {
    return new Promise((resolve, reject) => {
      const repo = new MessageRepository();

      const message: MessageModel = <MessageModel>{
        author: author,
        content: content,
        votes: 0,
        flagged: 0
      };

      repo.create(message, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  public static update(id: string, content: string, votes?, flagged?): Promise<MessageModel> {
    return new Promise((resolve, reject) => {
      const repo = new MessageRepository();

      repo.findById(id, (err, res) => {
        if (err) {
          reject(err);
        } else {
          res.content = content;
          if (votes !== undefined) {
            res.votes = votes;
          }
          if (flagged !== undefined) {
            res.flagged = flagged;
          }
          res.save().then(resolve).catch(reject);
        }
      });
    });
  }

  public static delete(id: string): Promise<MessageModel> {
    return new Promise((resolve, reject) => {
      const repo = new MessageRepository();

      repo.findById(id, (err, res) => {
        if (err) {
          reject(err);
        } else {
          res.remove().then(resolve).catch(reject);
        }
      });
    });
  }
}

export class MessageRepository extends RepositoryBase<MessageModel> {
  constructor() {
    super(MessageSchema);
  }
}
