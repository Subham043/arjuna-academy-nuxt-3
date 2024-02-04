import type UserType from "./user";
declare module "@auth/core/types" {
  interface Session {
    user: UserType & DefaultSession["user"];
  }
  interface User {
    verified?: string;
    id?: string | number | undefined;
    token?: string;
    phone?: number;
  }
  interface JWT {
    /** OpenID ID Token */
    verified?: string;
    id?: string | number | undefined;
    token?: string;
    phone?: number;
  }
}

export {};
