import { getResourceCount } from '@/components/CourseBody/Logic/courseBody.helper';
import { ResourcesAtom } from '@/state/atoms/module.atoms';
import { Fragment, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ItemSlider from '../ItemSlider';

export default function TwoRowCarousel({
  carouselProps,
  itemsArr,
  CardComp,
  cardProps = {},
  responsiveViews
}) {
  let prevItem = null;

  const resources = useRecoilValue(ResourcesAtom);
  const [isResourcesFound, setIsResourcesFound] = useState(true);

  useEffect(() => {
    // return;
    if (!cardProps?.hideResourcesOnEmpty) return;

    const isFound = itemsArr?.some((dt) => !!getResourceCount(resources, dt?.id));
    setIsResourcesFound(isFound);
  }, []);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <ItemSlider
          carouselProps={carouselProps}
          noDataFound={!isResourcesFound}
          responsiveViews={responsiveViews}>
          {itemsArr.map((dt, i) => {
            if (i + 1 == itemsArr.length) {
              return (
                <Fragment key={dt.id + i + prevItem?.id}>
                  {prevItem && (
                    <div style={cardProps?.hideResourcesOnEmpty ? {} : { padding: '5px' }}>
                      <CardComp data={prevItem} {...cardProps} />
                    </div>
                  )}

                  <div style={cardProps?.hideResourcesOnEmpty ? {} : { padding: '5px' }}>
                    <CardComp data={dt} {...cardProps} />
                  </div>
                </Fragment>
              );
            }
            if (i % 2 == 0) {
              prevItem = dt;
              return null;
            }

            return (
              <Fragment key={dt.id + i + prevItem?.id}>
                <div style={cardProps?.hideResourcesOnEmpty ? {} : { padding: '5px' }}>
                  <CardComp data={prevItem} {...cardProps} />
                </div>

                <div style={cardProps?.hideResourcesOnEmpty ? {} : { padding: '5px' }}>
                  <CardComp data={dt} {...cardProps} />
                </div>

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
