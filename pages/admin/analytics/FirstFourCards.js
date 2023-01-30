
import Card from '@/components/DashboardComponents/Card'
import { cardData } from '@/components/DashboardComponents/Logic/dashboardData.helper'
import styles from './analytics.module.scss'


export default function FirstFourCards() {
  return (
    <div className={`${styles.firstFourCards}`}>
        {cardData.map((data) => {
            return(
                <Card props={data}/>
            )
        })}
   
    </div>
  )
}
