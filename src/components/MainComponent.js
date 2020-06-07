import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import {DISHES} from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
class Main extends Component {
  
  constructor(props){
    super(props);

    this.state={
      dishes:DISHES,
      selectedDishId:null,
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDishId: dishId});
  }

  render(){
    return (
      <div className="Main">
        <Header/>
        <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/>
        <DishDetail dish={this.state.dishes.filter((dish)=>this.state.selectedDishId===dish.id)[0]}/>
        <Footer/>
      </div>
    );
  }
}
export default Main;
