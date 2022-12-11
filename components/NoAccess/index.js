import MainBodyBox from "../common/MainBodyBox";

const NoAccess = () => {
    return (
      <MainBodyBox>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '65vh', textAlign: 'center', color: 'var(--dark_three)' }}>
                <h2>You are on the basic version of Zicops <br />
                or you don't have sufficient permission to access this content.</h2>
        </div>
      </MainBodyBox>
    );
}
 
export default NoAccess;