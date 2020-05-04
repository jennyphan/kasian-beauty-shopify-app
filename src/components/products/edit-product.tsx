import {
  Banner,
  Card,
  DisplayText,
  Form,
  FormLayout,
  Layout,
  PageActions,
  TextField,
  Toast,
} from '@shopify/polaris';
import ls from 'local-storage';
import * as React from 'react';
import { useMutation } from 'react-apollo';
import UPDATE_PRICE from '../graphql/queries/edit-products';

const EditProduct = () => {
  const editItem: any = ls('item');

  const [showToast, setShowToast] = React.useState(false);
  const [discount, setDiscount] = React.useState('10%');
  const [price, setPrice] = React.useState('0');
  const [variantId, setVariantId] = React.useState('10%');

  const [updatePrice, { data, error: mutationError }] = useMutation(UPDATE_PRICE);

  const showError = mutationError && <Banner status="critical">{mutationError.message}</Banner>;
  const showToast2 = data && data.productVariantUpdate && (
    <Toast content="Sucessfully updated" onDismiss={() => setShowToast(false)} />
  );

  React.useEffect(() => {
    setPrice(editItem?.variants.edges[0].node.price);
    setVariantId(editItem?.variants.edges[0].node.id);
    const discounter = editItem?.variants.edges[0].node.price * 0.1;
    setDiscount((Number(price) - discounter).toFixed(2));
  }, []);

  const handleDiscountChange = React.useCallback((discountValue: string) => {
    setDiscount(discountValue);
  }, []);

  const handleSave = () => {
    const productVariableInput: any = {
      id: variantId,
      price: discount,
    };
    setShowToast(true);
    updatePrice({ variables: { input: productVariableInput } });
  };

  return (
    <Layout>
      {showToast && showToast2}
      <Layout.Section>
        {showError}
        <DisplayText size="large">name</DisplayText>
        <Form onSubmit={() => null}>
          <Card sectioned>
            <FormLayout>
              <FormLayout.Group>
                <TextField prefix="$" value={price} disabled label="Original price" type="number" />
                <TextField
                  prefix="$"
                  value={discount}
                  onChange={handleDiscountChange}
                  label="Discounted price"
                  type="text"
                />
              </FormLayout.Group>
              <p>This sale price will expire in two weeks</p>
            </FormLayout>
          </Card>
          <PageActions
            primaryAction={{
              content: 'Save',
              onAction: handleSave,
            }}
            secondaryActions={[
              {
                content: 'Remove discount',
              },
            ]}
          />
        </Form>
      </Layout.Section>
    </Layout>
  );
};

export default EditProduct;
