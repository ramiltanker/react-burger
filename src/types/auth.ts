export type TUserRegistration = TUserNameAndEmail;

export type TUserNameAndEmail = {
  email: string;
  name: string;
};

export type TUserAuth = TUserNameAndEmail;

export type TGetUserData = TUserNameAndEmail;

export type TLogoutData = {
  success: boolean;
  message: string;
};

export type TUpdateUserData = TUserNameAndEmail;
