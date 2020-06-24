import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors} from 'react-redux-form';
import { Loading } from './LoadComponent';
import { baseUrl } from '../shared/baseUrl';


    function RenderDish({dish}) {
        if (dish != null){
            return(
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
    function RenderComments({comments, dishId, postComment}) {
        if (comments!=null){
            const COMMENTS=comments.map((COMMENT)=>{
                return(
                    <ul className="list-unstyled">
                        <li key={COMMENT.id}>{COMMENT.comment}<br/>by {[COMMENT.author,new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(COMMENT.date)))].join(' on ')}</li>
                    </ul>
                );
            });
            return(
                <div>
                    <h4>Comments</h4>
                    <div>{COMMENTS}</div>
                    <CommentForm dishId={dishId} postComment={postComment}/>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
    function DishDetail(props){
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else if(props.dish!=null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3><hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish ={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comment}
                                            postComment={props.postComment}
                                            dishId={props.dish.id}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state={
                isModalOpen:false,
            }
        }

        toggleModal=()=>{
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit=(values)=>{
            this.setState({
                isModalOpen: false
            });
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render(){
            return(
                <React.Fragment>
                    <Button color="primary" onClick={this.toggleModal}>Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            SUBMIT FEEDBACK!
                        </ModalHeader>
                        <ModalBody>
                            <div className="container">
                                <LocalForm onSubmit={this.handleSubmit}>
                                    <Row className="form-group">
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" id="rating" placeholder="Rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="author">Name</Label>
                                        <Control.text model=".author" id="name" placeholder="Author" name="author" 
                                                        className="form-control" validators={{
                                                          minLength:minLength(3),
                                                          maxLength:maxLength(15)
                                                        }}
                                        />
                                        <Errors className="text-danger"
                                               show="touched"
                                               model=".author"
                                               messages={{
                                                    minLength : "Name must contain atleast three characters",
                                                    maxLength : "Name must not contain more than 15 chracters"  
                                               }}
                                        />
                                                    
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea rows="6" model=".comment" id="comment" placeholder="Comment" name="comment" className="form-control"/>
                                    </Row>
                                    <Row className="form-group">
                                        <Button type="submit" color="primary">Submit</Button>
                                    </Row>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
        }
    }

export default DishDetail;