import { Router } from "express";
import * as express from 'express';
import { Message } from '../model/message';

export class MessageRoutes {
  public static create(app: express.Application) {
    const router = express.Router();
    app.use('/api/message', router);
    router.get('/', async (req, res) => {
      res.send(await Message.retrieve());
    });

    router.post('/', async (req, res) => {
      const body = req.body;
      res.send(await Message.create(body.author, body.content));
    });
  }
}
