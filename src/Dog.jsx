import React from 'react';

class Dog extends React.Component {
  constructor(){
    super();

    this.renderDogElement = this.renderDogElement.bind(this);
    this.fetchDog = this.fetchDog.bind(this);

    this.state = {
      dogObj: "",
    }
  }

  async fetchDog() {
    const requestJson = await fetch('https://dog.ceo/api/breeds/image/random');
    const requestObj = await requestJson.json();
    this.setState({
      dogObj: requestObj,
    })
  }

  shouldComponentUpdate(_nextProps, nextState) {
    if (nextState.dogObj.message.includes('terrier')) return false;
    return true;
  }

  componentDidMount() {
    this.fetchDog();
  }

  renderDogElement() {
    return (
      <div>
        <img src={this.state.dogObj.message} alt="Dogs" className="dogs"/>
      </div>
    )
  }

  render() {
    const { dogObj } = this.state;
    const loadingElement = <span>Loading...</span>
    if (!dogObj) return loadingElement;
    else return (
      <div>
        <div>
          <button type='button' onClick={this.fetchDog}>Next Dog!</button>
        </div>
        <div>
          {this.renderDogElement()}
        </div>
      </div>
    )
  }
}

export default Dog;
