const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const kebabCase = require('lodash.kebabcase');

exports.onCreateWebpackConfig = ({
  stage,
  actions,
  getConfig
}) => {
  if (stage === 'develop') {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    );
    if (miniCssExtractPlugin) miniCssExtractPlugin.options.ignoreOrder = true;
    actions.replaceWebpackConfig(config);
  }
};

exports.onCreateNode = ({
  node,
  getNode,
  actions
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'pages'
    });

    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
};

exports.createPages = async ({
  graphql,
  actions,
  reporter
}) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(
        limit: 2000, 
        filter: {frontmatter: {published: {eq: true}}}
      ) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/posts/index.tsx'),
      context: {
        slug: node.fields.slug
      }
    });
  });

  const tags = result.data.tagsGroup.group;
  tags.forEach((tag) => {
    createPage({
      path: `/tags/${kebabCase(tag.fieldValue)}/`,
      component: path.resolve('./src/templates/tags/index.tsx'),
      context: {
        tag: tag.fieldValue
      }
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = [`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
  `,
  `
    type Frontmatter {
      cover: File @link(by: "relativePath")
    }
  `];
  createTypes(typeDefs);
};

// exports.createSchemaCustomization = ({ actions, schema }) => {
//   const { createTypes } = actions;
//   const typeDefs = [`
//       type MarkdownRemark implements Node {
//         frontmatter: Frontmatter
//       }
//     `,
//   schema.buildObjectType({
//     name: 'Frontmatter',
//     fields: {
//       image: {
//         type: 'String',
//         resolve: (source, args, context, info) => {
//           console.log({ context });
//           console.log({ source });
//           console.log({ args });
//           return source.cover;
//           // context.nodeModel
//           //   .getAllNodes({ type: "AuthorJson" })
//           //   .find(author => author.email === source.author)
//         },
//       },
//     },
//   }),
//   ];
//   createTypes(typeDefs);
// };
