import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts';
import useStyles from './pageCSS';

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => {
    return state.posts;
  });

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant='outlined'
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
