
import Card from '@/components/DashboardComponents/Card'
import styles from './analytics.module.scss'
import useHandleFirstFourCard from './Logic/useHandleFirstFourCard'


export default function FirstFourCards() {
  const cardData = useHandleFirstFourCard()
  return (
    <div className={`${styles.firstFourCards}`}>
        {cardData.map((data) => {
            return(
                <Card key ={ data.id }{...data}/>
            )
        })}
   
    </div>
  )
}
