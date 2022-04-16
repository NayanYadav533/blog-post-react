import React, { Component } from 'react';

import blogData from "../../assets/data/db.json"

class Main extends Component {
  state = {
    isSelected: false,
    activePost: {}
  }
  render() {
    var Handlechange = e => {
      this.setState({
        activePost: blogData.find(post => {
          return post.title === e.target.innerText;
        })
      })
      this.setState({ isSelected: !this.state.isSelected });
    }
    let ap = this.state.activePost;
    const x = this.state.isSelected;
    return (
      <main className='p-4'>
        <div className="main-container">
          {
            x ?
              <div className='post'>
                <h1 className='mb-4'>
                  {ap.title}
                </h1>
                <p className='date'>{ap.date}</p>
                <p className='author'>
                  {ap.author}
                </p>
                <img className='my-3 w-75 mx-auto' src={ap.summary.img} />
                <p>{ap.body}</p>
              </div>
              :
              <div className="post-list">
                {blogData.map((data) => {
                  return (
                    <div className="card mb-4" key={data.date}>
                      <img className="card-img-top" src={data.summary.img} alt="Card image cap" />
                      <div className="card-body">
                        <h1 className="card-title" onClick={Handlechange}>{data.title}</h1>
                        <p className="card-text">{data.summary.txt}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
          }
        </div>
      </main>
    );
  }
}
export default Main;
