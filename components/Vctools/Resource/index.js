import styles from "../vctoolMain.module.scss"
import CreateResource from "./CreateResource";
import ResourcesQA from "./ResourcesQA";
const ResourcePage = ({ hide = false }) => {
    return (
        <div className={`${styles.resourceBar}`}>
            <div className={`${styles.resourceHead}`}>
                <div>Resources</div>
                <button onClick={() => {
                    hide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.resourceScreen}`}>
                {/* <CreateResource /> */}
                <ResourcesQA/>
            </div>

        </div>
    )
};
export default ResourcePage;