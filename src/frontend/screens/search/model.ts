/* Copyright (C) 2021 The Manyverse Authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import xs, {Stream} from 'xstream';
import dropRepeats from 'xstream/extra/dropRepeats';
import {FeedId, PostContent} from 'ssb-typescript';
import {GetReadable, SSBSource} from '../../drivers/ssb';
import {MsgAndExtras} from '../../ssb/types';
import {Props} from './props';
const Ref = require('ssb-ref');

export interface State {
  selfFeedId: FeedId;
  selfAvatarUrl?: string;
  lastSessionTimestamp: number;
  query: string;
  queryOverride: string;
  queryOverrideFlag: number;
  queryInProgress: boolean;
  getResultsReadable: GetReadable<MsgAndExtras<PostContent>> | null;
}

export interface Actions {
  updateQueryNow$: Stream<string>;
  updateQueryDebounced$: Stream<string>;
  clearQuery$: Stream<any>;
}

export default function model(
  props$: Stream<Props>,
  state$: Stream<State>,
  ssbSource: SSBSource,
  actions: Actions,
) {
  const propsReducer$ = props$.take(1).map(
    (props) =>
      function propsReducer(_prev?: State): State {
        return {
          selfFeedId: props.selfFeedId,
          selfAvatarUrl: props.selfAvatarUrl,
          lastSessionTimestamp: props.lastSessionTimestamp,
          query: '',
          queryOverride: '',
          queryOverrideFlag: 0,
          queryInProgress: false,
          getResultsReadable: null,
        };
      },
  );

  const updateQueryInProgressReducer$ = actions.updateQueryNow$.map(
    (query) =>
      function updateQueryInProgressReducer(prev: State): State {
        const queryInProgress = query.length > 0;
        if (queryInProgress) {
          return {...prev, queryInProgress: true};
        } else {
          return {...prev, queryInProgress: false, getResultsReadable: null};
        }
      },
  );

  const updateQueryReducer$ = actions.updateQueryDebounced$.map(
    (query) =>
      function updateQueryReducer(prev: State): State {
        if (Ref.isMsgId(query) || Ref.isFeedId(query)) {
          // In case of a shortcut to Thread or Account, clear the input field
          return {
            ...prev,
            query: '',
            queryOverride: '',
            queryOverrideFlag: 1 - prev.queryOverrideFlag,
            queryInProgress: false,
            getResultsReadable: null,
          };
        } else {
          return {...prev, query};
        }
      },
  );

  const clearQueryReducer$ = actions.clearQuery$.mapTo(
    function clearQueryReducer(prev: State): State {
      return {
        ...prev,
        query: '',
        queryOverride: '',
        queryOverrideFlag: 1 - prev.queryOverrideFlag,
        queryInProgress: false,
        getResultsReadable: null,
      };
    },
  );

  const query$ = state$.map((state) => state.query).compose(dropRepeats());

  const updateResultsReducer$ = query$
    .filter((query) => query.length > 0)
    .map((query) => ssbSource.searchPublicPosts$(query))
    .flatten()
    .map(
      (getResultsReadable) =>
        function updateResultsReducer(prev: State): State {
          return {...prev, getResultsReadable};
        },
    );

  return xs.merge(
    propsReducer$,
    updateQueryInProgressReducer$,
    updateQueryReducer$,
    clearQueryReducer$,
    updateResultsReducer$,
  );
}