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
    
    return (     
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          
          <table id="players">
              <tr>
               <th> <button class="button" > player1 </button> </th> 
               <th> <button class="button" > player2 </button ></th> 
               <th> <button class="button" > player3 </button> </th> 
               <th> <button class="button" > player4 </button> </th>   
              </tr>
          </table> 
    
          
           <div class="winlose">
              Wygrana
           </div>
           <div class="statistics">
              Statystyki: 
           </div>
           <div class="statistics">
              Twój czas:
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
  }
export default StatsBoard