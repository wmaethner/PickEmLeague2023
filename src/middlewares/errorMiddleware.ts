import { ErrorContext, FetchParams, Middleware, ResponseContext } from "../apis";
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
          Authorization: `Bearer ${accessToken}`,
        }),
      },
    };
  }

  public post(context: ResponseContext): Promise<Response | void> {
    return Promise.resolve(context.response);
  }

  public async onError(context: ErrorContext): Promise<void | Response> {
    console.error('logging error', context.error);
  }

  private async acquireToken(): Promise<string> {
    try {
      const token = await storage.load({ key: 'bearerToken '});
      return `Bearer ${token}`;
    } catch (err) {
      console.log(err);
      return '';
    }
    // return Promise.resolve().then(() => {
    //   return 'ACCESS_TOKEN';
    // });
  }


}