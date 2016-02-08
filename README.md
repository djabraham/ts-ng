TypeScript Demo
==

### A TypeScript demo with Classic Angular 1.X modules.

This demo is intended to showcase some of the major advantages to using TypeScript.
The demo does not make use of a packager, such as browserify or webPack. But those
forms of mosule delivery should work just as well.

The use of Visual Studio Code is optional, but an IDE with TypeScript Support
is highly recommended, so the full benefits of using TypeScript can be realized.

* Sublime Text (demo version available)
* WebStorm (commerical only)
* Eclipse (free)

For more tools, see the [DefinatelyTyped](http://definitelytyped.org/directory/tools.html)
wiki pages.

### Quick Links

* [TypeScript](http://www.typescriptlang.org/Handbook) http://www.typescriptlang.org/Handbook
* [DefinatelyTyped (tsd)](http://definitelytyped.org/tsd/) http://definitelytyped.org/tsd/
* [VS Code](https://code.visualstudio.com/Docs/languages/typescript) https://code.visualstudio.com/Docs/languages/typescript

### Description

* Simple API Server
* Simple Angular 1.X Client

The client is output into a single js file, while the server retains the
seperate module files that are more suitable for node. These module systems are
often referred to as internal/external within the TypeScript community.

A shared type definition file is provided to demonstrate how it would be useful on
both server and client. These d.ts files also referred to as ambient definitions.

TsLint is optional, and can be invoked directly within VSCode or executed as cli.

### Folder Structure

    root
    ├─ .vscode                  Visual Studio Code configuration
    ├─ config
    │  └─ default.json
    ├─ dist
    │  ├─ client                Angular client output
    │  └─ server                Server output
    ├─ src
    │  ├─ client                Angular Client source
    │  └─ server                Server source
    └─ typings                  DefinatelyTyped store

#### Getting Started

Clone a copy of the repo:

```
$ git clone https://github.com/djabraham/typescript-demo.git
```

Download node_modules and dependencies:

```
$ npm install
```

Install DefinatelyTyped and download dependencies:

```
$ sudo npm install tsd -g
$ tsd install
```

Install Bower (if you don't already have it) and download dependencies:

```
$ sudo npm install bower -g
$ bower install
```

Install gulp-cli (if you don't already have it):

```
$ sudo npm install gulp-cli -g
```

Build source and watch for changes:

```
$ gulp
```
#### Running and Linting

**Client address:** **http://localhost:3088**

The server and client are actually served from 3080, but the BrowserSync service wraps
it and proxies it to 3088, so that it can send dynamic updates to the browser.

Run TsLint on the source code:

```
$ gulp tslint
```
See gulpfile.js for other more granular options.

### VSCode integration
Visual Studio Code is an editor based on the GitHub Electron Shell (Atom), that runs
on Windows, Mac and Linux. It's open source and has greqat support for JS and other
file formats.

Some of the features shown above are best ran as VSCode tasks, such as tslint.
The IDE can parse the output and help navigate to issues within the code.

#### Run a task
* Hit Ctrl + P
* Run "task ..."

#### Kill a running task
* Hit Ctrl + shift + P
* Run "Tasks: Terminate Running Task"

