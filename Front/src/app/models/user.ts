export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  MANAGER = 'MANAGER'
  // ➕ add other roles from your USER_ROLE enum in backend
}

export interface User {
  id_user?: number;

  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  numeroTelephone: string;

  user_role: UserRole;

}
