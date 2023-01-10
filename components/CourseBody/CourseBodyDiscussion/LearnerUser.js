import style from './discussion.module.scss';
const LearnerUser = ({data}) => {
  return (
    <div className={`${style.learnerUserContainer}`}>
      <p>Learners</p>
      <div className={`${style.learner_search_input}`}>
        <input type="text" placeholder="Search" onChange={() => {}} />
        <div className={`${style.learner_search_images}`}>
          <img src="/images/search3.png" alt="" />
        </div>
          </div>
          {data?.map((item) => (
              <SingleLearner
                image={item?.user?.photo_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2NcXil-zvsEbK0YBf9F8FuMzquqIGHTAbRedKI8s&s"}
                userName={item?.user?.first_name}
                role={item?.user?.role}
              />
          ))}
    </div>
  );
};

export default LearnerUser;

const SingleLearner = ({ image, userName, role }) => {
  return (
    <div className={`${style.learner_user_details}`}>
      <div className={`${style.user_image}`}>
        <img src={image} alt="" />
      </div>
      <div className={`${style.user_name_role}`}>
        <p>{userName}</p>
        <p className={`${style.user_role}`}>{role}</p>
      </div>
    </div>
  );
};
