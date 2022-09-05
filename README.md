# Sparkle Learning Starter

## Getting Started

Start createing your own course by running following command: 
```bash
npm init sparkle-learning
```

Once you have set up the project locally, you can update table of content from `/assets/content/toc.json` and if follows this hierarchy.

=>courseModules => sessions => pages

*courseModules* : Here you can just define modules for your course and define your modulename and url.

*sessions* : Here you can  define sessions for your course and define your sessionname and url.

*pages* : Here you can just define pages for your course and you can define page title and url.

Once you are done with updating toc file, you can run following command to generate markdown file from toc.json using follwing command.

To generate markdown pages from toc, run:

```bash
npm run build-pages-generate
```

Once markdown files are generated, Run the following command to generate json file from markdown file using following command.

To generate json pages from markown file, run:

```bash
npm run build-pages
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
