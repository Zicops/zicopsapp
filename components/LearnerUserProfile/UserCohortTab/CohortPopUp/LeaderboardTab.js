import SearchBar from '@/components/common/FormComponents/SearchBar';
import { useState } from 'react';
import styles from '../../learnerUserProfile.module.scss';

function LeaderboardCard({ user }) {
  return (
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
  );
}
export default function LeaderboardTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const users = [
    {
      name: 'Alexander The Great',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Ash Khetchup',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Gol D. Roger',
      bestRank: '01',
      currentRank: '10',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Witch Hunter',
      bestRank: '05',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Batman',
      bestRank: '05',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Sonali Kokalki',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Sonali Kokalki',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Sonali Kokalki',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Sonali Kokalki',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Sonali Kokalki',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Sonali Kokalki',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Sonali Kokalki',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Sonali Kokalki',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Sonali Kokalki',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Sonali Kokalki',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Sonali Kokalki',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Sonali Kokalki',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    },
    {
      name: 'Sonali Kokalki',
      bestRank: '02',
      currentRank: '05',
      rankGained: false,
      isTopThree: true
    }
  ];
  return (
    <div className={`${styles.LeaderboardTabContainer}`}>
      <div className={`${styles.searchbar}`}>
        <SearchBar
          inputDataObj={{
            inputOptions: {
              inputName: 'filter',
              placeholder: 'Search Courses',
              value: searchQuery
            },
            changeHandler: (e) => setSearchQuery(e.target.value)
          }}
        />
      </div>
      <div className={`${styles.leaderboardHeader}`}>
        <div className={`${styles.name}`}>Name</div>
        <div className={`${styles.brank}`}>Best Rank</div>
        <div className={`${styles.crank}`}>Current Rank</div>
      </div>
      <div className={`${styles.leaderboardScrollable}`}>
        {users?.map((user) => {
          if (!user?.name?.toLowerCase()?.trim()?.includes(searchQuery?.toLowerCase()?.trim()))
            return null;

          return <LeaderboardCard user={user} />;
        })}
      </div>
    </div>
  );
}
