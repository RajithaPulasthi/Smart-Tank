export type Authority = {
    authority: string;
  };
  
  export type User = {
    id?: number;
    fullName: string;      // ⬅️ changed
    email: string;         // ⬅️ changed
    userName: string;
    address?: string;
    status: string;        // ⬅️ changed
    authorities: Authority[];
  };
  