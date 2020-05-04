import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  SettingToggle,
  Stack,
  TextField,
  TextStyle
} from '@shopify/polaris';
import * as React from 'react';

const AnnotatedLayout = () => {
  const [discount, setDiscount] = React.useState('10%');
  const [enabled, setEnabled] = React.useState(false);

  const contentStatus = enabled ? 'Disable' : 'Enable';
  const textStatus = enabled ? 'enabled' : 'disabled';
  const settingText = 'This setting is ';

  const handleSubmit = () => {};

  const handleDiscountChange = React.useCallback((discountValue: string) => {
    setDiscount(discountValue);
  }, []);

  const handleToggle = () => {
    setEnabled(!enabled);
  };

  return (
    <Page>
      <Layout>
        <Layout.AnnotatedSection
          title="Default discount"
          description="Add a product to Sample App, it will automatically be discounted."
        >
          <Card sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={discount}
                  onChange={handleDiscountChange}
                  label="Discount percentage"
                  type="text"
                />
                <Stack distribution="trailing">
                  <Button primary submit>
                    Save
                  </Button>
                </Stack>
              </FormLayout>
            </Form>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Price updates"
          description="Temporarily disable all Sample App price updates"
        >
          <SettingToggle
            action={{
              content: contentStatus,
              onAction: handleToggle
            }}
            enabled={enabled}
          >
            {settingText}
            <TextStyle variation="strong">{textStatus}</TextStyle>
          </SettingToggle>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
};

export default AnnotatedLayout;
