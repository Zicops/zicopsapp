import QuizLoop from '../small/QuizLoop';
import QuizAdded from '../small/QuizAdded';
import IconButton from '../small/IconButton'
import styles from '../../styles/CourseMaster.module.css';

const Resources = () => {
    return (
        <>
            <QuizAdded index="Doc 1" text="How to read this topic?" type="FDF"/>
            <QuizAdded index="Doc 2" text="Help Chart Cheetsheet" type="Excel"/>
            <div className={styles.row}>
                
                <IconButton styleClass="black" text="Add Resources"/>
            </div>
            
            <div  Name={styles.center_row}>
                <select >
                    <option>Select Resources Type</option>
                </select>
            </div>
            
            <div className={styles.row} style={{
                'justifyContent': 'center',
                marginTop: '10px',
                padding: '0px',
            }}>

                    <input type="text" autoComplete="name" id="name" placeholder="Enter document name" required />

                    <div className={styles.upload_btn_wrapper}>
                        <button className={styles.btn}>
                            <span className={styles.input_icon}>
                                <span>
                                    <img src="/images/upload.png" alt="" />
                                </span>
                            </span>
                            Browse & upload
                        </button>
                        <input type="file" name="myfile" />
                    </div>
                
            </div>
            <div className={styles.row} style={{
                'justifyContent': 'center',
                marginTop: '10px',
                padding: '0px',
            }}>
                
                <button type="button" value="add" style={{
                    padding: '10px 20px',
                    borderRadius: '30px',
                    backgroundColor: 'transparent',
                    border: 'solid 3px #868f8f',
                    color: '#868f8f',
                    margin: '10px',
                    cursor: 'pointer',
                }}>Cancel</button>
                <button type="button" value="cancel" style={{
                    padding: '10px 20px',
                    borderRadius: '30px',
                    backgroundColor: 'transparent',
                    border: 'solid 1px #868f8f',
                    color: '#868f8f',
                    margin: '10px',
                    cursor: 'pointer',
                }}>Add</button>
            </div>
            
        </>
    )
}
            
export default Resources