import { FetchParams, Middleware, ResponseContext } from "../apis";
import storage from "../utils/storage";

export class AuthMiddleware implements Middleware {
  

  public async pre(context: ResponseContext): Promise<FetchParams | void> {
    return {
      url: context.url,
      init: {
        ...context.init,
        headers: new Headers({
          ...context.init.headers,
          Authorization: `${await this.acquireToken()}`,
        }),
      },
    };
  }

  public post(context: ResponseContext): Promise<Response | void> {
    return Promise.resolve(context.response);
  }

  private async acquireToken(): Promise<string> {
    try {
      const token = await storage.load({ key: 'bearerToken'});
      return `Bearer ${token}`;
    } catch (err) {
      return '';
    }
  }
}