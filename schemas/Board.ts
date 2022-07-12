import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';

const Board = list({
  fields: {
    name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    section: relationship({
      ref: 'Section.board',
      many: true,
    }),
    user: relationship({
      ref: 'User.board',
    }),
  },
});

export default Board;
