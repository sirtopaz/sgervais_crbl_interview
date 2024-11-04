# Sean Gervais - Crbl Interview

Simple overview of use/purpose.

## Description

Based on the `Front-end Engineer take home assignement`. This is an implemation of a Log Viewer.

### Problem statement

A customer has asked you to provide an UI for viewing the contents of a log file downloaded from an URL. They would like to be able to quickly scroll through the log entries, as well as be able to expand an entry to see the full log event. Due to the fact that log files can be huge, they would like to see the log events as soon as they are transmitted to the browser over the wire, without waiting for the entire file to download.

Here’s a sample URL that can be used for downloading the log file: https://s3.amazonaws.com/io.cribl.c021.takehome/cribl.log

### Acceptance criteria

1. Your submission should include Unit Tests to show your ability to test your code. Full coverage is not required but you should have some working tests and a short write up of what else you would test given additional time.
2. The component should render the list of log entries as a table with two columns. The first column should display the time (the value of the \_time property), formatted as ISO 8601.
   The second column should present the entire event formatted as single line JSON. Each log entry should be rendered as a separate row.
3. It should be possible to expand/collapse rows. When expanded, the row should display the entire event formatted as multiline JSON, each property in a new line.
4. The component should pull data from the given URL and update the view while individual log entries are being downloaded from the server. The data is provided in the NDJSON format (new line delimited JSON). The UX should be optimized for time to first byte, i.e. the component should render the events as soon as they are downloaded from the server, without waiting for the entire file to download.

## Solution

- Created LogDataProvider - handles call to API, formats logs for view, sets up context. To meet AC4 used streaming to add responses into state instead of waiting for whole file to download
- Created LogEventTable - handles display of events in tabular form. Due to extremely large data sets, added pagination to manage display issues
- Create LogView - handles wrapping of logging table simulating a page in a bigger application
- Nice to have Create a LogChart component that can be used in LogView

### Package choices

- `vite` - framework to handle buildling and developement - used their 'react-ts' template to init the project
- `vitest` - framework for running unit test
- `react-test-library`, `jsdom` - libraries for testing React and mocking a browser enviroment
- `typscript`, `sass`, `eslint`, `prettier` - dev tools for helping to make better code

## Getting Started

### Local Dev Mode

After checking out the repo from Git, follow these commands to install and run the app in local dev mode

```
npm i
npm run dev
```

Use a browser to navigate to: http://localhost:5173/ (or local url indicated) to see the project running

### Running unit tests

After installing and running in local dev mode exit that server and use this command run the unit tests

```
npm run test
```

Type prompt `q` to quit running the tests
