import { ObjectType, Field } from 'type-graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class EUser {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  socialId: string;

  @Field()
  socialPic: string;
}
