import BlackRow from '@/components/common/BlackRow';
import BlackBox from '@/components/common/BlackBox';
import IconButton from '@/components/common/IconButton';
// import styles from "../adminCourse.module.scss"
const ModuleBox = () => {
    return (
        <div>
            <BlackBox>
                <BlackRow
                    title={`Session 1`}
                    type="large"
                // editHandler={() => activateEditModule(mod.id)}
                // isDisabled={isDisabled}
                // deleteProps={{
                //   id: mod?.id,
                //   resKey: 'deleteCourseModule',
                //   mutation: DELETE_COURSE_MODULE,
                //   deleteCondition: () => {
                //     if (!!filteredAndSortedData?.length) {
                //       setToastMsg({
                //         type: 'danger',
                //         message: `Delete Module\'s ${isChapterPresent ? 'Chapters' : 'Topics'} First`
                //       });
                //       return false;
                //     }

                //     return true;
                //   },
                //   onDelete: async () => {
                //     const _mod = moduleData?.filter((m) => m?.id !== mod?.id);
                //     await updateSequence(_mod, updateCourseModule);
                //     refetchDataAndUpdateRecoil('module');
                //   }
                // }}
                />
                <IconButton
                    text="Add Topic"
                    //   isDisabled={isDisabled}
                    styleClass="btnBlack"
                //   handleClick={handleModuleClick}

                />
            </BlackBox>
        </div>
    )
};
export default ModuleBox;