import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Board = list({
  fields: {
    name: text({ isRequired: true }),
    section: relationship({
      ref: 'Section.board',
      many: true,
    }),
  },
});
