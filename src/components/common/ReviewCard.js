import { useEffect, useState } from 'react';
import ProductRating from './ProductRating';
import { AUTH } from '../../lib/auth';
import { API } from '../../lib/api';
import ProfilePicture from './ProfilePicture';
import {
  Card,
  CardContent,
  Typography,
  TextareaAutosize,
  CardActions,
  Button
} from '@mui/material';

export default function ReviewCard({
  text,
  reviewer,
  productId,
  reviewId,
  rating,
  setIsUpdated
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [reviewText, setReviewText] = useState(text);
  const [reviewRating, setReviewRating] = useState(rating);
  // const [user, setUser] = useState('');

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const handleReviewTextChange = (e) => setReviewText(e.target.value);

  // useEffect(() => {
  //   API.POST(API.ENDPOINTS.singleUser({ reviewer }), {}, API.getHeaders())
  //     .then(({ data }) => setUser(data))
  //     .catch((e) => console.log(e));
  // }, [reviewer]);

  const saveChanges = () => {
    if (text !== reviewText || rating !== reviewRating) {
      API.PUT(
        API.ENDPOINTS.singleReview(productId, reviewId),
        { text: reviewText, rating: reviewRating },
        API.getHeaders()
      )
        .then(() => {
          toggleEditMode();
          setIsUpdated(true);
        })
        .catch((e) => console.log(e));
    }
  };

  const deleteReview = () =>
    API.DELETE(
      API.ENDPOINTS.singleReview(productId, reviewId),
      API.getHeaders()
    )
      .then(() => setIsUpdated(true))
      .catch((e) => console.log(e));

  const Rating = () =>
    isEditMode ? (
      <ProductRating
        rating={reviewRating}
        size={30}
        setRating={setReviewRating}
      />
    ) : (
      <ProductRating rating={rating} size={30} />
    );

  return (
    <Card>
      <CardContent>
        {reviewer.cloudinaryImageId && (
          <ProfilePicture imageId={reviewer.cloudinaryImageId} />
        )}
        {reviewer.username}
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom />
        {isEditMode ? (
          <TextareaAutosize
            value={reviewText}
            onChange={handleReviewTextChange}
            style={{ width: '100%', height: '22px' }}
          />
        ) : (
          <Typography variant='h5' component='div'>
            {text}
          </Typography>
        )}
        <Rating />
      </CardContent>
      {(AUTH.getPayload().isAdmin || AUTH.isOwner(reviewer._id)) && (
        <CardActions>
          <Button size='small' onClick={toggleEditMode}>
            {isEditMode ? 'CANCEL' : 'Edit Review'}
          </Button>
          <Button
            size='small'
            onClick={isEditMode ? saveChanges : deleteReview}
          >
            {isEditMode ? 'SAVE' : 'Delete Review'}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
