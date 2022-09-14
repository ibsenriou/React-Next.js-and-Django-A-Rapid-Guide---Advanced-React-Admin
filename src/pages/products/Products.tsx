import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Product } from '../../models/product';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  Button,
  ToggleButtonGroup,
} from '@mui/material';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('products');

      setProducts(data);
    })();
  }, []);

  const deleteHandler = async (id: number) => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`products/${id}`);
    }

    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <Layout>
      <div className="pt-3 pb-2 mb-2 border-bottom">
        <Button href={'/products/create'} variant="contained" color="primary">
          Add
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            .slice(page * perPage, (page + 1) * perPage)
            .map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <img src={product.image} height={50} width={50} />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <ToggleButtonGroup>
                      <Button
                        variant="contained"
                        color="primary"
                        href={`/products/${product.id}/edit`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteHandler(product.id)}
                      >
                        Delete
                      </Button>
                    </ToggleButtonGroup>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={products.length}
              page={page}
              rowsPerPage={perPage}
              onPageChange={(event, newPage) => setPage(newPage)}
              rowsPerPageOptions={[]}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Layout>
  );
};

export default Products;
