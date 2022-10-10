import express, { Request, Response } from 'express';
import type { ContextualTupleKeys } from '@auth0/fga/dist/apiModel';
import { FGA } from '@/services/fga';
const router = express.Router();

interface Tuple {
  user?: string;
  relation?: string;
  object?: string;
}

interface RequiredTuple {
  user: string;
  relation: string;
  object: string;
}

interface CheckReq {
  tuple: RequiredTuple;
  contextual_tuples?: ContextualTupleKeys;
  authorization_model_id?: string;
}

interface FindUserReq {
  object: string;
  relation: string;
}

interface FindObjectReq {
  user: string;
  relation: string;
}

interface FindRelationReq {
  user: string;
  object: string;
}

type Req<P> = Request<{}, {}, P>;

router.post('/check', async (req: Req<CheckReq>, res: Response) => {
  console.dir(req.body);
  const { tuple, ...opts } = req.body;

  if (!tuple.user || !tuple.object || !tuple.relation) {
    res.sendStatus(400);
    return;
  }

  try {
    const allowed = await FGA.check(tuple, opts);
    res.json(allowed);
  } catch (error) {
    res.status(error.statusCode).json(error.responseData);
  }
});

router.post('/find-users', async (req: Req<FindUserReq>, res: Response) => {
  res.sendStatus(200);
});

router.post('/find-objects', async (req: Req<FindObjectReq>, res: Response) => {
  res.sendStatus(200);
});

router.post('/find-relations', async (req: Req<FindRelationReq>, res: Response) => {
  res.sendStatus(200);
});

router.post('/related', async (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as tuplesRoute };
