import React from 'react';

class Dog extends React.Component {
  constructor(){
    super();
    this.fetchDog = this.fetchDog.bind(this);
    this.renderDogElement = this.renderDogElement.bind(this);
    this.saveDog = this.saveDog.bind(this);

    this.state = {
      dogObj: undefined,
      loading: true,
      storedDogs: [],
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

  saveDog() {
    this.setState(({ dogObj, storedDogs }) => ({
      storedDogs: [...storedDogs, dogObj],
    }))
    this.fetchDog();
  }

  renderDogElement() {
    return (
      <div>
        <img src={this.state.dogObj.message} />
        <button type='button' onClick={this.saveDog}>Salvar Dog!</button>
      </div>
    )
  }

  render() {
    const { dogObj, storedDogs } = this.state;
    const loadingElement = <span>Loading...</span>
    return (
      <div>
        {storedDogs.map(dog => (<img key={dog.message} src={dog.message}/>))}
        {dogObj ? this.renderDogElement() : loadingElement}
      </div>
    )
  }
}

export default Dog;