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

```
npm install
```

```
npm run build-desktop
```

```
SSB_DIR=fixturesDir npm run desktop
```

# Before

> Without index feeds
>
> Manyverse "master" branch. No CPU load throttling.

- 2min 19s
- 2min 19s
- 2min 20s
- 2min 21s

# After

> With ssb-meta-feeds, ssb-replication-scheduler setup with templates
>
> No CPU load throttling.

