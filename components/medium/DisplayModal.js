import Popup from 'reactjs-popup';
import AddChapter from "./AddChapter";

const DisplayModal = () => {
  let CloseEvent = ()=>{
    alert('Hi');
    // return(
      
    // )
  }
  return (
    <Popup trigger={<button> Click to open popup </button>}
      position="center center">
      <div>
        <AddChapter/>
      </div>
      <button>Click here</button>
    </Popup>
  );
}
export default DisplayModal