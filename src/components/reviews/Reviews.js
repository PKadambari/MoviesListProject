import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {useRef, useEffect} from 'react';
import api from '../../api/axiosConfig';
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    const addReview = async(e) => {
        e.preventDefault();

        let rev = revText.current;
        try{
            const response = await api.post("/api/v1/reviews", {reviewBody: rev.value, imdbId: movieId});
            const updatedReviews = [...reviews, {body:rev.value}];
            rev.value="";
            setReviews(updatedReviews);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect( () => {
        getMovieData(movieId);
    },[])
    return(
        <Container>
            <Row>
                <Col>
                   <h2>Reviews</h2>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a review.." />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((r) =>{
                            return(
                                <>
                                    <Row key={r.body}>
                                        <Col>
                                            {r.body}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews;