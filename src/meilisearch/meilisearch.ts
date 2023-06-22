import { MeiliSearch } from 'meilisearch';
 
function getMeiliSearchClient() {
  const host = process.env.MEILISEARCH_HOST;
  const apiKey = process.env.MEILISEARCH_API_KEY;
 
  if (!host) {
    throw new Error('MEILISEARCH_HOST is not defined');
  }
 
  return new MeiliSearch({ host, apiKey });
}
 
export default getMeiliSearchClient;

