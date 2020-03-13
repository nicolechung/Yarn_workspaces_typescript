# Yarn workspaces and typescript

Using yarn workspaces with typescript is more straightforward than it looks, I made this example as a reference.

## Typescript: Project References

You might have heard of Typescript's new [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html#what-is-a-project-reference). Seriously, don't use this. Yarn workspaces will take care of the linking.

## Only 1 yarn lockfile

There should only be 1 lockfile and it should be in the root folder. If you have others they aren't needed.

How yarn workspaces work: you should only have to run `yarn` or `yarn install` in the root directory, and this will install `node_modules` for both the root and inside each workspace.

## Basic structure

```
- root directory
-- package.json
-- components
---- package.json
-- docs
---- package.json
```

## Basic structure after `yarn install`

```
- root directory
-- package.json
-- node_modules (shared)

-- components
---- package.json
---- node_modules (for components and anything added to nohoist)

-- docs
---- package.json
---- node_modules (for docs and anything added to nohoist)
```

## npm package @scopes

Each package.json in the workspace should have a name with the owner's @scope. In this example I named it `@fakescope` since this is a fake project.

`@fakescope` should also be the name in the root.

Example

```
- root -> @fakescope
-- components -> @fakescope/components
-- docs -> @fakescope/docs
```

**However** for the workspace names in the root `package.json` -- those should be the **folder names**.

```
"workspaces": [
    "components",
    "docs"
  ]
```

## Linking and a postinstall hook

To use the `components` in `docs`, the package **name** of components should be used in docs:

```
"dependencies": {
    other dependencies...
    "@fakescope/components": "0.0.1"
},
```

Then, you can treat imports as if they are an actual npm package, whether you have **published the package or not**.

```
import { Button } from "@fakescope/components";

<Button />
```

### Build must exist for this linking to work!

For this to work however, you'll need to make sure you've created a build (dist) in your `components` package.

This is because in `components/package.json` we have declared a main file:

```
"main": "dist/index.js",
```

One way to do this (easiest) is to have a postinstall hook in `docs` since docs is depending on a build of `components`.
