export interface UserProps {
  id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  typeUserId: string;
  affiliatedId: number | null;
  gender: number;
  avatar: string;
  banner: string;
  verifiedUserId: number | null;
  skinUserId: number | null;
  premiumUserId: string;
  createdAt: string;
  updatedAt: string;
}
