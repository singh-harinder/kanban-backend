import { config } from '@keystone-6/core';
import Board from './schemas/Board';
import Section from './schemas/Section';
import Task from './schemas/Task';
import User from './schemas/User';
import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';
import 'dotenv/config';
import Member from './schemas/Member';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: `name email isAdmin`,
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

const sessionSecret = process.env.COOKIE_SECRET;
const sessionMaxAge = 60 * 60 * 24 * 30;

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

export default config(
  withAuth({
    db: {
      provider: 'postgresql',
      url: 'postgres://kanban:kanban@postgresdb/kanban',
      enableLogging: true,
      useMigrations: true,
      idField: { kind: 'uuid' },
    },
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    lists: {
      User,
      Board,
      Task,
      Section,
      Member,
    },
    session: session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data.isAdmin,
    },
  })
);
