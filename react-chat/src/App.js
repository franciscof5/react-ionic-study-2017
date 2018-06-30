import React, { Component } from 'react';
import MessagePane from './MessagePane';
import ChannelList from './ChannelList';

import { getMessages, getChannels, saveMessage, onNewMessage } from './storage';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      channels: [],
      selected_channel_id: null
    };

    this.onSendMessage = this.onSendMessage.bind(this);
    this.onChannelSelect = this.onChannelSelect.bind(this);
  }

  componentDidMount() {
    getMessages().then(messages => this.setState({messages}));
    getChannels().then(channels => this.setState({channels, selected_channel_id: channels[0].id}));
    onNewMessage(new_message => {
      const messages = [...this.state.messages, new_message];
      this.setState({messages});
    });
  }

  onSendMessage(author, text) {
    const new_message = {
      id: this.state.messages[this.state.messages.length - 1].id + 1,
      author,
      text,
      channel_id: this.state.selected_channel_id
    };

    saveMessage(new_message);

    const messages = [...this.state.messages, new_message];
    this.setState({messages});
  }

  onChannelSelect(id) {
    this.setState({ selected_channel_id: id });
  }

  filteredMessages() {
    return this.state.messages.filter(({channel_id}) => channel_id === this.state.selected_channel_id);
  }

  render() {
    return (
      <div className="App">
        <ChannelList
          channels={this.state.channels}
          selectedChannelId={this.state.selected_channel_id}
          onSelect={this.onChannelSelect}
        />
        <MessagePane messages={this.filteredMessages()} onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

export default App;
