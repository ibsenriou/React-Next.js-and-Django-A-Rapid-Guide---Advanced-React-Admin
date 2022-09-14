import { Button, TextField } from '@mui/material';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const ProductForm = (props: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (props.match.params.id) {
      (async () => {
        const { data } = await axios.get(`products/${props.match.params.id}`);

        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setPrice(data.price);
      })();
    }
  }, []);

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    const data = {
      title,
      description,
      image,
      price,
    };

    if (props.match.params.id) {
      await axios.put(`products/${props.match.params.id}`, data);
    } else {
      await axios.post('products', data);
    }

    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={'/products/'} />;
  }

  return (
    <Layout>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <TextField
            label="Title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Description"
            rows={4}
            multiline
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Image"
            onChange={(event) => setImage(event.target.value)}
            value={image}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Price"
            type="number"
            onChange={(event) => setPrice(event.target.value)}
            value={price}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default ProductForm;
