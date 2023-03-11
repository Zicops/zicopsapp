import { atom } from "recoil"
export const courseMaster = atom({
    key: "courseMaster",
    default: {
        courseName :'',
        category :'',
        subCategory :'',
        beginnerLevel:false,
        competentLeavel:false,
        proficientLevel:false,
        ownerName:'',
        provisionerName :'',
        language:[],
        totalLearners:0
    }
});

export const details=atom({
    key:"details",
    default:{
        courseSubcategory:'',
        subCategories:[],
        courseSummary:'',
        courseReview:null,
        courseDisplayImg:null,
        courseTitleImg:null
    }
})
  