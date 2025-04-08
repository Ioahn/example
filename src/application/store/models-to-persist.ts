import {
  selectedTopicsSlice,
  settingsSlice,
  shortProfileSlice,
} from '@entities/models';

export const modelsToPersist = [
  selectedTopicsSlice.name,
  shortProfileSlice.name,
  settingsSlice.name,
];
