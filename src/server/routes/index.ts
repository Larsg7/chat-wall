import { Router } from "express";

export class IndexRoutes {
  public static create(router: Router) {
    router.get('/', (req, res) => {
      res.send('Test');
    });
  }
}
