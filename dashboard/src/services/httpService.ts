import wretch from 'wretch';

export interface Tuple {
  user?: string;
  object?: string;
  relation?: string;
}

class HttpService {
  _base = 'http://localhost:3000';

  private _w(endpoint: string) {
    const url = `${this._base}/${endpoint}`;
    return wretch(url);
  }

  async check(tuple: Tuple): Promise<boolean> {
    return this._w('tuples/check').post({ tuple }).json();
  }
}

export const Http = new HttpService();
