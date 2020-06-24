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
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators.js';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps=state=>{
  return{
    dishes:state.dishes,
    comments:state.comments,
    leaders:state.leaders,
    promotions:state.promotions
  }
}

const mapDispatchToProps = dispatch => ({
  
    postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback')),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),

});


class Main extends Component {
  
  constructor(props){
    super(props);
  }

  componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
  }

  render(){

    const HomePage =()=>{
      return(
		<Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]} 
			  dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}
        
        leader={this.props.leaders.filter((leader)=>leader.featured)[0]}

        promotion={this.props.promotions.promotions.filter((promotion)=>promotion.featured)[0]}
        promosLoading={this.props.promotions.isLoading}
        promosErrMess={this.props.promotions.errMess}
        />
      );
    } 

    const DishWithID = ({match})=>{
      return(
		<DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
		            isLoading={this.props.dishes.isLoading}
                ErrMess={this.props.dishes.errMess}
                
                comment={this.props.comments.comments.filter((comment)=> comment.dishId===parseInt(match.params.dishId,10))}
                CommentsErrMess={this.props.comments.errMess}
                postComment={this.props.postComment}/>
      );
    }

    return (
        <div className="Main">
            <Header/>
			<TransitionGroup>
				<CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
					<Switch>
						<Route path="/home" component={HomePage}/>
						<Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
						<Route path="/menu/:dishId" component={DishWithID}/>
						<Route path="/aboutus" component={()=><About leaders={this.props.leaders}/>}/>
						<Route path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
						<Redirect to="/home" />
					</Switch>
				</CSSTransition>
			</TransitionGroup>
            <Footer/>
        </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
