import Modal from "./medium/modal";

// class App extends React.Component {
//     constructor(props) {
//       super(props);
  
//       this.state = {
//         modal: false,
//         name: "",
//         modalInputName: ""
//       };
//     }
const DisplayModal = () => {  
    handleChange(e) {
      const target = e.target;
      const name = target.name;
      const value = target.value;
  
      this.setState({
        [name]: value
      });
    }
  
    handleSubmit(e) {
      this.setState({ name: this.state.modalInputName });
      this.modalClose();
    }
  
    modalOpen() {
      this.setState({ modal: true });
    }
  
    modalClose() {
      this.setState({
        modalInputName: "",
        modal: false
      });
    }
  
    render() {
      return (
        <div className="App">
          <h1>Hello!! {this.state.name}</h1>
          <a href="javascript:;" onClick={e => this.modalOpen(e)}>
            Open Modal
          </a>
          <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
            <h2>Hello Modal</h2>
            <div className="form-group">
              <label>Enter Name:</label>
              <input
                type="text"
                value={this.state.modalInputName}
                name="modalInputName"
                onChange={e => this.handleChange(e)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button onClick={e => this.handleSubmit(e)} type="button">
                Save
              </button>
            </div>
          </Modal>
        </div>
      );
    }
  }
export default DisplayModal