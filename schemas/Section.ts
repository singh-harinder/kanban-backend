import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';

const Section = list({
  fields: {
    name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    tasks: relationship({
      ref: 'Task.section',
      many: true,
    }),
    board: relationship({
      ref: 'Board.section',
    }),
  },
});

export default Section;
