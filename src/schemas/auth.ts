import { z } from '../config/zod';

export class AuthSchema {
  static register() {
    return {
      body: z
        .object({
          firstName: z.string().min(3).openapi({
            description: 'Nombre del usuario',
            example: 'Jaime',
          }),
          lastName: z.string().min(3).openapi({
            description: 'Apellido del usuario',
            example: 'Fulano',
          }),
          email: z.string().email().openapi({
            description: 'Email del usuario',
            example: 'jaimefulano@gmail.com',
          }),
          password: z.string().min(6).openapi({
            description: 'Contraseña del usuario',
            example: 'contraseña.de.jaime',
          }),
        })
        .strict(),
    };
  }

  static login() {
    return {
      body: z
        .object({
          email: z.string().email().openapi({
            description: 'Email del usuario',
            example: 'jaimefulano@gmail.com',
          }),
          password: z.string().min(6).openapi({
            description: 'Contraseña del usuario',
            example: 'contraseña.de.jaime',
          }),
        })
        .strict(),
    };
  }
}
