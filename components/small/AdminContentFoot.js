import { useEffect, useContext } from "react";
import { courseContext } from '../../state/contexts/CourseContext'
import { useMutation } from '@apollo/client';
import {ADD_COURSE, UPLOAD_COURSE_IMAGE, UPLOAD_COURSE_TILE_IMAGE, UPLOAD_COURSE_PREVIEW, UPDATE_COURSE} from '../../API/Mutations'

const Admin_content_foot = () => {
    const { fullCourse, setTab, updateCourseMaster, courseVideo, setCourseVideo, courseImage, setCourseImage, courseTileImage, setCourseTileImage } = useContext(courseContext);
    const [createCourse ] = useMutation(ADD_COURSE)
    const [uploadImage] = useMutation(UPLOAD_COURSE_IMAGE);
    const [uploadTileImage] = useMutation(UPLOAD_COURSE_TILE_IMAGE);
    const [uploadPreview] = useMutation(UPLOAD_COURSE_PREVIEW);
    const [updateCourse] = useMutation(UPDATE_COURSE)


    useEffect(()=>{
        console.log(fullCourse)
    }, [fullCourse])


    const saveCourse = async () => {
        if(fullCourse.id == ''){
            // add course
            console.log('Creating new course...')
            if(fullCourse.name !== '' && fullCourse.category !== '' && fullCourse.subcategory !== '' && fullCourse.owner !== ''){
                const { id, created_at, updated_at,  ...sendData } = fullCourse;
                // console.log(sendData);

                const d = await createCourse({
                    variables: {
                        ...sendData,
                        status: 'SAVED'
                    }
                })
                
                if (typeof d !== 'undefined' && d.data.addCourse.id.length > 0) {

                    window.localStorage.setItem('addedCourseId', d.data.addCourse.id);
                    // JSON.parse(window.localStorage.getItem('addedCourseId'));
                    
                    // console.log('Recieved Added Course data...');
                    // console.log(d.data.addCourse);
                    await updateCourseMaster(d.data.addCourse);
                    // console.log('Local Data Updated...');

                    await setCourseVideo({
                        ...courseVideo,
                        courseId: d.data.addCourse.id
                    });
                    await setCourseImage({
                        ...courseImage,
                        courseId: d.data.addCourse.id
                    });
                    await setCourseTileImage({
                        ...courseTileImage,
                        courseId: d.data.addCourse.id
                    });

                    // go to next tab
                    setTimeout( ()=>{
                        setTab('tab2');
                    }, 50)

                }

            } else {
                setTab('tab1')
                alert ('Please fill master details before saving!')
            }
        } else {
            //update course
            console.log('updating...')
            console.log(courseVideo);
            console.log(courseImage);
            console.log(courseTileImage);

            // if(courseVideo.upload || courseImage.upload || courseTileImage.upload) {
            //     function uploadFiles(){

            //     }
            // }
            if (courseVideo.file && courseVideo.upload){
                await previewVideoUpload();
            }
            if (courseImage.file && courseImage.upload){
                await courseImageUpload();
            }
            if (courseTileImage.file && courseTileImage.upload){
                await courseTileImageUpload();
            }
            console.log('checking fullCourse...')
            // updateCourseBySave()
            
        }

        async function courseTileImageUpload() {
            const cTile = await uploadTileImage({
                variables: courseTileImage
            });
            if (cTile.data.uploadCourseTileImage.success) {
                await updateCourseMaster({
                    ...fullCourse,
                    tileImage: cTile.data.uploadCourseTileImage.url,
                });
                await setCourseTileImage({
                    ...courseTileImage,
                    upload: 0,
                });
            } else {
                console.log('Tile Image Upload Failed');
                console.log(cTile);
            }
        }

        async function courseImageUpload() {
            const cImage = await uploadImage({
                variables: courseImage
            });
            if (cImage.data.uploadCourseImage.success) {
                await updateCourseMaster({
                    ...fullCourse,
                    image: cImage.data.uploadCourseImage.url,
                });
                await setCourseImage({
                    ...courseImage,
                    upload: 0,
                });
            } else {
                console.log('Image Upload Failed');
                console.log(cImage);
            }
        }

        async function previewVideoUpload() {
            const cVideo = await uploadPreview({
                variables: courseVideo
            });
            if (cVideo.data.uploadCoursePreviewVideo.success) {
                await updateCourseMaster({
                    ...fullCourse,
                    previewVideo: cVideo.data.uploadCoursePreviewVideo.url,
                });
                await setCourseVideo({
                    ...courseVideo,
                    upload: 0,
                });
            } else {
                console.log('Tile Image Upload Failed');
                console.log(cVideo);
            }
        }

        async function updateCourseBySave() {
            // console.log(recentFullCourse);
            // const { related_skills, expected_completion, ...updateData } = fullCourse;
            // let data = {
            // ...fullCourse
            // }
            // updateCourse({
            //     variables: data
            // }).then( (d)=>{
            //     alert("Course Updated")
            //     console.log("Course updated")
            //     console.log(d)
            // })
            // const cData = await updateCourse({
            //     variables: data
            // });
            // console.log(cData);
            // if (cVideo.data.uploadCoursePreviewVideo.success) {
            //     await updateCourseMaster({
            //         ...fullCourse,
            //         previewVideo: cVideo.data.uploadCoursePreviewVideo.url,
            //     });
            //     await setCourseVideo({
            //         ...courseVideo,
            //         upload: 0,
            //     });
            // } else {
            //     console.log('Tile Image Upload Failed');
            //     console.log(cVideo);
            // }
        }
    }


    return (
        <div className="content-panel">
            <div className="left-text">
                <h3>Status: {fullCourse.status}</h3>
            </div>
            <div className="right-text">
                <button>Cancel</button>
                <button type="submit" onClick={saveCourse}>Save</button>
            </div>
            <style jsx>{`
            .content-panel {
                margin: -75px 10px 10px 10px;
                color: var(--white);
                height: 65px;
                // box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
                background-color: #000000;
                border-radius: 0 0 10px 10px;

                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .left-text{
                margin-left: 50px;
                font-size: 14px;
            }
            .right-text{
                margin-right: 50px;
            }
            button{
                padding: 10px 20px;
                background-color: transparent;
                color: #858f8f;
                border-radius: 50px;
                min-width: 155px;
                margin:5px;
                font-family: 'Open Sans';
                font-size: 13px;
                font-weight: 800;
                cursor: pointer;
            }
            button:hover{
                box-shadow: 0 0 10px 0 #959595;
            }
            `}</style>
        </div>
    )
}

export default Admin_content_foot