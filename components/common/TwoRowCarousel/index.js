import { Fragment } from 'react';
import ItemSlider from '../ItemSlider';

export default function TwoRowCarousel({ carouselProps, itemsArr, CardComp, cardProps = {} }) {
  let prevItem = null;

  return (
    <>
      <div style={{ position: 'relative' }}>
        <ItemSlider carouselProps={carouselProps}>
          {itemsArr.map((dt, i) => {
            if (i + 1 == itemsArr.length) {
              return (
                <>
                  {prevItem && (
                    <div style={{ padding: '5px' }}>
                      <CardComp data={prevItem} {...cardProps} />
                    </div>
                  )}
                  <div style={{ padding: '5px' }}>
                    <CardComp data={dt} {...cardProps} />
                  </div>
                </>
              );
            }
            if (i % 2 == 0) {
              prevItem = dt;
              return null;
            }

            return (
              <Fragment key={dt.id + i + prevItem?.id}>
                <div style={{ padding: '5px' }}>
                  <CardComp data={prevItem} {...cardProps} />
                </div>
                <div style={{ padding: '5px' }}>
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
