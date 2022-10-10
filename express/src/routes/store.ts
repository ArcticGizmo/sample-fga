import { FGA } from '@/services/fga';
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/model', async (req: Request, res: Response) => {
  const models = await FGA.getModels();
  res.json(models[0]);
});

router.post('/', async (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as storeRoute };
