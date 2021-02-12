import React from 'react';
import { Button, Icon, Item, Label } from 'semantic-ui-react';
import placeholder from '../images/no_img.png';
import cop from '../images/bust-icon.png';

import '../App.css';

function myFunc(numberOfStars) {
  let stars = numberOfStars;
  let result = [];

  for (let i = 0; i < 5; i++) {
    if (stars !== 0) {
      result.push(<i color="yellow" class="star icon"></i>);
    } else {
      result.push(<i class="star outline icon"></i>);
    }
    if (stars !== 0) {
      stars--;
    }
  }
  return result;
}

const ListItem = ({ body, description, bustability, username }) => (
  <>
    <Item className="list-item">
      <Item.Image src={placeholder} />
      <Item.Content>
        <Item.Header as="a">{body}</Item.Header>
        <Item.Meta>
          <span className="cinema">Posted by: {username}</span>
        </Item.Meta>
        <Item.Description>{description}</Item.Description>
        <Item.Extra>
          <Button primary floated="right">
            View Spot
            <Icon name="right chevron" />
          </Button>
        </Item.Extra>
        <Item.Content verticalAlign="bottom">
          {bustability !== 0 ? (
            <Label color="red">
              <img src={cop} alt="bustIcon" />
              <Icon color="yellow">{myFunc(bustability)}</Icon>
            </Label>
          ) : (
            <Label className="label" color="green">
              Free to skate
            </Label>
          )}
        </Item.Content>
      </Item.Content>
    </Item>
  </>
);

export default ListItem;
