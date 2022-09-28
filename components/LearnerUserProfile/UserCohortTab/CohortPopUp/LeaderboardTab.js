import SearchBar from '@/components/common/FormComponents/SearchBar';
import styles from '../../learnerUserProfile.module.scss';

export default function LeaderboardTab() {
  const user = {
    name: 'Sonali Kokalki',
    bestRank: '02',
    currentRank: '05',
    rankGained: false,
    isTopThree: true
  };
  return (
    <div className={`${styles.LeaderboardTabContainer}`}>
      <div className={`${styles.searchbar}`}>
        <SearchBar
          inputDataObj={{
            inputOptions: {
              inputName: 'filter',
              placeholder: 'Search Courses',
            }
          }}
        />
      </div>
      <div className={`${styles.leaderboardHeader}`}>
        <div className={`${styles.name}`}>Name</div>
        <div className={`${styles.brank}`}>Best Rank</div>
        <div className={`${styles.crank}`}>Current Rank</div>
      </div>
      <div className={`${styles.leaderboardBody}`}>
        <div className={`${styles.profile}`}>
          <img src="/images/user_profile_circle.png" alt="" />
          <div className={`${styles.name}`}>{user?.name}</div>
        </div>
        <div className={`${styles.brankText}`}>{user?.bestRank}</div>
        <div className={`${styles.crankBlock}`}>
          <div className={`${styles.crankImg}`}>
            {user?.isTopThree ? (
              <img src="/images/svg/workspace_premium.svg" alt="" />
            ) : (
              <img src="/images/svg/award-line 1.svg" alt="" />
            )}
          </div>
          {user?.currentRank}
          <div className={`${styles.crankArrow}`}>
            {user?.rankGained ? (
              <img src="/images/svg/arrow_drop_up.svg" alt="" />
              ) : (
              <img src="/images/svg/arrow_drop_down.svg" alt="" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
