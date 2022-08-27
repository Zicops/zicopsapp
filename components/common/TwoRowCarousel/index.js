import { getResourceCount } from '@/components/CourseBody/Logic/courseBody.helper';
import { ResourcesAtom } from '@/state/atoms/module.atoms';
import { Fragment, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ItemSlider from '../ItemSlider';

export default function TwoRowCarousel({ carouselProps, itemsArr, CardComp, cardProps = {} }) {
  let prevItem = null;

  const resources = useRecoilValue(ResourcesAtom);
  const [isResourcesFound, setIsResourcesFound] = useState(true);

  useEffect(() => {
    if (cardProps?.isNotes) return;

    const isFound = itemsArr?.some((dt) => !!getResourceCount(resources, dt?.id));
    setIsResourcesFound(isFound);
  }, []);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <ItemSlider carouselProps={carouselProps} noDataFound={!isResourcesFound}>
          {itemsArr.map((dt, i) => {
            if (i + 1 == itemsArr.length) {
              return (
                <Fragment key={dt.id + i + prevItem?.id}>
                  {prevItem && <CardComp data={prevItem} {...cardProps} />}

                  <CardComp data={dt} {...cardProps} />
                </Fragment>
              );
            }
            if (i % 2 == 0) {
              prevItem = dt;
              return null;
            }

            return (
              <Fragment key={dt.id + i + prevItem?.id}>
                <CardComp data={prevItem} {...cardProps} />
                <CardComp data={dt} {...cardProps} />

                {/* reset prevItem */}
                {(prevItem = null)}
              </Fragment>
            );
          })}
        </ItemSlider>
      </div>
    </>
  );
}
