import * as express from 'express';
import { Message } from '../model/message';
import { SocketService } from '../socket/socket';

export class MessageRoutes {
  public static create(app: express.Application) {
    const router = express.Router();
    const socket = SocketService.getInstance();
    app.use('/api', router);

    /**
     * Get all messages.
     * TODO add pagination
     */
    router.get('/message', async (req, res) => {
      res.send(await Message.retrieve());
    });

    router.get('/participants', (req, res) => {
      res.send(socket.getUsers());
    });

    /**
     * Add a new message.
     */
    router.post('/message', async (req, res) => {
      const body = req.body;
      if (!body.author || !body.content) {
        res.sendStatus(400);
        return;
      }
      const message = await Message.create(body.author, body.content);
      res.send(message);
      socket.newMessage.next(message);
    });

    /**
     * Update a message.
     */
    router.put('/message/:id', async (req, res) => {
      const id = req.params['id'];
      const body = req.body;
      if (!body.content) {
        res.sendStatus(400);
        return;
      }
      const message = await Message.update(id, body.content, body.votes, body.flagged);
      res.send(message);
      socket.updatedMessage.next(message);
    });

    /**
     * Delete a message.
     */
    router.delete('/message/:id', async (req, res) => {
      const id = req.params['id'];
      if (!await Message.retrieveById(id)) {
        res.sendStatus(400);
        return;
      }
      res.send(await Message.delete(id));
    });
  }
}
