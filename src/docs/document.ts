import { createDocument } from 'zod-openapi';
import { ZodOpenapiExample } from '../interfaces/zod-openapi-example';
import { AuthSchema } from '../schemas/auth';
import { CellSchema } from '../schemas/cell';
import { GameSchema } from '../schemas/game';
import { SetupSchema } from '../schemas/setup';

const schemas = {
  auth: {
    register: AuthSchema.register().body,
    login: AuthSchema.login().body,
  },
  game: {
    get: GameSchema.get().params,
    getAll: GameSchema.getAll().body,
    update: GameSchema.update(),
    delete: GameSchema.delete().params,
  },
  cell: {
    get: CellSchema.get().params,
    getAll: CellSchema.getAll().body,
    update: CellSchema.update().body,
    delete: CellSchema.delete().params,
  },
  setup: {
    createOrUpdate: SetupSchema.createOrUpdate().body,
  },
};

const createResponse = (status: number, description: string, example: ZodOpenapiExample) => ({
  [status]: {
    description,
    content: {
      'application/json': {
        example,
      },
    },
  },
});

const commonResponses = {
  validationError: createResponse(400, 'Validation error or Database error', {
    error: true,
    message: 'Validation error or Database error',
    description: [{ path: ['field'], message: 'Expected type, received type' }],
  }),
  authError: createResponse(401, 'Authentication error', {
    error: true,
    message: 'No token provided, Invalid token or Token has expired',
  }),
  serverError: createResponse(500, 'Internal Server Error', {
    error: true,
    message: 'Internal Server Error',
  }),
};

