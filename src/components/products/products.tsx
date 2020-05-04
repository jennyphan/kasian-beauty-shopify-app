import createApp from '@shopify/app-bridge';
import { Redirect } from '@shopify/app-bridge/actions';
import { Card, ResourceList, Stack, TextStyle, Thumbnail } from '@shopify/polaris';
import Cookies from 'js-cookie';
import ls from 'local-storage';
import getConfig from 'next/config';
import * as React from 'react';
import { useQuery } from 'react-apollo';
import GET_PRODUCTS_BY_ID from '../graphql/queries/products';

const Products = () => {
  const { publicRuntimeConfig } = getConfig();
  const redirectToProduct = () => {
    const app = createApp({
      apiKey: publicRuntimeConfig.API_KEY || '',
      shopOrigin: Cookies.get('shopOrigin') || ''
    });

    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.APP, '/edit-products');
  };

  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID, {
    variables: { ids: ls('ids') }
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error! {error.message}</div>;

  const twoWeeksFromNow = new Date(Date.now() + 12096e5).toDateString();

  return (
    <>
      <Card>
        <ResourceList
          showHeader
          resourceName={{ singular: 'Product', plural: 'Products' }}
          items={data.nodes}
          renderItem={(item) => {
            const media = (
              <Thumbnail
                source={item.images.edges[0] ? item.images.edges[0].node.originalSrc : ''}
                alt={item.images.edges[0] ? item.images.edges[0].node.altText : ''}
              />
            );
            const { price } = item.variants.edges[0].node.price;
            return (
              <ResourceList.Item
                id={item.id}
                media={media}
                accessibilityLabel={`View details for ${item.title}`}
                onClick={() => {
                  ls('item', item);
                  redirectToProduct();
                }}
              >
                <Stack>
                  <Stack.Item fill>
                    <h3>
                      <TextStyle variation="strong">{item.title}</TextStyle>
                    </h3>
                  </Stack.Item>
                  <Stack.Item>
                    <p>{price}</p>
                  </Stack.Item>
                  <Stack.Item>
                    <p>Expires on{twoWeeksFromNow}</p>
                  </Stack.Item>
                </Stack>
              </ResourceList.Item>
            );
          }}
        />
      </Card>
    </>
  );
};

export default Products;
