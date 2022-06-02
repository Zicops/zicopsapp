import McqCheckBox from '../McqCheckBox';
import styles from './mcqOption.module.scss';

const McqOption = ({ optionData, checked }) => {

    return (
        <>
            <div className={`${styles.options}`}>
                {optionData.id.toUpperCase()}
                <div className={`${styles.option}`}>
                    {
                        optionData?.image && (
                            <div>
                                <img
                                    src={`${optionData.image}`}
                                    alt="refresh"
                                />
                            </div>
                        )
                    }
                    <p>{optionData.text}</p>
                </div>
                <McqCheckBox checked={checked === optionData.id} />
            </div>
        </>
    );
};

export default McqOption;