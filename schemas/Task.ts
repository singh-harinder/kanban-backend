import { list } from '@keystone-6/core';
import {
  checkbox,
  relationship,
  select,
  text,
  timestamp,
} from '@keystone-6/core/fields';

const Task = list({
  fields: {
    title: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    priority: select({
      type: 'enum',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ],
    }),
    publishedAt: timestamp({
      defaultValue: {
        kind: 'now',
      },
    }),
    isComplete: checkbox(),
    assignedTo: relationship({
      ref: 'Member.tasks',
      many: true,
    }),
    description: text({ validation: { isRequired: true } }),
    section: relationship({
      ref: 'Section.tasks',
    }),
  },
});

export default Task;
