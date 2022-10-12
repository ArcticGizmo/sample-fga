import wretch from 'wretch';

export interface Tuple {
  user?: string;
  object?: string;
  relation?: string;
}

export interface RequiredTuple {
  user: string;
  object: string;
  relation: string;
}

export interface FindTuple extends RequiredTuple {
  timestamp: Date;
}

interface FindResponse {
  continuation_token: string;
  tuples: FindTuple[];
}

type FindReqTuple =
  | { object: string }
  | { user: string; object: string }
  | { user: string; type: string }
  | { object: string; relation: string }
  | { user: string; object: string; relation: string }
  | { user: string; type: string; relation: string };

class HttpService {
  _base = 'http://localhost:3000';

  private _w(endpoint: string) {
    const url = `${this._base}/${endpoint}`;
    return wretch(url);
  }

  async check(tuple: Tuple): Promise<boolean> {
    return this._w('tuples/check').post({ tuple }).json();
  }

  async find(tuple: FindReqTuple, continuation_token?: string) {
    return this._find({ object: tuple.type, ...tuple }, continuation_token);
  }

  async _find(tuple: Tuple, continuationToken?: string): Promise<FindResponse> {
    return this._w('tuples/find')
      .post({ ...tuple, continuation_token: continuationToken })
      .json(resp => {
        const tuples = resp.tuples.map(t => {
          return { ...t.key, timestamp: new Date(t.timestamp) };
        });
        return {
          continuationToken: tuple.continuation_token,
          tuples
        };
      });
  }

  async findUsers(object: string, relation: string) {
    return this.find({ object, relation });
  }

  async findObjects(user: string, relation: string, type: string): Promise<FindResponse> {
    return this.find({ user, relation, object: `${type}:` });
  }

  async findRelations(user: string, object: string) {
    return this.find({ user, object });
  }
}

export const Http = new HttpService();
