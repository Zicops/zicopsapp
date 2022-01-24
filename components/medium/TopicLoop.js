import TopicLoopHead from "../small/TopicLoopHead"
import TopicLoopBody from "../small/TopicLoopBody"
import IconText from "../small/IconText"
import TopicImage from "../small/TopicImage"
import TopicText from "../small/TopicText"
import TopicPlayer from "../small/TopicPlayer"
import ChapterHead from "../small/ChapterHead"
import ChapterBody from "../small/ChapterBody"

const TopicLoop = () =>{
    return(
        <>
        <ChapterHead>
            <ChapterBody chapt_sr_no="1" chapt_heading="Introduction" chapt_desc="Introduction to design thinking. In this chapter, we will inroduce you to stepwise thought process to design thinking."/>
        </ChapterHead>
        <TopicLoopHead>
         <IconText image ="/Images/heart.png" text="Sonali"/>
         <IconText image ="/Images/plus.png" text="Monali"/>
        </TopicLoopHead>
        <TopicLoopBody>
            <TopicImage topic_image="/Images/topicImage.png"/>
            <TopicText heading="Minim veniam" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas interdum leo vehicula vulputate. Vivamus venenatis, justo ut luctus laoreet, ex lacus semper libero, eget suscipit purus lacus a augue." />
            <TopicPlayer player_img="/Images/progressTriangle.png" v_d="video + Quiz" duration="1 hour"/>
        </TopicLoopBody>


        </>
    )
}
export default TopicLoop