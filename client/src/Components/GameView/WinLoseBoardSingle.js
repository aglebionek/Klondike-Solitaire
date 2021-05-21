import React, { Component } from "react";
import './WinLose.css';

class StatsBoard extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  render() {
    return (
      <main>      
        <Modal show={this.state.show} handleClose={this.hideModal}>
        </Modal>       
      </main>
    );
  }
}
const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const result = "Wygrana"
    const score ="546"
    const time = "14:32"
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}                   
           <div class="winlose">
              {result}
           </div>
           <div class="statistics">
              Statystyki: {score}
           </div>
           <div class="statistics">
              Twój czas: {time}
           </div>
           
           <table id="options">
             <tr>
              <th>
           <button class="button" onClick={handleClose}>
            Zamknij
           </button>
           </th>
           <th> 
            <button class="button"> 
            Analiza rozgrywki
             </button >
             </th> 
           </tr>
           </table>
          
        </section>
      </div>
    );
  };

export default StatsBoard