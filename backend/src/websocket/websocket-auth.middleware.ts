import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import {parseCookie}from 'cookie';
import { Role } from '../users/enum/roles.enum.js';

interface JwtPayload {
  id: number;
  username?: string;
  role : Role
}

@Injectable()
export class WebsocketAuthMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(client: Socket, next: (err?: Error) => void) {
    try {
      const cookieHeader = client.handshake.headers.cookie;

      if (!cookieHeader) {
        return next(new Error('Authentication cookie not found'));
      }

      const cookies = parseCookie(cookieHeader);

      const token = cookies['access_token'];

      if (!token) {
        return next(new Error('Access token not found'));
      }

      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      if (!payload.id) {
        return next(new Error('Invalid token payload'));
      }

      client.data.user = {
        id: payload.id,
        username: payload.username,
        role : payload.role
      };

      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  }
}