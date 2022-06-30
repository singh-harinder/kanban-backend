import { checkbox, password, relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const User = list({
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    isAdmin: checkbox({
      isRequired: true,
      label: 'Admin',
      defaultValue: false,
    }),
    password: password({ isRequired: true }),
    // tasks: relationship({
    //   ref: 'Task.user',
    //   many: true,
    // }),
  },
});
