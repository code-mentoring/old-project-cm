import { ObjectType, Field } from 'type-graphql';
import { Model, ModelField } from '@brix/model';

@ObjectType()
@Model()
export class ECourse {
  @Field()
  id: string;

  @Field()
  @ModelField()
  name: string;
}
