import { createSDK } from '@chec/integration-configuration-sdk';

import 'regenerator-runtime/runtime';
const contentful = require('contentful-management');

interface Option {
  value: string,
  label: string,
}

interface ContentfulConfig {
  contentManagementApiKey: string
}

(async () => {
  const sdk = await createSDK();

  // Track changes over time to the API key and chosen organisation
  let existingKey: string = '';

  const baseFields = [
    {
      key: 'contentManagementApiKey',
      label: 'Contentful Manangement API key',
      type: 'short_text',
      description: 'A Contentful Management API key is required to install the "Commerce.js for Contentful" app to your organisations, and configure the app on your selected spaces.',
    },
    {
      key: 'environmentName',
      label: 'Environment name',
      type: 'short_text',
      default: 'master',
      description: 'The "environment" to install the app to in Contentful. Currently only one shared environment name is supported across all spaces. You may create multiple integrations if more environments are required.'
    }
  ];
  const spacesField = {
    key: 'selectedSpaces',
    label: 'Contentful spaces to install to',
    type: 'select',
    options: [],
    disabled: true,
    multiselect: true,
    required: true,
  };

  const updateSpacesDropdown = async (accessToken) => {
    // Reset the client
    const client = contentful.createClient({
      accessToken,
    });

    // Asynchronously load organisations for the dropdown, and set the schema to have these new options
    sdk.setSchema([
      ...baseFields,
      {
        ...spacesField,
        disabled: false,
        options: (await client.getSpaces()).items.map((space) => ({
          value: `o:${space.sys.organization.sys.id}==s:${space.sys.id}`,
          label: space.name,
        }))
      }
    ]);
  }

  const { contentManagementApiKey: initialKey } = sdk.getConfig() as ContentfulConfig;
  if (initialKey && initialKey.length !== 0) {
    updateSpacesDropdown(initialKey);
  }

  sdk.setSchema([...baseFields, spacesField]);

  sdk.onConfigUpdate(({
    contentManagementApiKey,
  }: ContentfulConfig) => {
    console.log('hi');

    // Check if the key has changed and we should reset everything
    if (existingKey === contentManagementApiKey) {
      return;
    }

    existingKey = contentManagementApiKey;

    // Reset the schema to a default state to remove existing space options
    sdk.setSchema([...baseFields, spacesField]);

    updateSpacesDropdown(existingKey)
  });
})();


