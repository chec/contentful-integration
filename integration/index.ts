import { IntegrationHandler } from '@chec/integration-handler';
import { AppDefinition, AppInstallation } from 'contentful-management/types';
import { OptionsOfJSONResponseBody } from 'got'

interface ContentfulConfig {
  contentManagementApiKey: string;
  environmentName: string;
  selectedSpaces: Array<string>;
}

const appUrl = 'https://contentful-app.chec.io';

const handler: IntegrationHandler = async (request, context) => {
  // This only runs on initial execution of an integration
  if (request.body.event !== 'integrations.ready') {
    return {
      statusCode: 400,
      body: 'The event that triggered this integration is unsupported.',
    };
  }

  const integration = await context.integration();
  const config: ContentfulConfig = integration.config;

  // Parse the list of chosen spaces into an object keyed by organisation ID
  const spacesByOrg: { [orgId: string]: Array<string> } = config.selectedSpaces.reduce((acc: object, candidate) => {
    // Parse the chosen space, which is a combined org ID and space ID. The regex (for individual IDs) comes from
    // Contentful documentation
    const result = candidate.match(/^o:([a-zA-Z0-9-_.]{1,64})==s:([a-zA-Z0-9-_.]{1,64})$/);

    if (!result) {
      return acc;
    }

    const [_, org, space] = result;
    // Check if there's already a key for the org ID resolved
    const existingOrg = Object.hasOwnProperty.call(acc, org) ? acc[org] : {};

    return {
      ...acc,
      [org]: [
        ...existingOrg,
        space,
      ],
    };
  }, {});

  // Find or create app definitions for each org
  const appDefinitionsByOrg: { [orgId: string]: AppDefinition } = {};

  const definitionResolutionPromises = Object.keys(spacesByOrg).map(async (orgId) => {
    const definitionBaseUrl = `https://api.contentful.com/organizations/${orgId}/app_definitions`;
    const gotOptions = {
      headers: {
        Authorization: `Bearer ${config.contentManagementApiKey}`,
        'Content-Type': 'application/vnd.contentful.management.v1+json',
      },
    };

    // Avoid adding a Commerce.js app if one is already installed by searching the existing definitions
    const { items }: { items: Array<any> } = await context.got(definitionBaseUrl, gotOptions).json();

    // Look for an existing definition
    const result = items.find(
      (definition: AppDefinition) => definition.src === appUrl
    );

    if (result) {
      appDefinitionsByOrg[orgId] = result;
      return;
    }

    // Create a definition in other cases
    const options: OptionsOfJSONResponseBody = {
      method: 'PUT',
      responseType: 'json',
      json: {
        name: 'Commerce.js App',
        src: appUrl,
        locations: [
          { location: 'app-config' },
          { location: 'entry-field', fieldTypes: [
              { type: 'Symbol' },
              { type: 'Array', items: { type: 'Symbol' } },
            ]},
          { location: 'dialog' },
        ]
      }
    };

    const response = await context.got<AppDefinition>(
      definitionBaseUrl,
      options
    );

    if (response.statusCode !== 201) {
      // Relay the error message from Contentful
      throw new Error(JSON.stringify(response.body));
    }

    appDefinitionsByOrg[orgId] = response.body;
  })

  try {
    await Promise.all(definitionResolutionPromises);
  } catch (error) {
    return {
      statusCode: 500,
      body: `An error occurred creating Contentful app definitions: ${error.message}`,
    }
  }

  // Now that all the app definitions are created, we can create all the app installations
  const installationPromises = Object.entries(spacesByOrg).reduce((acc, [orgId, spaceIds]) => {
    return acc.concat(spaceIds.map(async (spaceId) => {
      const appDefinition = appDefinitionsByOrg[orgId];
      const url = `https://api.contentful.com/spaces/${spaceId}/environments/${config.environmentName}/app_installations/${appDefinition.sys.id}`;
      const options: OptionsOfJSONResponseBody = {
        method: 'PUT',
        responseType: 'json',
        json: {
          parameters: {
            publicKey: context.publicKey,
          },
        },
      };

      const response = await context.got<AppInstallation>(url, options);

      if (response.statusCode !== 201) {
        // Relay the error message from Contentful
        throw new Error(JSON.stringify(response.body));
      }
    }));
  }, []);

  await Promise.all(installationPromises);

  return {
    statusCode: 204,
    body: '',
  };
};

export = handler;
