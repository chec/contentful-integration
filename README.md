# Contentful integration

Creates a Contentful app definition in your Contentful org, and installs to your Contentful spaces

<p align="center">
<img src="https://cdn.chec.io/chec-assets/integrations/contentful/contentful-cover.png" align="center" />
</p>

## Configuration

This integration provides a configuration app so that we can use the provided "management" API key to fetch available
spaces for the user to install to.

## Integration

This integration will attempt to find existing "App definitions" for the
[Contentful App](https://github.com/chec/contentful-app) on your organisation, or create new app definitions, and then
install that definition to the configured spaces.

## Integration template

This repo was bootstrapped from the Chec integration template https://github.com/chec/integration-template
