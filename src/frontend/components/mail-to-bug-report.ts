// SPDX-FileCopyrightText: 2021 The Manyverse Authors
//
// SPDX-License-Identifier: MPL-2.0

import {NativeModules, Platform} from 'react-native';
const packageJson =
  Platform.OS === 'web' ? require('../../../package.json') : {version: ''};

const version =
  'v' + (NativeModules.BuildConfig?.VERSION_NAME ?? packageJson.version);
const platform = Platform.select({
  ios: 'iOS',
  android: 'Android',
  default: 'Desktop',
});

const MAIL_TO_BUG_REPORT =
  'mailto:' +
  'incoming+staltz-manyverse-6814019-issue-@incoming.gitlab.com' +
  `?subject=Bug report for ${platform} ${version}` +
  '&body=Explain what happened and what you expected...';

export default MAIL_TO_BUG_REPORT;
