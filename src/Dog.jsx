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

  shouldComponentUpdate(_nextProps, { dogObj }) {
    return !dogObj.message.includes('terrier');
  }

  componentDidMount() {
    this.fetchDog();
  }

  componentDidUpdate() {
    const { message } = this.state.dogObj;
    localStorage.setItem('dogUrl', message);
    alert(message.split('/')[4])
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
