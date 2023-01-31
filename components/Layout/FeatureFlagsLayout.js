// components\Layout\FeatureFlagsLayout.js

import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function FeatureFlagsLayout({ children }) {
  const [featureFlags, setFeatureFlags] = useRecoilState(FeatureFlagsAtom);
  const router = useRouter();

  // update feature flags based on localstorage
  useEffect(() => {
    // override default setItem method of localstorage
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      const event = new Event('itemInserted');
      event.value = value;
      event.key = key;

      document.dispatchEvent(event);
      originalSetItem.apply(this, arguments);
    };

    // callback function on localstorage value change
    const localStorageSetHandler = function (e) {
      console.log('localStorage.set("' + e.key + '", "' + e.value + '") was called');
      const _featureFlags = structuredClone(featureFlags || {});
      if (_featureFlags.hasOwnProperty(e.key)) {
        _featureFlags[e.key] = e.value;
      }

      setFeatureFlags((prev) => ({ ...prev, ..._featureFlags }));
    };

    // listen for localstorage change
    document.addEventListener('itemInserted', localStorageSetHandler, false);

    return () => document.removeEventListener('itemInserted', localStorageSetHandler);
  }, []);

  return <>{children}</>;
}