const document = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'Minesweeper',
    version: '1.0.0',
    description: 'API documentation for Minesweeper',
    contact: {
      name: 'API Support',
      email: 'nicolasbobone@gmail.com',
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT Authorization header using the Bearer scheme.',
      },
    },
  },
  paths: {
    // AUTH
    '/auth/register': {
      post: {
        summary: 'User register',
        tags: ['AUTH'],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: schemas.auth.register } },
        },
        responses: {
          ...createResponse(201, 'User successfully registered', {
            error: false,
            data: {
              id: 1,
              email: 'jaimefulano@gmail.com',
              firstName: 'Jaime',
              lastName: 'Fulano',
              createdAt: '2024-07-21T15:49:08.551Z',
              updatedAt: '2024-07-21T15:49:08.551Z',
            },
          }),
          ...commonResponses.validationError,
          ...createResponse(401, 'User already exists', {
            error: true,
            message: 'User already exists',
          }),
          ...commonResponses.serverError,
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'User login',
        tags: ['AUTH'],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: schemas.auth.login } },
        },
        responses: {
          ...createResponse(200, 'User successfully logged in', {
            error: false,
            data: {
              token: 'access token',
              expiresIn: 36000,
            },
          }),
          ...commonResponses.validationError,
          ...createResponse(401, 'User does not exist or Incorrect credentials', {
            error: true,
            message: 'Incorrect credentials',
          }),
          ...commonResponses.serverError,
        },
      },
    },
    '/auth/refresh-token': {
      get: {
        summary: 'Refresh token',
        tags: ['AUTH'],
        responses: {
          ...createResponse(200, 'Refresh token success', {
            error: false,
            data: {
              token: 'access token',
              expiresIn: 36000,
            },
          }),
          ...commonResponses.authError,
          ...commonResponses.serverError,
        },
      },
    },
    '/auth/logout': {
      get: {
        summary: 'Logout user',
        tags: ['AUTH'],
        responses: {
          ...createResponse(200, 'Logout success', {
            error: false,
            data: {
              message: 'Logout success',
            },
          }),
          ...commonResponses.serverError,
        },
      },
    },
    // GAME
    '/game': {
      post: {
        summary: 'Get all games',
        tags: ['GAME'],
        requestBody: {
          content: {
            'application/json': { schema: schemas.game.getAll },
          },
        },
        responses: {
          ...createResponse(200, 'Games successfully retrieved', {
            error: false,
            data: [
              {
                id: 1,
                userId: 1,
                startDate: '2024-09-22T23:29:47.063Z',
                endDate: null,
                totalTime: 0,
                result: null,
                status: 'IN_PROGRESS',
                rows: 10,
                columns: 10,
                minesCount: 10,
                difficulty: 'MEDIUM',
                createdAt: '2024-09-22T23:29:47.063Z',
                updatedAt: '2024-09-22T23:29:47.063Z',
                cells: ['...'],
              },
              {
                id: 2,
                userId: 1,
                startDate: '2024-09-22T23:29:47.063Z',
                endDate: null,
                totalTime: 0,
                result: null,
                status: 'IN_PROGRESS',
                rows: 10,
                columns: 10,
                minesCount: 10,
                difficulty: 'MEDIUM',
                createdAt: '2024-09-22T23:29:47.063Z',
                updatedAt: '2024-09-22T23:29:47.063Z',
                cells: ['...'],
              },
            ],
          }),
          ...commonResponses.validationError,
          ...commonResponses.authError,
          ...commonResponses.serverError,
        },
      },
    },
    '/game/create': {
      post: {
        summary: 'Register a game',
        tags: ['GAME'],
        responses: {
          ...createResponse(201, 'Game successfully registered', {
            error: false,
            data: {
              id: 1,
              userId: 1,
              startDate: '2024-09-22T23:29:47.063Z',
              endDate: null,
              totalTime: 0,
              result: null,
              status: 'IN_PROGRESS',
              rows: 10,
              columns: 10,
              minesCount: 10,
              difficulty: 'MEDIUM',
              createdAt: '2024-09-22T23:29:47.063Z',
              updatedAt: '2024-09-22T23:29:47.063Z',
              cells: ['...'],
            },
          }),
          ...commonResponses.validationError,
          ...commonResponses.authError,
          ...commonResponses.serverError,
        },
      },
    },
    '/game/{id}': {
      get: {
        summary: 'Get a game',
        tags: ['GAME'],
        requestParams: {
          header: schemas.game.get,
        },
        responses: {
          ...createResponse(200, 'Game successfully retrieved', {
            error: false,
            data: {
              id: 1,
              userId: 1,
              startDate: '2024-09-22T23:29:47.063Z',
              endDate: null,
              totalTime: 0,
              result: null,
              status: 'IN_PROGRESS',
              rows: 10,
              columns: 10,
              minesCount: 10,
              difficulty: 'MEDIUM',
              createdAt: '2024-09-22T23:29:47.063Z',
              updatedAt: '2024-09-22T23:29:47.063Z',
              cells: ['...'],
            },
          }),
          ...commonResponses.validationError,
          ...commonResponses.authError,
          ...commonResponses.serverError,
        },
      },
      put: {
        summary: 'Update a game',
        tags: ['GAME'],
        requestParams: {
          header: schemas.game.update.params,
        },
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: schemas.game.update.body },
          },
        },
        responses: {
          ...createResponse(200, 'Game successfully updated', {
            error: false,
            data: {
              id: 1,
              userId: 1,
              startDate: '2024-09-22T23:29:47.063Z',
              endDate: '2024-10-22T23:29:47.063Z',
              totalTime: 0,
              result: 'WIN',
              status: 'FINISHED',
              rows: 10,
              columns: 10,
              minesCount: 10,
              difficulty: 'MEDIUM',
              createdAt: '2024-09-22T23:29:47.063Z',
              updatedAt: '2024-10-22T23:29:47.063Z',
              cells: ['...'],
            },
          }),
          ...commonResponses.validationError,
          ...commonResponses.authError,
          ...commonResponses.serverError,
        },
      },
      delete: {
        summary: 'Delete a game',
        tags: ['GAME'],
        requestParams: {
          header: schemas.game.delete,
        },
        responses: {
          ...createResponse(200, 'Game successfully deleted', {
            error: false,
            data: {
              id: 1,
              userId: 1,
              startDate: '2024-09-22T23:29:47.063Z',
              endDate: '2024-10-22T23:29:47.063Z',
              totalTime: 0,
              result: 'WIN',
              status: 'FINISHED',
              rows: 10,
              columns: 10,
              minesCount: 10,
              difficulty: 'MEDIUM',
              createdAt: '2024-09-22T23:29:47.063Z',
              updatedAt: '2024-10-22T23:29:47.063Z',
              cells: ['...'],
            },
          }),
          ...commonResponses.validationError,
          ...commonResponses.authError,
          ...commonResponses.serverError,
        },
      },
    },
    // CELL
    '/cell': {
      post: {
        summary: 'Get all cells',
        tags: ['CELL'],
        requestBody: {
          content: {
            'application/json': { schema: schemas.cell.getAll },
          },
        },
        responses: {
          ...createResponse(200, 'Cells successfully retrieved', {
            error: false,
            data: [
              {
                id: 1,
                gameId: 1,
                row: 5,
                column: 5,
                isMine: true,
                isRevealed: true,
                adjacentMines: 0,
              },
              {
                id: 2,
                gameId: 1,
                row: 5,
                column: 5,
                isMine: true,
                isRevealed: true,
                adjacentMines: 0,
              },
            ],
          }),
          ...commonResponses.validationError,
          ...commonResponses.authError,
          ...commonResponses.serverError,
        },
      },
      put: {
        summary: 'Update a game',
        tags: ['CELL'],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: schemas.cell.update },
          },
        },
        responses: {
          ...createResponse(200, 'Cell successfully updated', {
            error: false,
            data: {
              id: 1,
              gameId: 1,
              row: 5,
              column: 5,
              isMine: true,
              isRevealed: true,
              adjacentMines: 0,
              createdAt: '2024-09-22T23:47:46.844Z',
              updatedAt: '2024-09-22T23:47:46.844Z',
            },
          }),
          ...commonResponses.validationError,
          ...commonResponses.authError,
          ...commonResponses.serverError,
        },
      },
    },
    '/cell/{id}': {
      get: {
        summary: 'Get a cell',
        tags: ['CELL'],
        requestParams: {
          header: schemas.cell.get,
        },
        responses: {
          ...createResponse(200, 'Cell successfully retrieved', {
            error: false,
            data: {
              id: 1,
              gameId: 1,
              row: 5,
              column: 5,
              isMine: true,
              isRevealed: true,
              adjacentMines: 0,
              createdAt: '2024-09-22T23:47:46.844Z',
              updatedAt: '2024-09-22T23:47:46.844Z',
            },
          }),
          ...commonResponses.validationError,
          ...commonResponses.authError,
          ...commonResponses.serverError,
        },
      },
      delete: {
        summary: 'Delete a cell',
        tags: ['CELL'],
        requestParams: {
          header: schemas.cell.delete,
        },
        responses: {
          ...createResponse(200, 'Cell successfully deleted', {
            error: false,
            data: {
              id: 1,
              gameId: 1,
              row: 5,
              column: 5,
              isMine: true,
              isRevealed: true,
              adjacentMines: 0,
              createdAt: '2024-09-22T23:47:46.844Z',
              updatedAt: '2024-09-22T23:47:46.844Z',
            },
          }),
          ...commonResponses.validationError,
          ...commonResponses.authError,
          ...commonResponses.serverError,
        },
      },
    },
    // SETUP
    '/setup': {
      post: {
        summary: 'Register or Update a setup',
        tags: ['SETUP'],
        requestBody: {
          content: {
            'application/json': { schema: schemas.setup.createOrUpdate },
          },
        },
        responses: {
          ...createResponse(201, 'Setup successfully registered', {
            error: false,
            data: {
              id: 1,
              rows: 10,
              columns: 10,
              minesCount: 10,
              difficulty: 'MEDIUM',
              createdAt: '2024-09-22T23:29:47.063Z',
              updatedAt: '2024-09-22T23:29:47.063Z',
            },
          }),
          ...commonResponses.validationError,
          ...commonResponses.authError,
          ...commonResponses.serverError,
        },
      },
      get: {
        summary: 'Get a setup',
        tags: ['SETUP'],
        responses: {
          ...createResponse(200, 'Setup successfully retrieved', {
            error: false,
            data: {
              id: 1,
              rows: 10,
              columns: 10,
              minesCount: 10,
              difficulty: 'MEDIUM',
              createdAt: '2024-09-22T23:29:47.063Z',
              updatedAt: '2024-09-22T23:29:47.063Z',
            },
          }),
          ...commonResponses.validationError,
          ...commonResponses.authError,
          ...commonResponses.serverError,
        },
      },
      delete: {
        summary: 'Delete a setup',
        tags: ['SETUP'],
        responses: {
          ...createResponse(200, 'Setup successfully deleted', {
            error: false,
            data: {
              id: 1,
              rows: 10,
              columns: 10,
              minesCount: 10,
              difficulty: 'MEDIUM',
              createdAt: '2024-09-22T23:29:47.063Z',
              updatedAt: '2024-10-22T23:29:47.063Z',
            },
          }),
          ...commonResponses.validationError,
          ...commonResponses.authError,
          ...commonResponses.serverError,
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
});

export { document };
