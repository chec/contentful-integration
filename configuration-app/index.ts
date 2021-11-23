import {createSDK, Schema, SchemaFieldTypes, SelectSchemaItem,} from '@chec/integration-configuration-sdk';
import ContentfulConfig from '../config';

(async () => {
  const sdk = await createSDK();

  // Track changes over time to the API key and chosen organisation
  let existingKey: string = '';

  if (sdk.editMode) {
    // Check if the integration is still running
    // @ts-ignore
    if (!Object.hasOwnProperty.call(sdk.config, 'installed') || !sdk.config.installed) {
      sdk.setSchema([
        {
          type: SchemaFieldTypes.Html,
          content: '<p>Please wait while the Commerce.js app is configured on contentful</p>',
        }
      ]);
      return;
    }

    // Fix dashboard to not have excessive spacing around p tags
    sdk.setSchema([
      {
        type: SchemaFieldTypes.Html,
        content: `
<p>Your contentful app is configured. When you create "short_text" content models, "Commerce.js" will appear under the
appearance tab for your model.</p>
<p>For more details, use the "Learn more" link on the right.</p>
        `,
      }
    ]);

    return;
  }

  const baseFields: Schema<ContentfulConfig> = [
    {
      type: SchemaFieldTypes.Html,
      content: `
<p><strong>This integration requires a Contentful personal access token.</strong> You can issue an access token
<a href="https://app.contentful.com/account/profile/cma_tokens" target="_blank" rel="noopener noreferrer">here</a></p>
      `,
    },
    {
      key: 'contentManagementApiKey',
      label: 'Personal access token',
      type: SchemaFieldTypes.ApiKey,
    },
    {
      key: 'environmentName',
      label: 'Environment name',
      type: SchemaFieldTypes.ShortText,
      default: 'master',
      description: 'The "environment" to install the app to in Contentful. Currently only one shared environment name is supported across all spaces. You may create multiple integrations if more environments are required.'
    }
  ];
  const spacesField: SelectSchemaItem<ContentfulConfig> = {
    key: 'selectedSpaces',
    label: 'Contentful spaces to install to',
    type: SchemaFieldTypes.Select,
    options: [],
    disabled: true,
    multiselect: true,
    required: true,
  };

  const updateSpacesDropdown = async (accessToken) => {
    // Load spaces from Contentful
    const response = await fetch('https://api.contentful.com/spaces', {
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (response.status !== 200) {
      return;
    }

    const spaces = (await response.json()).items;

    // Asynchronously load organisations for the dropdown, and set the schema to have these new options
    sdk.setSchema<ContentfulConfig>([
      ...baseFields,
      {
        ...spacesField,
        disabled: false,
        options: spaces.map((space) => ({
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


