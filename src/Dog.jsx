import React from 'react';

class Dog extends React.Component {
  constructor(){
    super();
    this.fetchDog = this.fetchDog.bind(this);

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
  
  render() {
    return <div />
  }
}

export default Dog;