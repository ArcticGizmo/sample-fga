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

  async find(tuple: TupleKey, opts?: ReadRequest) {
    return this._api.read({ ...opts, tuple_key: tuple });
  }

  async findUsers(relation: string, object: string, opts?: ReadRequestOpts) {
    return this.find({ relation, object }, opts);
  }

  async findObjects(user: string, relation: string, opts?: ReadRequestOpts) {
    return this.find({ user, relation }, opts);
  }

  async findRelations(user: string, object: string, opts?: ReadRequestOpts) {
    return this.find({ user, object }, opts);
  }
}

export const FGA = new FgaClient();
