import useCohortUserData from "./useCohortUserData";

export default function assignCourseToUser(){

    const { getCohortUser } = useCohortUserData();

    async function assignCourseToOldUser(cohort_id=null){
 
        if(!cohort_id) return;
        const cohortUsers = await getCohortUser(cohort_id);
        console.log(cohortUsers);
        return cohortUsers;    }

    return { assignCourseToOldUser }
}