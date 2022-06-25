import McqCheckBox from '../McqCheckBox';
import styles from './mcqOption.module.scss';

const McqOption = ({ optionData, checked, index }) => {

    const count = ['a', 'b', 'c', 'd'];

    return (
        <>
            <div className={`${styles.options}`}>
                {count[index]?.toUpperCase()}
                <div className={`${styles.option}`}>
                    {
                        optionData?.attachment && (
                            <div>
                                {
                                    optionData.attachmentType.includes('image') &&
                                    <img
                                        src={optionData.attachment}
                                        alt="image"
                                        // width="150px" height="90px"
                                    />
                                }
                                {
                                    optionData.attachmentType.includes('video') &&
                                    <video
                                        controls
                                        src={optionData.attachment}
                                        alt="video"
                                        width="150px" height="90px"
                                    />
                                }
                                {
                                    optionData.attachmentType.includes('audio') &&
                                    <audio
                                        controls
                                        src={optionData.attachment}
                                        alt="audio"
                                        style={{width: '170px'}}
                                    />
                                }
                            </div>
                        )
                    }
                    <p>{optionData?.description}</p>
                </div>
                <McqCheckBox checked={checked === optionData.id} />
            </div>
        </>
    );
};

export default McqOption;