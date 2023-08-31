import { BaseAPI, Configuration } from "../apis";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import storage from "../utils/storage";

type ApiConstructor<T extends BaseAPI> = new (config: Configuration) => T;

export default async function useApi<T extends BaseAPI>(api: ApiConstructor<T>) {
  // const {authData} = useAuth();
  // const token = getToken();

  const bearerToken = async () => {
    try {
      console.log("gettin token");
      const token = await storage.load({ key: 'bearerToken'});
      console.log(token);
      `Bearer ${token}`
    } catch {
      return '';
    }
  }

  
  return new api(
    new Configuration({
      // basePath: process.env.REACT_APP_BASE_URL,
      basePath: "http://pickemleague2023-env.eba-8mjsx79p.us-east-1.elasticbeanstalk.com/api",
      // apiKey: `Bearer ${await storage.load({ key: 'bearerToken'})}`,
      // apiKey: await bearerToken(),
      middleware: [new AuthMiddleware()]
    })
  );
}
