import fetch from 'node-fetch';
import fs from 'fs';

fetch(`http://localhost:4000/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `{
      __schema {
        types {
          kind
          name
          possibleTypes {
            name
          }
        }
      }
    }`,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      (type: any) => type.possibleTypes !== null,
    );
    result.data.__schema.types = filteredData;
    fs.writeFileSync('./schema/fragmentTypes.json', JSON.stringify(result.data));
  });
