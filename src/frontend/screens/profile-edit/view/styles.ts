// SPDX-FileCopyrightText: 2018-2021 The Manyverse Authors
//
// SPDX-License-Identifier: MPL-2.0

import {StyleSheet, Platform} from 'react-native';
import {Palette} from '../../../global-styles/palette';
import {Dimensions} from '../../../global-styles/dimens';
import {Typography} from '../../../global-styles/typography';

export const avatarSize = Dimensions.avatarSizeBig;
const avatarSizeHalf = avatarSize * 0.5;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor: Palette.backgroundText,
  },

  cover: {
    backgroundColor: Palette.brandMain,
    height: avatarSizeHalf,
    zIndex: 10,
  },

  fields: {
    top: -avatarSize,
    marginBottom: -avatarSize,
    zIndex: 10,
    paddingTop: avatarSizeHalf + Dimensions.verticalSpaceNormal,
    paddingBottom: Dimensions.verticalSpaceNormal,
    paddingLeft: Dimensions.horizontalSpaceBig,
    paddingRight: Dimensions.horizontalSpaceBig,
    backgroundColor: Palette.backgroundText,
  },

  avatarTouchable: {
    top: -avatarSizeHalf,
    left: Dimensions.horizontalSpaceBig,
    width: avatarSize,
    height: avatarSize,
    zIndex: 19,
  },

  avatar: {
    zIndex: 20,
  },

  label: {
    fontSize: Typography.fontSizeSmall,
    color: Palette.textWeak,
    marginLeft: Platform.select({
      android: 3,
      default: Dimensions.horizontalSpaceSmall,
    }),
  },

  textInput: {
    fontSize: Typography.fontSizeNormal,
    lineHeight: Typography.lineHeightNormal,
    marginBottom: Dimensions.verticalSpaceBig,
    color: Palette.text,
    ...Platform.select({
      android: {},
      default: {
        borderColor: Palette.textVeryWeak,
        borderWidth: 1,
        borderRadius: Dimensions.borderRadiusNormal,
        paddingHorizontal: Dimensions.horizontalSpaceSmall,
        paddingVertical: Dimensions.verticalSpaceSmall,
      },
    }),
  },

  save: {
    position: 'absolute',
    top: Platform.select({
      ios: -44,
      default: avatarSizeHalf + Dimensions.verticalSpaceSmall,
    }),
    right: Platform.select({
      ios: 0,
      default: Dimensions.horizontalSpaceBig,
    }),
    zIndex: 30,
  },

  saveText: {
    textTransform: 'uppercase',
  },
});
