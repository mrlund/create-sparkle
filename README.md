# Sparkle Learning Starter

## Getting Started

To start building, clone this repo to a new directory:

```bash
npm init sparkle-learning
```


To generate markdown pages from toc, run:

```bash
npm run markdown-pages
```

To generate json pages from markown file, run:

```bash
npm run json-pages
```

## TOC

To generate prev/next url in markown file and to generate updated toc with prev/next url, run:

```bash
npm run toc
```

## Run

To run both of the operation above, run:

```bash
npm run start
```


## Live Update

To update the content, you can run the following command

```bash
npm run watch-pages
```
and then you can change the content in .md files and and json file will be updated automatically and then it'll show blue progress bar once it's completed, you can refresh the page and content will be updated. I am looking at the solution where we don't need to refresh the page but for now we need to refresh.
