export interface ILogin {
  userName: string | any;
  userAddress: string | any;
}

export interface ILoginContext {
  loginInfo: ILogin;
  storeLoginInfo: any;
}
