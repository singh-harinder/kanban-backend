import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import 'dotenv/config';
import { Board } from './schemas/Board';
import { Section } from './schemas/Section';
import { Task } from './schemas/Task';
import { User } from './schemas/User';

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
    },
    lists: createSchema({
      User,
      Task,
      Board,
      Section,
    }),
    ui: {
      // isAccessAllowed: ({ session }) => {
      //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      //   if (session?.data?.isAdmin) {
      //     return true;
      //   }
      // },
      isAccessAllowed: () => true,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: 'id name email isAdmin',
    }),
  })
);
