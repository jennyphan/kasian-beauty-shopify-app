import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import { EmptyState, Layout, Page } from '@shopify/polaris';
import ls from 'local-storage';
import * as React from 'react';
import Products from '../components/products/products';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const HomePage = () => {
  const [open, setOpen] = React.useState(false);
  const emptyState = ls('ids') == null;

  React.useEffect(() => {
    // console.log('emptyState:', emptyState);
  }, [emptyState]);

  const handleSelection = (resources: any) => {
    const idsFromResources = resources.selection.map((product: any) => product.id);
    setOpen(false);
    ls('ids', idsFromResources);
  };
  return (
    <>
      <Page>
        <TitleBar
          title="Beauty Products"
          primaryAction={{
            content: 'Select products',
            onAction: () => setOpen(true)
          }}
        />
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={open}
          onSelection={(resources) => handleSelection(resources)}
          onCancel={() => setOpen(false)}
        />
        {emptyState ? (
          <Layout>
            <EmptyState
              heading="Discount your products temporarily"
              action={{
                content: 'Select products',
                onAction: () => setOpen(true)
              }}
              image={img}
            >
              <p>Select products to change their price temporarily.</p>
            </EmptyState>
          </Layout>
        ) : (
          <Products />
        )}
      </Page>
    </>
  );
};

export default HomePage;
