import Layout from '../components/Layout';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableFooter,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from '../models/link';
import axios from 'axios';

const Links = (props: any) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`users/${props.match.params.id}/links`);

      setLinks(data);
    })();
  }, []);

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.slice(page * perPage, (page + 1) * perPage).map((link) => {
            console.log(link);
            return (
              <TableRow key={link.id}>
                <TableCell>{link.id}</TableCell>
                <TableCell>{link.code}</TableCell>
                <TableCell>{link.orders.length}</TableCell>
                <TableCell>
                  {link.orders.reduce((s, o) => s + o.total, 0)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={links.length}
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

export default Links;
