export default interface ContentfulConfig {
  contentManagementApiKey: string;
  environmentName: string;
  selectedSpaces: Array<string>;
  installed?: boolean;
}
