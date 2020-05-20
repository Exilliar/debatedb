# debatedb

A site for storing sources for debates/arguments, along with quotes from those sources and notes about the sources.

This site comes from me wanting to have a place to easily store sources for arguments/debates that I have with people. Currently I use a google doc to do this, which works fine, but it would be better if there was a dedicated area to keep things like that. Where the sources can have quotes written under them, be sorted into addressing different arguments within the larger debate. Things like storing the best counters to different arguments, and my current best version of the argument would also be useful to have next to the sources for the particular argument. A place for more general notes about the different arguments is also something that would be nice to have, but out of the way.

DebateDB solves this by providing a store of all the things mentioned above. Split into an easily navigatable set of debates and arguments so that sources for specific arguments can be found quickly rather than having to sort through unordered notes.

## Definitions

There are 2 terms that are important to define for this site:

1. Debate
2. Argument

A debate is a collection of points that are all related to each other. They might all share the same topic, or all be part of one conversation with someone that happened in real life.

- Example: Has the implementation of the Congestion Charge been positive in London.

An argument is a smaller, individual point in a debate. An argument should be either fully sourced, or be clearly marked as opinion. The argument of the site contains areas for sources, quotes from the sources, notes about the argument, counters to the arguments, the current form of the argument and the best counters to the argument.

- Example: Congestion in London has fallen since the introduction of the Congestion Charge

## Layout of site

There are 3 main pages in the site:

1. Debates
2. Arguments
3. Argument

All page names describe what the pages are pretty simply. Debates is where all the debates are stored, arguments is where all the arguments are stored and argument is where the individual arguments with their sources are stored.

## Structure of the project

This project aims to follow the basic Vue style guide structure as well as possible.

All components are in the components folder. All components that are only used in one view have their names start with the name of that view.

Views all have "View" in their names so that classes/interface's can be easily made for their inputs (e.g. Argument is an interface, and a view). Component names do not have to include the "View" part of the views name.

This project does not use Vuex (even though it is installed) as it is not likely to be large enough to need it (and I don't know how to use it). It is installed so if the project size increases above what was origionally planned then it can be used.

## Wireframe

[Figma Wireframe](https://www.figma.com/file/lWJPKDVdjEZZ3aHXpxvZwk/DebateDB?node-id=4%3A84)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
