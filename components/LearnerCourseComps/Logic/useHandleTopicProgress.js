import { useEffect, useRef } from 'react';

export default function useHandleTopicProgress() {
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }, []);

  return { containerRef };
}
