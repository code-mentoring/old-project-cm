import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class EOauthCallbackInput {
  @Field()
  code: string
  @Field()
  provider: string;
}

@ObjectType()
export class ETokenResult {
  @Field()
  accessToken: string
  @Field()
  expiry: number
}
