import React from 'react';

class Dog extends React.Component {
  constructor(){
    super();
    //this.fetchDog = this.fetchDog.bind(this);
    this.renderDogElement = this.renderDogElement.bind(this);
    this.saveDog = this.saveDog.bind(this);
    this.getDog = this.getDog.bind(this);

    this.state = {
      dogObj: {},
      loading: true,
      storedDogs: [],
    }
  }


  async getDog(){ 
      const requestJson = await fetch('https://dog.ceo/api/breeds/image/random');
      const requestObj = await requestJson.json();
      this.setState({
        loading: false,
        dogObj: requestObj,
      })
  }

   fetchDog() {
     this.setState({loading: true, dogObj:{}},this.getDog)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.dogObj.message?.includes('terrier')
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