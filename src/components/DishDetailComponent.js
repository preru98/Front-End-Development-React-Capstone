import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


    function RenderDish({dish}) {
        if (dish != null){
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
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
    function RenderComments({comments}) {
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
                        <RenderComments comments={props.comment}/>
                    </div>
                </div>
            </div>
        );
    }

export default DishDetail;