import { GET_LATEST_COURSES } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import {
  COMMON_LSPS,
  COURSE_MAP_STATUS,
  COURSE_SELF_ASSIGN_LIMIT,
  COURSE_STATUS,
  COURSE_TYPES,
  LEARNING_FOLDER_CAPACITY
} from '@/helper/constants.helper';
import { getUserAssignCourses } from '@/helper/data.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Popup from 'reactjs-popup';
import { useRecoilState, useRecoilValue } from 'recoil';
import LabeledInput from '../common/FormComponents/LabeledInput';
import AssignCourse from '../CourseComps/AssignCourse';
import Card from './Card/Card';
import styles from './favouriteDndCourses.module.scss';
import Folder from './Folder/Folder';
import ListCard from './ListCard';

export default function FavouriteDndCourses({ isLoading }) {
  const ASSIGNED_ROLE = ['cohort', 'admin'];

  const { getUserCourseData } = useUserCourseData();

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const userData = useRecoilValue(UserStateAtom);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);

  const [isAssignPopUpOpen, setIsAssignPopUpOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [data, setData] = useState([]);
  const [dropped, setDropped] = useState([]);
  const [droppedByMe, setDroppedByMe] = useState([]);
  const [droppedByAdmin, setDroppedByAdmin] = useState([]);
  const [isShowAll, setIsShowAll] = useState(false);
  const [isCoursePresent, setIsCoursePresent] = useState({
    selfAdded: false,
    adminAdded: false
  });
  const [isShowAllAdmin, setIsShowAllAdmin] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [dragId, setDragId] = useState('');
  const [hover, setHover] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (!userData?.id) return;

    isLoading(true);
    await loadCourses();
    isLoading(false);
  }, [userData?.id]);

  useEffect(() => {
    if (!isUpdated) return;
    loadCourses();
    setIsUpdated(false);
  }, [isUpdated]);

  //loads user assigned courses

  async function loadCourses() {
    const userLspId = sessionStorage.getItem('user_lsp_id');
    // const _lspId = sessionStorage?.getItem('lsp_id');
    const _lspId = COMMON_LSPS.zicops;
    setLoading(true);
    const queryVariables = {
      publish_time: getUnixFromDate(),
      pageSize: 9999999,
      pageCursor: '',
      status: COURSE_STATUS.publish,
      filters: { LspId: _lspId, Type: COURSE_TYPES[0] }
    };
    let isError = false;
    const courseRes = await loadQueryDataAsync(GET_LATEST_COURSES, queryVariables).catch((err) => {
      isError = !!err;
      console.log(err);
    });
    if (isError) {
      setLoading(false);
      return setToastMsg({ type: 'danger', message: 'course load error' });
    }

    const filters = { type: COURSE_TYPES[0] };
    const userCourseData = await getUserAssignCourses(filters);

    // const userCourseData = await getUserCourseData(100);
    // const mapRes = await loadQueryDataAsync(
    //   GET_USER_COURSE_MAPS,
    //   {
    //     ...queryVariables,
    //     user_id: userData?.id
    //   },
    //   {},
    //   userQueryClient
    // ).catch((err) => {
    //   if (err?.message?.includes('no user course found')) return;
    //   if (err) setToastMsg({ type: 'danger', message: 'Course Map Load Error' });
    // });

    // const _userCourses = mapRes?.getUserCourseMaps?.user_courses || [];
    let userCourses = [];
    // // if (_userCourses?.length)
    // //   userCourses = _userCourses?.filter(
    // //     (course) =>
    // //       course?.course_status?.toLowerCase() !== 'disabled' && course?.user_lsp_id === userLspId
    // //   );

    let totalSelfCourseCount = 0;
    if (userCourseData?.length) {
      userCourseData?.forEach((course) => {
        course.created_at = course.created_at?.replaceAll('/', '-');

        if (course?.course_status?.toLowerCase() !== COURSE_MAP_STATUS?.disable) {
          userCourses?.push(course);
          if (course?.added_by?.role?.toLowerCase() === 'self') ++totalSelfCourseCount;
        }
      });
    }

    setUserOrgData((prevValue) => ({ ...prevValue, self_course_count: totalSelfCourseCount }));
    const userCourseMaps = userCourses || [];
    const assignedCourses = [];
    const availableCourses =
      courseRes?.latestCourses?.courses?.filter((c) => {
        return (
          // c?.type === COURSE_TYPES[0] &&
          c?.is_active &&
          c?.is_display &&
          !userCourseMaps?.find((map) => {
            let added_by = {};
            if (map?.added_by) added_by = map?.added_by;
            const isAssigned = map?.course_id === c?.id;
            // if (isAssigned)
            //   assignedCourses.push({
            //     ...c,
            //     added_by,
            //     expected_completion: moment.unix(map?.end_date).format('DD/MM/YYYY')
            //   });
            return isAssigned;
          })
        );
      }) || [];
    updateCourseData(availableCourses);

    setDropped(userCourses, setLoading(false));
  }

  useEffect(() => {
    if (!isShowAll) setIsShowAll(!!searchQuery);
    if (!isShowAllAdmin) setIsShowAllAdmin(!!searchQuery);
  }, [searchQuery]);

  function updateCourseData(courses) {
    setData(courses?.sort((c1, c2) => +c1?.created_at - +c2?.created_at));
  }

  const onMouseEnterHandler = () => {
    setHover(true);
  };
  const onMouseLeaveHandler = () => {
    setHover(false);
  };

  const handleDragStart = (result) => {
    setDragId(result.draggableId);
    setIsDrag(true);
  };

  const handleDragEnd = (result) => {
    if (userOrgData?.self_course_count >= COURSE_SELF_ASSIGN_LIMIT) {
      setIsDrag(false);
      return setToastMsg({
        type: 'info',
        message: 'You have reached your self course assign limit!'
      });
    }
    if (result.destination && result.destination.droppableId === 'character') {
      const element = data.filter((e) => e.id === result.draggableId);
      // dropped.push(element);
      setSelectedCourse(element[0]);
      setIsAssignPopUpOpen(true);
      // setDropped([...dropped, { ...element[0], added_by: { role: 'self' } }]);
      updateCourseData(data.filter((each) => each.id !== result.draggableId));
      // setTotal(total + 1);
    }
    setIsDrag(false);
  };

  // remove drop animation, can also be customized
  function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating && !snapshot.isDragging) {
      return { ...style, transform: null };
    }

    if (!snapshot.dropAnimation) return style;

    const { moveTo, curve, duration } = snapshot.dropAnimation;
    const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
    const rotate = 'rotate(0.5turn)';

    // patching the existing style
    // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/drop-animation.md#:~:text=If%20you%20do%20have%20use,value%20such%20as%200.001s%20
    return {
      ...style,
      transform: `${translate} ${rotate}`,
      // slowing down the drop because we can
      transition: `all ${curve} ${0.000001}s`
    };
  }

  useEffect(() => {
    console.log(dropped, 'isbfi');
    const myAssignedCourses = dropped?.filter((course) => course?.added_by == 'self');
    const adminAssignedCourses = dropped?.filter((course) =>
      ASSIGNED_ROLE.includes(course?.added_by?.toLowerCase())
    );
    setDroppedByMe(myAssignedCourses);
    setDroppedByAdmin(adminAssignedCourses);
  }, [dropped]);

  return (
    <>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Box
          bgcolor={'#101216'}
          mt={0}
          height={'75vh'}
          width={'100%'}
          color={'#FFF'}
          sx={{ overflowY: 'hidden' }}>
          <Grid container spacing={2}>
            <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
              <Box
                height={'100%'}
                fontWeight={600}
                p={4}
                width={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                textAlign={'center'}>
                <Box
                  fontSize={'22px'}
                  mb={0.5}
                  sx={{
                    transform: !isDrag ? 'translate(0, 160px)' : 'translate(0, 0)',
                    transition: 'transform 0.2s',
                    marginBottom: '-28px'
                  }}>
                  Drop the favourite course in folder
                </Box>
                <Box
                  fontSize={'22px'}
                  mb={0.5}
                  sx={{
                    // transform: !isDrag ? 'translate(0, 0)' :
                    opacity: isDrag ? '0' : '1'
                    // transition: 'display 0.1s'
                  }}>
                  Drag your favourite course in folder
                </Box>
                <Box px={12} fontSize={'13px'} color={'rgba(255,255,255,0.5)'} mb={5}>
                  Drag and drop to add self paced courses to your learning folder.
                </Box>
                <Droppable droppableId="character">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      onMouseEnter={onMouseEnterHandler}
                      onMouseLeave={onMouseLeaveHandler}>
                      <Folder
                        total={dropped?.length}
                        isDrag={isDrag}
                        handleClick={() => setIsPopupOpen(true)}
                      />
                    </div>
                  )}
                </Droppable>
              </Box>
            </Grid>
            <Grid item xl={7} lg={7} md={7} sm={7} xs={12} sx={{ background: '#000' }}>
              <Droppable droppableId="drop" isDropDisabled={true}>
                {(provider) => (
                  <div {...provider.droppableProps} ref={provider.innerRef}>
                    <Box width={'100%'} height={'75vh'} py={2} pr={2}>
                      <Grid container spacing={2}>
                        {data.slice(0, 9).map((each, index) => (
                          <Draggable key={each.id} draggableId={each.id} index={index}>
                            {(provided, snapshot) => {
                              return (
                                <>
                                  {snapshot.isDragging ? (
                                    <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                                      <Box
                                        width={'100%'}
                                        height={'100%'}
                                        minHeight={'22vh'}
                                        border={'2px dashed #6ECDCD'}
                                        sx={{ borderRadius: '5px' }}
                                        overflow={'hidden'}
                                      />
                                    </Grid>
                                  ) : (
                                    ''
                                  )}
                                  <Grid
                                    item
                                    xl={4}
                                    lg={4}
                                    md={4}
                                    sm={4}
                                    xs={12}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getStyle(provided.draggableProps.style, snapshot)}
                                    ref={provided.innerRef}>
                                    <Card
                                      img={each?.tileImage}
                                      title={each.category}
                                      tag={each.type}
                                      topic={each.name}
                                      hover={hover}
                                      isDrag={isDrag}
                                      dragId={dragId}
                                      id={each.id}
                                      rotate={
                                        isDrag && !hover && dragId === each.id
                                          ? 'rotate(-7.73deg)'
                                          : ''
                                      }
                                      scale={
                                        isDrag && hover && dragId === each.id ? 'scale(0.5)' : ''
                                      }
                                      boxShadow={
                                        isDrag && dragId === each.id
                                          ? '0px 0px 36px 16px rgba(110, 205, 205, 0.2)'
                                          : ''
                                      }
                                    />
                                  </Grid>
                                </>
                              );
                            }}
                          </Draggable>
                        ))}
                      </Grid>
                    </Box>
                    <div style={{ maxHeight: '0px' }}>{provider.placeholder}</div>
                  </div>
                )}
              </Droppable>
            </Grid>
          </Grid>
        </Box>
      </DragDropContext>

      {/* view courses */}
      {isPopupOpen && (
        <Popup
          open={true}
          closeOnDocumentClick={false}
          closeOnEscape={false}
          overlayStyle={{ background: 'rgba(0,0,0, 0.5)' }}>
          <div className={styles.coursePopUp}>
            {/* cross btn */}
            <div onClick={() => setIsPopupOpen(false)} className={`${styles.close}`}>
              <img src="/images/svg/clear.svg" alt="" />
            </div>

            {/* search box */}
            <div className={styles.searchBox}>
              <img src="/images/magnifier.png" height={20} alt="" />

              <LabeledInput
                inputOptions={{
                  inputName: 'courseFilter',
                  placeholder: 'Search Courses',
                  value: searchQuery
                }}
                changeHandler={(e) => setSearchQuery(e.target.value?.toLowerCase())}
              />
            </div>

            <div className={styles.courseList}>
              <h4>
                <span>
                  Assigned By Me ({droppedByMe?.length} / {LEARNING_FOLDER_CAPACITY})
                </span>
                <span className={styles.seeMore} onClick={() => setIsShowAll(!isShowAll)}>
                  {droppedByMe?.length > 2 && <>See {isShowAll ? 'Less' : 'More'}</>}
                </span>
              </h4>

              <div className={styles.cardContainer}>
                {/* {!isCoursePresent?.selfAdded && (
                  <div className={styles.notFound}>No Courses Added</div>
                )} */}
                {loading ? (
                  <strong className={`${styles.notFound}`}>Loading Courses...</strong>
                ) : // <Loader customStyles={{ backgroundColor: 'transparent', height: '100%' }} />
                !droppedByMe?.length ? (
                  <strong className={`${styles.notFound}`}>No Courses Added</strong>
                ) : (
                  <>
                    {droppedByMe?.slice(0, isShowAll ? dropped?.length : 2)?.map((course) => {
                      if (course?.added_by !== 'self') return;
                      if (searchQuery && !course?.name?.toLowerCase()?.includes(searchQuery))
                        return;

                      if (!isCoursePresent?.selfAdded)
                        setIsCoursePresent({ ...isCoursePresent, selfAdded: true });
                      return <ListCard courseData={course} footerType={'added'} />;
                    })}
                  </>
                )}
              </div>

              <h4>
                <span>Assigned By Admin ({droppedByAdmin?.length})</span>
                <span className={styles.seeMore} onClick={() => setIsShowAllAdmin(!isShowAllAdmin)}>
                  {droppedByAdmin?.length > 2 && <>See {isShowAllAdmin ? 'Less' : 'More'}</>}
                </span>
              </h4>

              <div className={styles.cardContainer}>
                {loading ? (
                  <strong className={`${styles.notFound}`}>Loading Courses...</strong>
                ) : // <Loader customStyles={{ backgroundColor: 'transparent', height: '100%' }} />
                !droppedByAdmin?.length ? (
                  <strong className={`${styles.notFound}`}>No Courses Added by Admin</strong>
                ) : (
                  <>
                    {droppedByAdmin
                      ?.slice(0, isShowAllAdmin ? dropped?.length : 2)
                      ?.map((course) => {
                        // if (course?.added_by?.role !== 'admin') return;
                        if (searchQuery && !course?.name?.toLowerCase()?.includes(searchQuery))
                          return;

                        if (!isCoursePresent?.adminAdded)
                          setIsCoursePresent({ ...isCoursePresent, adminAdded: true });
                        return <ListCard courseData={course} footerType={'assigned'} />;
                      })}
                  </>
                )}
              </div>
            </div>
          </div>
        </Popup>
      )}

      <AssignCourse
        isAssignPopUpOpen={isAssignPopUpOpen}
        setIsAssignPopUpOpen={setIsAssignPopUpOpen}
        courseId={selectedCourse?.id}
        courseType={selectedCourse?.type}
        courseName={selectedCourse?.name}
        suggestedCompletionDays={selectedCourse?.expected_completion}
        lspId={selectedCourse?.lspId}
        popUpProps={{
          onClose: () => {
            if (selectedCourse) updateCourseData([...data, selectedCourse]);
          }
        }}
        onCourseAssign={() => {
          setDropped([...dropped, { ...selectedCourse, added_by: 'self' }]);
          setSelectedCourse(null);
        }}
      />
    </>
  );
}
