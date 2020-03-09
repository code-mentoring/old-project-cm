import { getStore } from '@brix/model';
import { Arg, Query, Resolver, Mutation } from 'type-graphql';

import { ECourse, CourseInput } from '../entities/Course.entity';

@Resolver()
export class CourseResolver {
  model = getStore().model<ECourse>('ECourse');

  @Query(() => [ECourse])
  courses() {
    return this.model.findAll();
  }

  @Query(() => ECourse, { nullable: true })
  course(@Arg('id') id: string) {
    return this.model.findById(id);
  }

  @Mutation(() => ECourse)
  createCourse(
    @Arg('courseInput') courseInput: CourseInput
  ): Promise<ECourse> {
    return this.model.create(courseInput);
  }
}
