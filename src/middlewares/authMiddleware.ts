import { FetchParams, Middleware, ResponseContext } from "../apis";
import storage from "../utils/storage";

export class AuthMiddleware implements Middleware {
  

  public async pre(context: ResponseContext): Promise<FetchParams | void> {
    const accessToken = this.acquireToken();
    return {
      url: context.url,
      init: {
        ...context.init,
        headers: new Headers({
          ...context.init.headers,
          Authorization: `${accessToken}`,
        }),
      },
    };
  }

  public post(context: ResponseContext): Promise<Response | void> {
    return Promise.resolve(context.response);
  }

  private async acquireToken(): Promise<string> {
    // const { authData } = useAuth();
    // console.log(`Acquire token ${authData}`);
    // return authData;
    try {
      const token = await storage.load({ key: 'bearerToken'});
      console.log(`Acquire token ${token}`);
      return `Bearer ${token}`;
    } catch (err) {
      console.log(`Acquire token error ${err}`);
      return '';
    }
  }
}