export type User = {
  id: number;
  email: string;
  full_name: string;
  role: "admin" | "sales";
  is_active: boolean;
};

export type AuthResponse = {
  token: string;
  user: User;
};
