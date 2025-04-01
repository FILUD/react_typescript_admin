export interface LoginResponse {
    message: string;
    token: string;
    user: {
      member_id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  }