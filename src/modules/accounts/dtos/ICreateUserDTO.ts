interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
  email: string;
  driver_license: string;
  admin?: boolean;
}

export { ICreateUserDTO };
