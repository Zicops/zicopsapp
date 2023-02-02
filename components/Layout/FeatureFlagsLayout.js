// components\Layout\FeatureFlagsLayout.js

import { getCurrentHost, logger } from '@/helper/utils.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function FeatureFlagsLayout({ children }) {
  const [featureFlags, setFeatureFlags] = useRecoilState(FeatureFlagsAtom);
  const router = useRouter();

  const isDemoInstance = ['demo.zicops.com', 'staging.zicops.com', 'localhost:3000'].includes(
    getCurrentHost()
  );

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
      const _featureFlags = structuredClone(featureFlags || {});
      if (_featureFlags.hasOwnProperty(e.key)) {
        _featureFlags[e.key] = e.value;
        setFeatureFlags((prev) => {
          if (!prev?.isDemo && isDemoInstance) _featureFlags.isDemo = true;

          return { ...prev, ..._featureFlags };
        });
      }
    };

    // listen for localstorage change
    document.addEventListener('itemInserted', localStorageSetHandler, false);
    window.enableDevMode = enableDevMode;
    window.enableDemoInstance = enableDemoInstance;

    const isDev = localStorage.getItem('isDev') === 'true';
    enableDevMode(isDev);

    return () => document.removeEventListener('itemInserted', localStorageSetHandler);
  }, []);

  useEffect(() => {
    if (!featureFlags.isDemo) return;

    console.info(
      '%c Demo Instance Activated',
      'font-weight: bold; font-size: 30px; color: #6bcfcf;'
    );
  }, [featureFlags.isDemo]);

  function enableDevMode(isEnable = true) {
    console.clear();
    // enable dev mode for Zicops
    // in dev mode all the console logs will be visible
    // intended to test features and its functionality after deployed

    if (!isEnable) {
      setFeatureFlags((prev) => {
        if (prev.isDev)
          console.info('%c Dev Mode Disabled', 'font-weight: bold; font-size: 30px; color: red;');

        return { ...prev, isDev: false, isDemo: isDemoInstance };
      });
      return localStorage.removeItem('isDev');
    }

    localStorage.setItem('isDev', isEnable);
    logger()?.enableLogger();

    // https://www.telerik.com/blogs/how-to-style-console-log-contents-in-chrome-devtools
    console.log(
      '%c Dev Mode Enabled',
      'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)'
    );
  }

  function enableDemoInstance(isEnable = true) {
    console.clear();

    if (!isEnable)
      console.info('%c Demo Mode Disabled', 'font-weight: bold; font-size: 30px; color: red;');

    setFeatureFlags((prev) => ({ ...prev, isDev: false, isDemo: isEnable }));
  }

  return <>{children}</>;
}
