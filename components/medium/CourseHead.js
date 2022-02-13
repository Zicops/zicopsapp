import Dropdown from '../small/SmallDropdown'
import styles from '../../styles/CourseHead.module.css'

const CourseHead = () => {
    return (
        <div className={styles.add_course_head}>
          <div className={styles.head}>
            <h2>Add a new course</h2>
              <Dropdown />
              {/* <select name="course" id="course" className={styles.select_course}>
                <option value="self_paced">Self Paced</option>
                <option value="maths">Maths</option>
                <option value="audi">Audi</option>
              </select> */}

          </div>
          <div className={styles.icons}>
            {/* <i class="fas fa-2x fa-cog"></i>
            <i class="fas fa-2x fa-sitemap"></i> */}
            <img src="/images/setting_icon.png" className="rightside_icon" alt="" />
            <img src="/images/sitemap_icon.png" className="rightside_icon" alt="" />
          </div>
        </div>
    )
}

export default CourseHead