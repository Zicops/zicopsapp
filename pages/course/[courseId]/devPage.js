import LearnerHeroSection from '@/components/LearnerCourseComps/common/LearnerHeroSection';
import CourseHero from '@/components/LearnerCourseComps/CourseHero';
import styles from '@/styles/pageStyles.module.scss';

export default function devPage() {
  return (
    <>
      <div className={`${styles.pageContainer}`}>
        <LearnerHeroSection height={85}>
          <CourseHero />
        </LearnerHeroSection>
      </div>
    </>
  );
}
