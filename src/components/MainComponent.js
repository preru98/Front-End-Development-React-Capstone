import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators.js';

const mapStateToProps=state=>{
  return{
    dishes:state.dishes,
    comments:state.comments,
    leaders:state.leaders,
    promotions:state.promotions
  }
}

const mapDispatchToProps = dispatch => ({
  
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
  
  });

class Main extends Component {
  
  constructor(props){
    super(props);
  }

  render(){

    const HomePage =()=>{
      return(
        <Home dish={this.props.dishes.filter((dish)=>dish.featured)[0]} 
              leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
              promotion={this.props.promotions.filter((promotion)=>promotion.featured)[0]}
        />
      );
    }

    const DishWithID = ({match})=>{
      return(
        <DishDetail dish={this.props.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
                    comment={this.props.comments.filter((comment)=> comment.dishId===parseInt(match.params.dishId,10))}
                    addComment={this.props.addComment}/>
      );
    }

    return (
      <div className="Main">
        <Header/>
        <Switch>
					<Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
          <Route path="/menu/:dishId" component={DishWithID}/>
          <Route path="/aboutus" component={()=><About leaders={this.props.leaders}/>}/>
          <Route path="/contactus" component={Contact}/>
          <Redirect to="/home" />
				</Switch>
        <Footer/>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
