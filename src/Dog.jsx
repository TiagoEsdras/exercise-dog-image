import React from 'react';

class Dog extends React.Component {
  constructor(){
    super();
    //this.fetchDog = this.fetchDog.bind(this);
    this.renderDogElement = this.renderDogElement.bind(this);
    this.saveDog = this.saveDog.bind(this);

    this.state = {
      dogObj: undefined,
      loading: true,
      storedDogs: [],
    }
  }

  async fetchDog() {
    this.setState(
      {loading: true},
      async () => {
        const requestJson = await fetch('https://dog.ceo/api/breeds/image/random');
        const requestObj = await requestJson.json();
        this.setState({
          loading: false,
          dogObj: requestObj,
        })
      }
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.dogObj.message.includes('terrier')) return false;
    return true;
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
        <img src={this.state.dogObj.message} alt="Dogs" />
        <button type='button' onClick={this.saveDog}>Salvar Dog!</button>
      </div>
    )
  }

  render() {
    const { loading, storedDogs } = this.state;
    const loadingElement = <span>Loading...</span>
    return (
      <div>
        {storedDogs.map(dog => (<img key={dog.message} src={dog.message} alt="dogs"/>))}
        {!loading ? this.renderDogElement() : loadingElement}
      </div>
    )
  }
}

export default Dog;