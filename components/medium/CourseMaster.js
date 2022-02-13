import { gql } from "@apollo/client";
import client from "../../apollo-client";
import styles from '../../styles/CourseMaster.module.css'

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });
    return {
      props: {
        countries: data.countries.slice(0, 4),
      },
  };
}

const CourseMaster = ({countries}) => { 
  console.log(countries);
    return (
        <div className={styles.course_master}>
          {/* CourseMaster */}
          <div className={styles.row}>


          {/* {countries.map((country) => (
            <div key={country.code} className="card">
              <h3>{country.name}</h3>
              <p>
                {country.code} - {country.emoji}
              </p>
            </div>
          ))} */}


            <label htmlFor="name" className={styles.col_25}>Name</label>
            <input type="text" autoComplete="name" id="name" placeholder="Enter name of the course (Upto 160 characters)" className={styles.col_75} required />
          </div>
          <div className={styles.row}>
            <label htmlFor="name1" className={styles.col_25}>Course Category</label>
              <select className={styles.col_75} placeholder="Select the category of the course">
                <option>Select the category of the course</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
          </div>
          <div className={styles.row}>
            <label htmlFor="name1" className={styles.col_25}>Select Base Sub-category</label>
              <select className={styles.col_75} placeholder="Select the category of the course">
                <option>Select the base sub-category of the course</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
          </div>
          <div className={styles.row}>
            <label htmlFor="name1" className={styles.col_25}>Course Owner</label>
              <select className={styles.col_75} placeholder="Select the category of the course">
                <option>Select the owner of the course</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
          </div>


          <div className={styles.row}>
            <div className={styles.col_25}></div>
              <div className={styles.col_25}>
                <div className={styles.active_button}>
                  <label htmlFor="display_button" className={styles.td_label}>Active</label>
                  <label className={styles.switch}>
                    <input className={styles.switch_input} type="checkbox" />
                    <span className={styles.switch_label} data-on="On" data-off="Off"></span>
                    <span className={styles.switch_handle}></span>
                  </label>
                </div>
              </div>

              <div className={styles.col_25}>
                <div className={styles.active_button}>
                  <label htmlFor="display_button" className={styles.td_label}>Display</label>
                  <label className={styles.switch}>
                    <input className={styles.switch_input} type="checkbox" />
                    <span className={styles.switch_label} data-on="On" data-off="Off"></span>
                    <span className={styles.switch_handle}></span>
                  </label>
                </div>
              </div>
            <div className={styles.col_25}></div>
          </div>


        </div>
    )
}

export default CourseMaster