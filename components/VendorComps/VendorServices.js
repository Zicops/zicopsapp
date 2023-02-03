import styles from './vendorComps.module.scss';
import { ExpertiseIcon } from '/components/common/ZicopsIcons/index.js';
import { LanguagesIcon } from '/components/common/ZicopsIcons/index.js';
import { ContentFormatIcon } from '/components/common/ZicopsIcons/index.js';

export default function VendorServices({ data }) {
  return (
    <div className={`${styles.vendorTypeContainer}`}>
      <div className={`${styles.expertise}`}>
        <div className={`${styles.expertiseHeader}`}>
          <ExpertiseIcon />
          <span>Expertise</span>
        </div>
        <div className={`${styles.expertisePill}`}>
          {data.expertise.map((value, key) => {
            return <p>{value}</p>;
          })}
        </div>
      </div>
      <div className={`${styles.languages}`}>
        <div className={`${styles.languagesHeader}`}>
          <LanguagesIcon />
          <span>Languages</span>
        </div>
        <div className={`${styles.languagesPill}`}>
          {data?.languages?.map((value, key) => {
            return <p>{value}</p>;
          })}
        </div>
      </div>
      <div className={`${styles.contentFormat}`}>
        <div className={`${styles.contentFormatHeader}`}>
          <ContentFormatIcon />
          <span>Content Format</span>
        </div>
        <div className={`${styles.contentFormatPill}`}>
          {data?.contentFormat?.map((value, key) => {
            return <p>{value}</p>;
          })}
        </div>
      </div>
      <div className={`${styles.sample}`}>
        <div className={`${styles.sampleHeader}`}>
          <span>Sample</span>
        </div>
        <div className={`${styles.sampleFiles}`}>
          <img src="/images/discord_logo.png" />
          <img src="/images/discord_logo.png" />
          <img src="/images/discord_logo.png" />
          <img src="/images/discord_logo.png" />
        </div>
      </div>
    </div>
  );
}
