import React, { Component } from 'react';

import Main from '../mainComponent/main';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  fetchArticles() {
    fetch("https://newsapi.org/v2/everything?q=Apple&from=2022-04-16&sortBy=popularity&apiKey=2e98bdfa6e304aec9731e23c07cfc4ff")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: this.shuffleArray(result.articles).slice(-5)
          });
          console.log(this.state.items)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.fetchArticles();
    setInterval(() => {
      this.fetchArticles();
    }, 60000);
  }
  render() {
    var Handlechange = e => {
    }
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <nav className='pt-4'>
          <a className='btn btn-primary mb-2' onClick={Handlechange}>Homepage</a>
          {items.map(item => (
            <div className="card mb-2" key={item.author}>
              <img className="card-img-left" src={item.urlToImage} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-subtitle">{item.author}</p>
                <p className="card-text">{item.des}</p>
                <a href={item.url} target="_blank" className="btn btn-primary">See Full Article</a>
              </div>
            </div>
          ))}
        </nav>
      );
    }
  }
}
export default Nav;
