import { Schema, Document, model } from 'mongoose';

export interface MessageModel extends Document {
  author: string;
  content: string;
  votes: number;
  flagged: number;
  dateCreated: Date;
  dateModified: Date;
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


}
