import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
  // https://github.com/americanexpress/jest-image-snapshot#%EF%B8%8F-api
  failureThreshold: 0,
  failureThresholdType: 'pixel',
});
