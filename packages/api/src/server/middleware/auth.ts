import { AuthChecker } from "type-graphql";

export const auth: AuthChecker = async () => {
  return true;
}
