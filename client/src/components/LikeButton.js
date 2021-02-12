import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Button, Label, Icon } from 'semantic-ui-react';

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {
      return err;
    },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="blue">
        <Icon name="heart" />
        Like
      </Button>
    ) : (
      <Button color="blue" basic>
        <Icon name="heart" />
        Like
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="blue" basic>
      <Icon name="heart" />
      Like
    </Button>
  );

  return (
    <div>
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label basic color="blue" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </div>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
