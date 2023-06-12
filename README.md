[![Version](https://img.shields.io/npm/v/gatsby-static-paths.svg)](https://www.npmjs.com/package/gatsby-static-paths)
[![Downloads Total](https://img.shields.io/npm/dt/gatsby-static-paths.svg)](https://www.npmjs.com/package/gatsby-static-paths)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/escabora/gatsby-static-paths/blob/main/LICENSE.md)
[![CodeFactor](https://www.codefactor.io/repository/github/escabora/gatsby-static-paths/badge)](https://www.codefactor.io/repository/github/escabora/gatsby-static-paths)

# gatsby-static-paths

If you're looking for a solution identical to Next.js's getStaticPaths, you've come to the right place.

This plugin is very simple to use. It generates static pages in Gatsby in a very simple way.

## Install

`$ npm i gatsby-static-paths`

or

`$ yarn add gatsby-static-paths`

## How to use

Add the plugin to your `gatsby-config.js`.

```javascript
module.exports = {
  plugins: [
    `gatsby-static-paths`
  ]
}
```

In your component's page role `pages/articles.js`

```javascript
const Articles = ({ pageContext }) => {
  return <p>my article {pageContext.staticProps}</p>;
};

export default Articles;

export const getStaticPaths = async () => {
  const api = await fetch('https://dog.ceo/api/breeds/list/all');
  const json = await api.json();

  return {
    paths: Object.keys(json.message).map((article) => ({
      params: {
        basePath: '/articles/',
        slug: article,
      },
      staticProps: article,
    })),
  };
};
```

See that if you want to send props via context to a page you just need to put the value in the `staticProps` key and in your component you receive it as `pageContext.staticProps`


## On build Time
You will see the magic happen. The pages you passed as return from the getStaticPaths function will be listed.

![Shell Example](/shell-example.png)

License
-------

The code is available under the [MIT License](LICENSE.md).
