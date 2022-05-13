import { FaImage } from 'react-icons/fa'

export default {
  name: 'customImage',
  title: 'Image',
  type: 'image',
  icon: FaImage,
  option: {
    hotspot: true,
  },
  fields: [
    {
      title: 'Alt Text',
      name: 'alt',
      type: 'string',
      validation: (Rule) => Rule.error('Alt Text is Required ❗').required(),
      options: {
        isHighlighted: true,
      },
    },
    {
      title: 'Reference',
      name: 'reference',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
  ],
}
