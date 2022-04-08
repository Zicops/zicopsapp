import { useState } from 'react';
import Image from 'next/image';
import Button from '../Button';
import { volume, volumeBtn, volumeSlider, show } from '../controlbar.module.scss';

export default function Volume({ handleVolumeChange, handleMute, isMute }) {
  return (
    <div className={`${volume}`}>
      <div className={`${volumeSlider}`}>

        <input
          type="range"
          name="volume"
          onChange={handleVolumeChange}
        />

      </div>

      <Button styleClass={`${volumeBtn}`} handleClick={handleMute}>
          {isMute ? (
            <Image src="/images/audio.png" alt="" width='25px' height='25px' />
          ) : (
            <Image src="/images/volume-up_90749.png" alt="" width='25px' height='25px' />
          )}
      </Button>
    </div>
  );
}
