import { Auth0FgaApi } from '@auth0/fga';
import type { UserConfigurationParams } from '@auth0/fga/dist/configuration';
import type {
  ContextualTupleKeys,
  CheckRequest,
  TupleKey,
  ReadRequest
} from '@auth0/fga/dist/apiModel';

export interface GetModelsOpts {
  pageSize?: number;
  continuationToken?: string;
}

type FindReqTuple =
  | { object: string }
  | { user: string; object: string }
  | { user: string; type: string }
  | { object: string; relation: string }
  | { user: string; object: string; relation: string };

export type CheckOpts = Omit<CheckRequest, 'tuple_key'>;
export type ReadRequestOpts = Omit<ReadRequest, 'tuple_key'>;

const env = process.env;
const OPTS: UserConfigurationParams = {
  environment: env['FGA_ENVIRONMENT'],
  storeId: env['FGA_STORE_ID'],
  clientId: env['FGA_CLIENT_ID'],
  clientSecret: env['FGA_CLIENT_SECRET']
};

class FgaClient {
  private _api: Auth0FgaApi;
  constructor() {
    this._api = new Auth0FgaApi(OPTS);
  }

  async getModels(opts?: GetModelsOpts) {
    const resp = await this._api.readAuthorizationModels(opts?.pageSize, opts?.continuationToken);
    return resp.authorization_models;
  }

  async check(tuple: TupleKey, opts?: CheckOpts) {
    const req: CheckRequest = { ...opts, tuple_key: tuple };
    const resp = await this._api.check(req);
    return resp.allowed;
  }

  async find(tuple: FindReqTuple, opts?: ReadRequest) {
    return this._api.read({ ...opts, tuple_key: tuple });
  }

  async getTuplesForObject(object: string) {
    return this.find({ object });
  }

  async getTuplesWithType(user: string, type: string, relation: string) {
    return this.find({ user, object: `${type}:`, relation });
  }

  // get a list of relations for a user+object pair
  async getRelations(user: string, object: string) {
    return this.find({ user, object }).then(resp => resp.tuples.map(t => t.key.relation));
  }

  // get a list of relations for a user+type pair
  async getRelationsWithType(user: string, type: string) {
    return this.getRelations(user, `${type}:`);
  }

  // get all users for an object+relation pair
  async getUsers(object: string, relation: string) {
    return this.find({ object, relation }).then(resp => resp.tuples.map(t => t.key.user));
  }
}

export const FGA = new FgaClient();
