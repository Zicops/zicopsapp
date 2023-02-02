## Learning

## Changelog

- EsLint and Prettier
  - Added eslint and prettier in the project for error catching and consistent code format for readability
  - Followed the steps from here --> https://dev.to/knowankit/setup-eslint-and-prettier-in-react-app-357b

## Folder Structure

- Folder name should NOT be capitalized.
- React Components folders should be capitalized.
- Component should alway be in folder with index.js inside exporting the component

For creating a new component

- Create a new folder with component name (ComponentName)
- Add a index.js inside the ComponentName folder
- export default functional component in index.js
- Add componentName.module.scss, Logic folder if required
- Add subcomponents in ComponentName folder
- if subcompoents require subSubComponent then move the subComponent to /component

```
zicopsapp (root directory)

├── assets (all the static assets like images, icons, fonts)
│   ├── containerName (component or page name)
│   │   ├── image.png
│   ├── logo.svg
│   ├── favicon.ico

├── archives (all old components which are moved according to new structure)

├── components (all react components which are not pages)
│   ├── common (all UI stateless components which are used at multiple locations)
│   │   ├── ComponentName
│   │   │   ├── index.js
│   │   │   ├── componentName.module.scss
│   ├── ComponentName (all components which are used in pages or other components)
│   │   ├── SubComponentName (component which is only used in parent component, logic and styles should be used from parent component)
│   │   │   ├── index.js
│   │   ├── Logic (business logic of component and subcomponent)
│   │   │   ├── useHookName.js
│   │   │   ├── componentName.helper.js (helper or utils functions of component and subcomponent)
│   │   ├── index.js
│   │   ├── componentName.module.scss

├── helper (all react components which are not pages)
│   ├── common (all UI stateless components which are used at multiple locations)

├── pages (add react components with page name)

├── state

├── k8s
├── .next
├── .eslintrc.json
├── .prettierrc
├── Dockerfile
├── next.config.js
├── .gitignore
└── README.md

```

## Module classes

Module Classname should be add like this
`` classname={`${styles.ComponentClass} globalClassName`} ``

classname should be in camelCase

pageName/index.js+styles.scss

compoennts/ pageComponent/subcompoent1/subcomp2

## Global classes

Class name should be in kebab case (class-name)

## Check HTML box model

\*{
border: 1px solid lightblue;
background-color: rgba(red, 0.1)!important;
}
