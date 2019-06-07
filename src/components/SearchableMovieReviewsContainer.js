import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'QLLOw7iVMeeFLxRZa6LPo2Wgfkc8gntC';
const BASE_URL =
  'https://api.nytimes.com/svc/movies/v2/reviews/search.json?' +
  `api-key=${NYT_API_KEY}&query=`;

// Code SearchableMovieReviewsContainer Here


export default class SearchableMovieReviewsContainer extends Component {
    state = {
        searchTerm: "",
        reviews: []
    }

    // currentRev = (search) => {
    //     let cur;
    //     // console.log(search)
    //     if (search === undefined){
    //         cur = this.state.reviews
    //     }else{
    //         this.setState({searchTerm: this.state.reviews.filter(review => review.display_title === search)})
    //     }
    //     return cur 
    // }

    componentDidMount() {
        fetch(BASE_URL)
          .then(response => response.json())
          .then(data => 
            this.setState({ reviews: data.results }) 
            )
      }
    handleOnChange = (e) => {
        // this.setState({[e.target.name]: e.target.value})  
        // this.setState({
        //     reviews: this.state.reviews.filter(review => { 
        //         return review.display_title === e.target.value
        //     })
        // })  
        // fetch(BASE_URL + `${e.target.value}`)
        // .then(res => res.json())
        // .then(res => this.setState({reviews: res.results}));
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const search = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${this.state.searchTerm}`
        // console.log(this.state.reviews)
        // console.log(e.target["searchTerm"].value)
        // this.currentRev(e.target["searchTerm"].value);
        // let cure = this.state.reviews.filter(review => { 
        //     return review.display_title.toLowerCase() === this.state.searchTerm.toLowerCase()
        // })
        // // console.log(cure)
        // this.setState({
        //     reviews: cure
        // })
    
        fetch(BASE_URL + `${this.state.searchTerm}`)
        .then(res => res.json())
        .then(res => this.setState({reviews: res.results}));
}

    render() {
        // console.log(this.state.reviews)
        // console.log(this.state.reviews)
        return (
            <div className="searchable-movie-reviews">
                <form onSubmit={this.handleSubmit}>
                    <input name="searchTerm" onChange={this.handleOnChange} type="text"></input>
                    <input onSubmit={this.handleSubmit} type="submit"></input>
                </form>
                
                <MovieReviews reviews ={this.state.reviews} />
            </div>
        )
    }
}

