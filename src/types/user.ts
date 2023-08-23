// NOTE: optimally move this into a separate file
export interface User {
  id: string;
  name: string;
  email: string;
  authToken?: string;
}