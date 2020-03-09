import { getStore } from '@brix/model';
import { Arg, Query, Resolver } from 'type-graphql';

import { ECourse } from '../entities/Couse.entity';

@Resolver()
export class CourseResolver {
  model = getStore().model<ECourse>('Course');

  @Query(() => [ECourse])
  courses() {
    return this.model.findAll();
  }

  @Query(() => ECourse, { nullable: true })
  course(@Arg('id') id: string) {
    return this.model.findById(id);
  }
}
