import type {
  LoginInfo,
  SignupInfo,
  UserInfo,
  UserInfoWithPassWord,
} from '../ts/types';

type UserResponse =
  | {
      user: UserInfo;
      accessToken: string;
    }
  | string;

export const baseUrl = 'http://localhost:3000' as const;

async function fetchUser(
  userId: string,
  accessToken: string,
): Promise<UserInfoWithPassWord> {
  const response = await fetch(`${baseUrl}/600/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data: UserInfoWithPassWord = await response.json();

  return data;
}

async function login(loginInfo: LoginInfo): Promise<UserResponse | string> {
  const { email, password } = loginInfo;
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data: UserResponse | string = await response.json();

  return data;
}

async function signup(signupInfo: SignupInfo): Promise<UserResponse | string> {
  const { email, password, name } = signupInfo;
  const response = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data: UserResponse | string = await response.json();

  return data;
}

async function editInfo(
  userInfoWithPassWord: UserInfoWithPassWord,
): Promise<UserResponse | string> {
  const { email, password, name, id } = userInfoWithPassWord;
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data: UserResponse | string = await response.json();

  return data;
}

export const API = {
  fetchUser,
  login,
  signup,
  editInfo,
};
