import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


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
    function RenderComments({dish}) {
        if (dish != null && dish.comments!=null){
            const COMMENTS=dish.comments.map((COMMENT)=>{
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
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish ={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments dish={props.dish}/>
                    </div>
                </div>
            </div>
        );
    }

export default DishDetail;