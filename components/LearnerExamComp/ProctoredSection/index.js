import proctorImage from '../../../public/images/courses/2.png'
import Image from "next/image"
import styles from './proctor.module.scss'


const ProctoredSection = () => {
  return (
    <div className={`${styles.proctor_section}`}>
        <div>
            <button className={`${styles.proctor_section_btn}`}>Issue?</button>
            <button className={`${styles.proctor_section_btn}`}>Chat</button>
        </div>
        <div className={`${styles.proctor_section_img}`}>
            <Image src={proctorImage} width='260px' height='150px' />
        </div>
        <div >
          <div className={`${styles.proctor_section_info}`}>
            <p>Name</p>
            <p>ID</p>
          </div>
          <div className={`${styles.proctor_section_info}`}>
            <p>Abhishek Ghosh</p>
            <p>0909</p>
          </div>
        </div>
    </div>
  )
}

export default ProctoredSection