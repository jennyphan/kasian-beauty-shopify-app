import { Frame, Page } from '@shopify/polaris';
import * as React from 'react';
import EditProduct from '../components/products/edit-product';

const EditProducts = () => (
  <Frame>
    <Page>
      <EditProduct />
    </Page>
  </Frame>
);

export default EditProducts;
