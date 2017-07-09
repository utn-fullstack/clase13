import React from 'react';
import { Col, Table } from 'react-bootstrap';
import { QueryRenderer, graphql } from 'react-relay';
import environment from 'App/environment';
import LoadingSpinner from 'Common/LoadingSpinner';
import ErrorAlert from 'Common/ErrorAlert';
import CategoryRow from './CategoryRow';

const categoriesTableQuery = graphql`
  query CategoriesTableQuery {
    categories {
      ...CategoryRow_category
    }
  }
`;

const CategoriesTable = ({ categories }) =>
  <Col md={12}>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Label</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(item => <CategoryRow category={item} />)}
      </tbody>
    </Table>
  </Col>;

const CategoriesTableRenderer = ({ match }) =>
  <QueryRenderer
    environment={environment}
    query={categoriesTableQuery}
    variables={{
      categoryId: match && match.params.id,
      count: 12
    }}
    render={({ error, props }) => {
      if (error) return <ErrorAlert error={error} />;

      if (props) return <CategoriesTable {...props} />;

      return <LoadingSpinner />;
    }}
  />;

export default CategoriesTableRenderer;
