import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class EModule {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
