import Image from 'next/image'
import CommonCalendar from '../../archives/CommonCalendar';
import CalenderLarge from '../small/Calender'
const SelfPacedMiddle = () => {
    return (
        <>
            <div>
                <div class="mandatory_courses">
                    <div class="row_middle">
                        <div class="col_60 border_right mandatory_courses-scroll">
                            <div class="mandatory_courses_heading">
                                Mandatory Courses
                                {/* <Image src='/images/mandatory_courses.png' alt='mandatory courses'
                                width={'500px'}
                                height={'70px'}
                                /> */}
                            </div>
                            <div class="mandatory_courses_table">
                                <div class="scroll_head">
                                    <div class="head_row">
                                        <div class="col_25">Course Name</div>
                                        <div class="col_25">End Date</div>
                                        <div class="col_25">Sub Category</div>
                                        <div class="col_25">Completion</div>
                                    </div>
                                </div>
                                <div class="scroll_body">
                                    <div class="scroll_row">
                                        <div class="col_25" id="">Leom Ipsum Dolor</div>
                                        <div class="col_25" id="">21-3-2022</div>
                                        <div class="col_25" id="">Java</div>
                                        <div class="col_25" id="">54%</div>
                                    </div>
                                    <div class="scroll_row">
                                        <div class="col_25" id="">Consectetur_adipiscing</div>
                                        <div class="col_25" id="">21-3-2022</div>
                                        <div class="col_25" id="">DevOps</div>
                                        <div class="col_25" id="">27%</div>
                                    </div>
                                    <div class="scroll_row">
                                        <div class="col_25" id="">Sed_do_eiusmodr</div>
                                        <div class="col_25" id="">21-3-2022</div>
                                        <div class="col_25" id="">Communication</div>
                                        <div class="col_25" id="">00%</div>
                                    </div>
                                    <div class="scroll_row">
                                        <div class="col_25" id="">Tempor_incididunt</div>
                                        <div class="col_25" id="">21-3-2022</div>
                                        <div class="col_25" id="">Programming</div>
                                        <div class="col_25" id="">15%</div>
                                    </div>
                                    <div class="scroll_row">
                                        <div class="col_25" id="">Ut_labore_et_dolore</div>
                                        <div class="col_25" id="">21-3-2022</div>
                                        <div class="col_25" id="">IOT</div>
                                        <div class="col_25" id="">90%</div>
                                    </div>
                                    <div class="scroll_row">
                                        <div class="col_25" id="">Minim_veniam</div>
                                        <div class="col_25" id="">21-3-2022</div>
                                        <div class="col_25" id="">Ettiquettes</div>
                                        <div class="col_25" id="">00%</div>
                                    </div>
                                    <div class="scroll_row">
                                        <div class="col_25" id="">Leom Ipsum Dolor</div>
                                        <div class="col_25" id="">21-3-2022</div>
                                        <div class="col_25" id="">Java</div>
                                        <div class="col_25" id="">54%</div>
                                    </div>
                                    <div class="scroll_row">
                                        <div class="col_25" id="">Consectetur_adipiscing</div>
                                        <div class="col_25" id="">21-3-2022</div>
                                        <div class="col_25" id="">DevOps</div>
                                        <div class="col_25" id="">27%</div>
                                    </div>
                                    <div class="scroll_row">
                                        <div class="col_25" id="">Sed_do_eiusmodr</div>
                                        <div class="col_25" id="">21-3-2022</div>
                                        <div class="col_25" id="">Communication</div>
                                        <div class="col_25" id="">00%</div>
                                    </div>
                                    <div class="scroll_row">
                                        <div class="col_25" id="">Tempor_incididunt</div>
                                        <div class="col_25" id="">21-3-2022</div>
                                        <div class="col_25" id="">Programming</div>
                                        <div class="col_25" id="">15%</div>
                                    </div>
                                    <div class="scroll_row">
                                        <div class="col_25" id="">Ut_labore_et_dolore</div>
                                        <div class="col_25" id="">21-3-2022</div>
                                        <div class="col_25" id="">IOT</div>
                                        <div class="col_25" id="">90%</div>
                                    </div>
                                    <div class="scroll_row">
                                        <div class="col_25" id="">Minim_veniam</div>
                                        <div class="col_25" id="">21-3-2022</div>
                                        <div class="col_25" id="">Ettiquettes</div>
                                        <div class="col_25" id="">00%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col_40 calender_box">
                            {/* <CalenderLarge/> */}
                            <CommonCalendar />
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
            
            `}
            </style>
        </>
    );
}

export default SelfPacedMiddle;