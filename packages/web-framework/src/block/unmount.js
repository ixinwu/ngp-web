import warning from 'warning';
import { unmount as coreUnmount } from '@ixinwu-ngp/web-core';

/* eslint-disable-next-line */
export default function unmount(blockConfig, bundle) {
  let identity;

  if (typeof blockConfig === 'string') {
    identity = blockConfig;
  }

  if (typeof blockConfig === 'object') {
    identity = blockConfig.identity;
  }

  warning(identity, 'block config need identity');

  if (identity) {
    coreUnmount(identity);
  }
}
