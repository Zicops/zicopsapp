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
    const isZicopsProVersion = localStorage.getItem('isZicopsProVersion') || false;
    const isUserMappedToMultipleLsps = localStorage.getItem('isUserMappedToMultipleLsps') || false;
    const devWIP = localStorage.getItem('devWIP') || false;

    setFeatureFlags((prev) => ({
      ...prev,
      isZicopsProVersion: isZicopsProVersion === 'true',
      devWIP: devWIP === 'true',
      isUserMappedToMultipleLsps: isUserMappedToMultipleLsps === 'true'
    }));
  }, [router.pathname]);

  return <>{children}</>;
}
