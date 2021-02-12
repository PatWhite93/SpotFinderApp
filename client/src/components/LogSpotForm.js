import React from 'react';
import { Button, Form, TextArea, Select } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

import { useForm } from '../util/hooks';
import { FETCH_SPOTS_QUERY } from '../util/graphql';

function LogSpotForm({ location, onClose }) {
  const { values, onChange, onSubmit } = useForm(createSpotCallback, {
    body: '',
    latitude: location.latitude,
    longitude: location.longitude,
    description: '',
    bustability: null,
  });

  const [createSpot, { error }] = useMutation(CREATE_SPOT_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_SPOTS_QUERY,
      });
      //   data.getSpots = [result.data.createSpot, ...data.getSpots];
      proxy.writeQuery({
        query: FETCH_SPOTS_QUERY,
        data: {
          getSpots: [result.data.createSpot, ...data.getSpots],
        },
      });
      values.body = '';
    },

    onError(err) {
      return err;
    },
  });

  function createSpotCallback() {
    createSpot();
  }

  const bustability = [
    { key: '0', text: '0 - Freeskate', value: 0 },
    { key: '1', text: '1', value: 1 },
    { key: '2', text: '2', value: 2 },
    { key: '3', text: '3 - Sometimes a bust', value: 3 },
    { key: '4', text: '4', value: 4 },
    { key: '5', text: '5 - Instabust', value: 5 },
  ];

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create Spot</h2>
        <Form.Field>
          <Form.Input
            placeholder="Name"
            label="Spot Name"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />

          <Form.Field
            id="form-textarea-control-opinion"
            control={TextArea}
            label="Description"
            name="description"
            value={values.description}
            placeholder="What's to skate?"
            onChange={onChange}
            error={error ? true : false}
          />
          <Form.Field
            control={Select}
            options={bustability}
            label={{
              children: 'Bustability',
              htmlFor: 'form-select-control-bust',
            }}
            value={values.bustability}
            name="bustability"
            onChange={onChange}
            placeholder="0 - 5"
            search
            searchInput={{ id: 'form-select-control-bust' }}
            error={error ? true : false}
          />
          {/* Description:
          <Form.Input
            placeholder="What's to skate?"
            name="body"
            onChange={onChange}
            value={values.description}
            error={error ? true : false}
          /> */}
          <Button type="submit" color="teal">
            Tag Spot
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_SPOT_MUTATION = gql`
  mutation createSpot(
    $body: String!
    $description: String!
    $longitude: Float!
    $latitude: Float!
    $bustability: Int!
  ) {
    createSpot(
      body: $body
      description: $description
      longitude: $longitude
      latitude: $latitude
      bustability: $bustability
    ) {
      id
      body
      latitude
      longitude
    }
  }
`;

export default LogSpotForm;
