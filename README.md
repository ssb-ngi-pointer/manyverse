<!--
SPDX-FileCopyrightText: 2021 The Manyverse Authors

SPDX-License-Identifier: CC-BY-4.0
-->

## Manyverse fork with index feeds

This repo is a fork of [Manyverse](https://github.com/staltz/manyvrese) to add
metafeeds and index feeds and benchmark the performance of secure partial
replication in an end-to-end environment.

## Setup

> Bob on a Mac Book Pro recovering all data from Alice on a Thinkpad Carbon X1.
>
> Timer starts when the connection is displayed on the Connections tab, and is
> stopped when the Public tab has stopped showing indicator of new messages.

First, generate the fixtures (see sections Before and After).

Then, build and run Manyverse desktop:

```
npm install
```

```
npm run build-desktop
```

```
SSB_DIR=database npm run desktop
```

First run Manyverse desktop with `SSB_DIR=database npm run desktop` on "Alice" so she can migrate flume to ssb-db2, and make sure that it is fully migrate. Then delete
`database/flume` folder, and restart Alice.

Open up Bob's Manyverse desktop and with `SSB_DIR=database npm run desktop` on a `database` folder that **only** has Bob's `secret` file.

# Before

> Without index feeds
>
> Manyverse "master" branch. No CPU load throttling.

```
npx ssb-fixtures --seed=apple --messages=100000 --authors=1000 --outputDir=database --slim --allkeys --followGraph --report --progress
```

Results of repeated runs:

- 2min 19s
- 2min 19s
- 2min 20s
- 2min 21s

# After

> With ssb-meta-feeds, ssb-replication-scheduler setup with templates
>
> No CPU load throttling.

```
npx ssb-fixtures --seed=apple --messages=100000 --authors=1000 --outputDir=database --slim --allkeys --followGraph --report --progress --indexFeeds=100 --indexFeedTypes=post,vote,contact,about,private
```
