import { list } from '@keystone-6/core';
import {
  checkbox,
  password,
  relationship,
  text,
} from '@keystone-6/core/fields';

const User = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    password: password({ validation: { isRequired: true } }),
    isAdmin: checkbox({
      defaultValue: true,
      label: 'Admin',
    }),
    board: relationship({
      ref: 'Board.user',
      many: true,
    }),
    member: relationship({
      ref: 'Member.leader',
      many: true,
    }),
  },
});

export default User;
