const createDynamicPages = require('./index');

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['babel-preset-gatsby'],
});

exports.onCreatePage = async ({ page, actions }) => {
  actions.deletePage(page);
  if (page.component.includes('.cache')) return;

  const PageComponent = require(page.component);
  const getStaticPaths = PageComponent.getStaticPaths;
  createDynamicPages(getStaticPaths, actions, page);
};
