import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Task = list({
  fields: {
    title: text({ isRequired: true, isUnique: true }),
    description: text({ isRequired: true, isUnique: true }),
    // user: relationship({
    //   ref: 'User.tasks',
    //   defaultValue: ({ context }) => ({
    //     connect: { id: context.session.itemId },
    //   }),
    // }),
    section: relationship({
      ref: 'Section.tasks',
    }),
  },
});
