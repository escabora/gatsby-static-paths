/**
 * @param {function} getStaticPaths - Function exported from component
 * @param {function} actions - Function of the Gatsby Node APIs
 * @param {Object} page - Object containing page properties
 * * @returns {Function} Returns asynchronous function to create the pages using Gatsby Node APIs
 */
const createDynamicPages = async (getStaticPaths, actions, page) => {
  if (!getStaticPaths) {
    actions.createPage({
      ...page,
    });
  } else {
    try {
      const routes = await getStaticPaths();
      for (route of routes?.paths) {
        const staticPath = route.params.basePath + route.params.slug;
        console.log('\x1b[32msuccess\x1b[0m', staticPath);
        actions.createPage({
          ...page,
          path: staticPath,
          context: { staticProps: route?.staticProps },
        });
      }
    } catch (err) {
      console.error('\x1b[41mError gatsby-plugin-static-paths\x1b[0m', err);
    }
  }
};

module.exports = createDynamicPages;
