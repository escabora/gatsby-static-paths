[![Version](https://img.shields.io/npm/v/gatsby-static-paths.svg)](https://www.npmjs.com/package/gatsby-static-paths)
[![Downloads Total](https://img.shields.io/npm/dt/gatsby-static-paths.svg)](https://www.npmjs.com/package/gatsby-static-paths)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/escabora/gatsby-static-paths/blob/main/LICENSE)
[![CodeFactor](https://www.codefactor.io/repository/github/escabora/gatsby-static-paths/badge)](https://www.codefactor.io/repository/github/escabora/gatsby-static-paths)

# gatsby-static-paths

An implementation from getStaticPaths from Next.js to Gatsby via Plugin.

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

## Using

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

License
-------

The code is available under the [MIT License](LICENSE.md).
