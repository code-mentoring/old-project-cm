import { ObjectType, Field, InputType } from 'type-graphql';
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

@InputType()
export class CourseInput {
  @Field()
  name: string;
}
