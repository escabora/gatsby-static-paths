require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['babel-preset-gatsby'],
});

exports.onCreatePage = async ({ page, actions }) => {
  actions.deletePage(page);
  if (page.component.includes('.cache')) return;

  const PageComponent = require(page.component);
  const getStaticPaths = PageComponent.getStaticPaths;

  if (!getStaticPaths) {
    actions.createPage({
      ...page,
    });
  } else {
    try {
      const routes = await getStaticPaths();
      for (route of routes?.paths) {
        const staticPath = route.params.basePath + route.params.slug;
        console.log('create page ', staticPath);
        actions.createPage({
          ...page,
          path: staticPath,
          context: { staticProps: route?.staticProps },
        });
      }
    } catch (err) {
      console.error('Error gatsby-plugin-static-paths', err);
    }
  }
};
