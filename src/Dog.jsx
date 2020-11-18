import React from 'react';

class Dog extends React.Component {
  constructor(){
    super();
    this.fetchDog = this.fetchDog.bind(this);
    this.renderDogElement = this.renderDogElement.bind(this);

    this.state = {
      dogObj: undefined,
      loading: true,
      array: [],
    }
  }

  async fetchDog() {
    const requestJson = await fetch('https://dog.ceo/api/breeds/image/random');
    const requestObj = await requestJson.json();
    this.setState({
      dogObj: requestObj,
    })
  }

  componentDidMount() {
    this.fetchDog();
  }

  renderDogElement() {
    return (
      <div>
        <img src={this.state.dogObj.message} />
      </div>
    )
  }

  render() {
    const { dogObj } = this.state;
    const loadingElement = <span>Loading...</span>
    return (
      <div>
        {dogObj ? this.renderDogElement() : loadingElement}
      </div>
    )
  }
}

export default Dog;