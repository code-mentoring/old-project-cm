import path from 'path';
import { emitSchemaDefinitionFile } from 'type-graphql';

import { schema } from '../server/middleware/apollo';


(async () => {
  await emitSchemaDefinitionFile(
    path.resolve(process.cwd(), 'dist/schema.gql'),
    await schema()
  );
})();
