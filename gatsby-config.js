module.exports = {
  siteMetadata: {
    title: 'jvh.one',
    author: 'Jens van Hellemondt',
    description: 'Nederlandse web developer met een voorliefde voor frontend development. Ik schrijf over mijn ideeën en hetgeen dat ik geleerd heb. Allemaal in het Nederlands.',
    siteUrl: 'https://jvh.one',
    social: {
      twitter: { id: '@jvhellemondt', base: 'https://twitter.com/' },
      github: { id: 'jvhellemondt', base: 'https://github.com/' }
    },
    referrals: {
      one: {
        id: 'nlazvrrf',
        base: 'https://one.me/'
      }
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images/`,
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts/`,
        name: 'posts',
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          placeholder: 'dominantColor',
          quality: 10,
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: '262589136',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/assets/vectors/` // See below to configure properly
        }
      }
    }
  ],
};
