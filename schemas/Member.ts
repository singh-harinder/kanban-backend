import { list } from '@keystone-6/core';
import { password, relationship, text } from '@keystone-6/core/fields';

const Member = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    password: password(),
    tasks: relationship({
      ref: 'Task.assignedTo',
      many: true,
    }),
    leader: relationship({
      ref: 'User.member',
    }),
  },
});

export default Member;
