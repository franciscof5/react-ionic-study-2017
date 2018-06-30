import React, { Component, Text, View, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { FormControl,Button,Modal,ModalHeader,ModalTitle,ModalBody,ModalFooter,Popover,Tooltip,OverlayTrigger,mountNode } from 'react-bootstrap';
/*import { FormControl,Button,Popover,Tooltip,OverlayTrigger,mountNode } from 'react-bootstrap';*/
import './App.css';
import Timer from 'react-timer'
import NotificationSystem from 'react-notification-system'

//todo JSSOUND
//import 'react-alertify-js'
import ReactGA from 'react-ga'

//Todo: IF HOSTNAME
ReactGA.initialize('UA-1055959-33');


class Option extends Component {
  render() {
    var config = {
      option_object: this.props.option_object,
    }; 
    const ob1 = require(`./${config.option_object}.svg`)
    const ob = config.option_object
    return (
      <button className="scissors">
        <img src={ob1} className="App-logo" alt="logo" />
        <br />
        {ob}{this.props.option_object.hotk}
        {/* TODO */}
      </button>
    );
  }
}

class TimerProjectimer extends Component {
  render () {
    const OPTIONS = { prefix: 'seconds elapsed!', delay: 100}
    return (
      <div>
        <Timer options={OPTIONS} />
      </div>
    )
  }
}

class ScoreBoard extends Component {
  render() {
    return (
      <p>Stack: 100 | Goal:1000 | Rounds: 0</p>
    )
  }
}

 function BetSystem() {
  //_notificationSystem: null
  //constructor(props) {
  //  super(props);
  //}
  //bet() {    
    //App._addNotification()
    //App._addNotification.bind(this)
    //this._addNotification.bind(this)
    //this._addNotification
    alert("JOKENPO");
    //() => this._addNotification
  //}
  return null
  /*var config = {
    total:1000,
    stack:100,
    betted:0,
    secondsPassed:0
  }*/
  
}
//var BetS = new BetSystem();

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: '#fff',
    padding: 30,
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
    width: 100,
  },
});*/
/*
class BetBoard extends Component {
  //_notificationSystem: null
  //constructor(props) {
  //  super(props);
  //}
  //bet() {    
    //App._addNotification()
    //App._addNotification.bind(this)
    //this._addNotification.bind(this)
    //this._addNotification
    //alert("JOKENPO");
    //() => this._addNotification
  //}

  var config = {
    total:1000,
    stack:100,
    betted:0,
    secondsPassed:0
  }
  render() { 
    return ( 

        
      <View style={styles.container}>
        <NotificationSystem ref="notificationSystem" />
        <Text style={styles.intro}>Hello world!</Text>
        <form>
          <FormControl
            id="formControlsText"
            type="text"
            label="Text"
            placeholder="Enter Bet"
          />
          <Button 
            bsStyle="primary" 
            bsSize="large"
            onClick={BetSystem.bet()}
            >
            BET!
          </Button>
        </form> 
      </View>

    )
  }
}*/

/*class Not extends Component {
  constructor() {
    super();
    this._notificationSystem = null;
    //this._notificationSystem = this._notificationSystem.bind(this);
    //this._notificationSystem = () => this._notificationSystem.bind(this);
  }

  _addNotification(event) {
    event.preventDefault();
    if (this._notificationSystem) {
      this._notificationSystem.addNotification({
        message: 'Notification message',
        level: 'success'
      });
    }
  }
}*/

class App extends Component {
  constructor(props) {
    super(props);
    this._notificationSystem = null;
    this.state = { name: "world" };
    //this._notificationSystem = this._notificationSystem.bind(this);
    //this._notificationSystem = () => this._notificationSystem.bind(this);
  }

  _addNotification(event) {
    event.preventDefault();
    if (this._notificationSystem) {
      this._notificationSystem.addNotification({
        message: 'Notification message',
        level: 'success'
      });
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>JOKENPO BET</h2>
          <ScoreBoard />
          <Option option_object="scissors" hotk="1" />
          <Option option_object="rock" hotk="2" />
          <Option option_object="paper" hotk="3" />
          <BetSystem />
        </div>
        <p className="App-intro">
          <button onClick={(e) => this._addNotification(e)}>{this.state.name}</button>
          <button onClick={this._addNotification.bind(this)}>Add notification</button>
          <NotificationSystem ref={n => this._notificationSystem = n} />
          <TimerProjectimer />
          <br />
          <br />
          To play enter a bet and quickly select the desired option (scissors, rock and paper)
          <br />
          <InstructionsModal />
          <hr />
          Fame Hall
          Shame Hall
          <hr />
          Simple JOKENPO game, developed by <a href="https://www.franciscomat.com">Francisco Mat</a> | Hosted by <a href="https://www.f5sites.com">F5 Sites</a>
        </p>
      </div>
    );
  }
}
/*
var _getRandomPosition = function() {
  var positions = Object.keys(constants.positions);
  return positions[Math.floor(Math.random() * ((positions.length - 1) + 1)) + 0];
};*/

const InstructionsModal = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Detailed Play Instructions
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>JOKENPO BET - Help</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Challenge</h4>
            <p>Be the most fast to win out 1000 on game bet and grant yourself on Hall of Fame but if you take it to long you could be at Shame Hall</p>

            <h4>Basic JOKENPO BET rules</h4>
            <p>Time is passing by, you are always in time-pressure ambient, so you must decide fast to get to the top of Hall's Fame</p>
            <p>When stack's growth it decrease the lag time between IA choice to make hard the game</p>
            
            <hr />

            <h4>Pontuation Rules</h4>
            <p>The final score is a formula. Score = Seconds / Rounds.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

//ReactDOM.render(<IntroModal />, mountNode);

export default App;
