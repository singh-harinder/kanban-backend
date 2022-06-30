import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Section = list({
  fields: {
    name: text({ isRequired: true, isUnique: true }),
    tasks: relationship({
      ref: 'Task.section',
      many: true,
    }),
    board: relationship({
      ref: 'Board.section',
    }),
  },
});
