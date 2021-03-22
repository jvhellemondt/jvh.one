// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'jvh.one',
  siteDescription:
    'Your endpoint for modern web development! En dan in het Nederlands.',
  metadata: {
    author: {
      firstName: 'Jens',
      lastName: 'van Hellemondt'
    },
    social: {
      twitter: {
        id: '@jvhellemondt',
        url: '//twitter.com/jvhellemondt'
      },
      github: {
        user: 'jvhellemondt',
        url: '//github.com/jvhellemondt',
        editBlogUrl:
          '//github.com/jvhellemondt/jvh.one/tree/main/content/posts'
      },
      gitlab: {
        user: 'jvhellemondt',
        url: '//gitlab.com/jvhellemondt'
      }
    },
    referral: {
      one: '//one.me/nlazvrrf'
    }
  },

  templates: {
    // Post: '/:title',
    Tag: '/tag/:id'
  },

  plugins: [
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Post',
        baseDir: './content/posts',
        template: './src/templates/Post.vue',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true
          }
        },
        plugins: [
          [
            'gridsome-plugin-remark-twitter',
            {
              hideTread: false,
              hideMedia: false,
              align: 'center',
              omitScript: true
            }
          ]
        ]
      }
    },
{
    use: 'gridsome-plugin-gtag',
    options: {
        config: {
            id: 'G-WWQQHYCEEF',
        },
    },
},
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link'
    }
  }
}
