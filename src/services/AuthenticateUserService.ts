import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";
/**
 *
 * Steps
 * [x] Receber code string
 * [x] Recuperar o access token
 * [x] Recuperar infos do user no github
 * [x] Verificar se o usuário existe no banco de dados
 * --- SIM --- Gerar Token
 * --- NÃO --- Criar um novo usuário no banco de dados e gerar um token
 * [] Retornar o token com as informações do usuário
 *
 */

interface IAccessToken {
  access_token: string;
}

interface IUserResponse {
  name: string;
  login: string;
  id: number;
  avatar_url: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";
    const { data: accessTokenResponse } = await axios.post<IAccessToken>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    const response = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    const { login, id, avatar_url, name } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          name,
          avatar_url,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return { token, user };
  }
}

export { AuthenticateUserService };
