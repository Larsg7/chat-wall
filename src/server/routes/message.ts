import * as express from 'express';
import { Message } from '../model/message';

export class MessageRoutes {
  public static create(app: express.Application) {
    const router = express.Router();
    app.use('/api/message', router);

    /**
     * Get all messages.
     * TODO add pagination
     */
    router.get('/', async (req, res) => {
      res.send(await Message.retrieve());
    });

    /**
     * Add a new message.
     */
    router.post('/', async (req, res) => {
      const body = req.body;
      if (!body.author || !body.content) {
        res.sendStatus(400);
        return;
      }
      res.send(await Message.create(body.author, body.content));
    });

    /**
     * Update a message.
     */
    router.put('/:id', async (req, res) => {
      const id = req.params['id'];
      const body = req.body;
      if (!body.content) {
        res.sendStatus(400);
        return;
      }
      res.send(await Message.update(id, body.content, body.votes, body.flagged));
    });

    /**
     * Delete a message.
     */
    router.delete('/:id', async (req, res) => {
      const id = req.params['id'];
      if (!await Message.retrieveById(id)) {
        res.sendStatus(400);
        return;
      }
      res.send(await Message.delete(id));
    });
  }
}
