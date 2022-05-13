import { FaCode } from 'react-icons/fa'
export default {
  name: 'customCode',
  title: 'Code',
  type: 'object',
  icon: FaCode,
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'code',
    },
  ],
  preview: {
    select: {
      title: 'code.code',
    },
  },
}
