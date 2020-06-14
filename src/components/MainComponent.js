import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
class Main extends Component {
  
  constructor(props){
    super(props);
  }

  render(){

    const HomePage =()=>{
      return(
        <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]} 
              leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
              promotion={this.state.promotions.filter((promotion)=>promotion.featured)[0]}
        />
      );
    }

    const DishWithID = ({match})=>{
      return(
        <DishDetail dish={this.state.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
                    comment={this.state.comments.filter((comment)=> comment.dishId===parseInt(match.params.dishId,10))}/>
      );
    }

    return (
      <div className="Main">
        <Header/>
        <Switch>
					<Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}/>}/>
          <Route path="/menu/:dishId" component={DishWithID}/>
          <Route path="/aboutus" component={()=><About leaders={this.state.leaders}/>}/>
          <Route path="/contactus" component={Contact}/>
          <Redirect to="/home" />
				</Switch>
        <Footer/>
      </div>
    );
  }
}
export default Main;
