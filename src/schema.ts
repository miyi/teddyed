import { nexusPrismaPlugin } from 'nexus-prisma'
import {
  idArg,
  intArg,
  makeSchema,
  objectType,
  enumType,
  stringArg,
} from 'nexus'
import { connect } from 'http2'
import { TLSSocket } from 'tls'

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.posts({
      pagination: false,
    })
  },
})

const Student = objectType({
  name: 'Student',
  definition(t) {
    t.model.id()
    t.model.firstName()
    t.model.lastName()
    t.model.age()
    t.model.gender()
    t.model.user()
  },
})

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.title()
    t.model.content()
    t.model.published()
    t.model.author()
  },
})

const Provider = objectType({
  name: 'Provider',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.listings({
      type: 'Listing',
    })
  },
})

const Instructor = objectType({
  name: 'Instructor',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.firstName()
    t.model.lastName()
    t.model.age()
    t.model.gender()
    t.model.listing()
    t.model.provider()
    t.model.eventStore({
      type: 'Event',
    })
  },
})

const Listing = objectType({
  name: 'Listing',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.title()
    t.model.content()
    t.model.owner({
      type: 'Provider',
    })
  },
})

const Event = objectType({
  name: 'Event',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.from()
    t.model.to()
    t.model.listing()
    t.model.provider()
    t.model.instructors({
      type: 'Instructor',
    })
    t.model.students({
      type: 'Student',
    })
    t.model.eventState()
  },
})

const EventState = enumType({
  name: 'EventState',
  members: ['ACTIVE', 'CANCELLED', 'FULFILLED'],
})

const Gender = enumType({
  name: 'Gender',
  members: ['MALE', 'FEMALE'],
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.post({
      alias: 'post',
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: (_, args, ctx) => {
        return ctx.photon.posts.findMany({
          where: { published: true },
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.photon.posts.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        })
      },
    })

    t.list.field('findUser', {
      type: 'User',
      args: {
        id: idArg(),
        email: stringArg(),
        name: stringArg(),
      },
      resolve: (_, { id, email, name }, ctx) => {
        return ctx.photon.users.findMany({
          where: {
            OR: [{ id: id }, { email: email }, { name: name }],
          },
        })
      },
    })

    t.crud.listing({
      alias: 'listing',
    })

    t.list.field('browseListings', {
      type: 'Listing',
      resolve: (_, args, ctx) => {
        return ctx.photon.listings.findMany()
      },
    })

    t.list.field('searchListing', {
      type: 'Listing',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.photon.listings.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
              { owner: { name: searchString } },
              { owner: { email: searchString } },
            ],
          },
        })
      },
    })

    t.list.field('findListingById', {
      type: 'Listing',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.photon.listings.findMany({
          where: { id: searchString },
        })
      },
    })

    t.crud.student({
      alias: 'student',
    })

    //redundant
    t.list.field('allStudents', {
      type: 'Student',
      resolve: (_, args, ctx) => {
        return ctx.photon.students.findMany()
      },
    })

    t.list.field('findStudentById', {
      type: 'Student',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.photon.students.findMany({
          where: { id: searchString },
        })
      },
    })

    t.crud.provider({}),
      t.list.field('findProviderById', {
        type: 'Provider',
        args: {
          searchString: stringArg({ nullable: true }),
        },
        resolve: (_, { searchString }, ctx) => {
          return ctx.photon.providers.findMany({
            where: { id: searchString },
          })
        },
      })

    t.list.field('searchProvider', {
      type: 'Provider',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.photon.providers.findMany({
          where: {
            name: { contains: searchString },
          },
        })
      },
    })

    t.crud.instructor({
      alias: 'instructor',
    })

    t.list.field('findInstructorById', {
      type: 'Instructor',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.photon.instructors.findMany({
          where: { id: searchString },
        })
      },
    })

    t.list.field('searchInstructor', {
      type: 'Instructor',
      args: {
        searchString: stringArg(),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.photon.instructors.findMany({
          where: {
            OR: [{ firstName: searchString }, { lastName: searchString }],
          },
        })
      },
    })

    t.crud.event({
      alias: 'event',
    })

    t.list.field('findEventById', {
      type: 'Event',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.photon.events.findMany({
          where: { id: searchString },
        })
      },
    })

    t.list.field('searchEventsByProvider', {
      type: 'Event',
      args: {
        searchString: stringArg({}),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.photon.events.findMany({
          where: {
            OR: [
              { provider: { name: searchString } },
              { provider: { email: searchString } },
            ],
          },
        })
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' })
    t.crud.updateOneUser({ alias: 'updateUser' })
    t.field('createStudent', {
      type: 'Student',
      args: {
        firstName: stringArg({ nullable: false }),
        lastName: stringArg({ nullable: false }),
        userEmail: stringArg({ nullable: false }),
        age: intArg({ nullable: true }),
        gender: stringArg({ nullable: true }),
      },
      resolve: async (
        _,
        { firstName, lastName, userEmail, age, gender },
        ctx,
      ) => {
        return ctx.photon.students
          .findMany({
            where: {
              user: {
                email: userEmail,
              },
              firstName,
              lastName,
            },
          })
          .then((result: any[]) => {
            if (!result.length) {
              return ctx.photon.students.create({
                data: {
                  firstName,
                  lastName,
                  age,
                  gender,
                  user: {
                    connect: { email: userEmail },
                  },
                },
              })
            } else {
              throw 'has dupes'
            }
          })
          .catch((e: string) => {
            throw new Error(e)
          })
      },
    })

    t.crud.updateOneStudent({ alias: 'updateStudent' })

    t.field('removeStudent', {
      type: 'Student',
      args: {
        id: idArg({ nullable: false }),
      },
      resolve: async (_, { id }, ctx) => {
        return ctx.photon.students.delete({
          where: { id },
        })
      },
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return ctx.photon.posts.create({
          data: {
            title,
            content,
            published: false,
            author: {
              connect: { email: authorEmail },
            },
          },
        })
      },
    })

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: {
        id: idArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.photon.posts.update({
          where: { id },
          data: { published: true },
        })
      },
    })

    t.crud.createOneProvider({ alias: 'signupProvider' })

    t.field('createListing', {
      type: 'Listing',
      args: {
        title: stringArg({ nullable: false }),
        ownerEmail: stringArg({ nullable: false }),
      },
      resolve: (_, { title, ownerEmail }, ctx) => {
        return ctx.photon.listings.create({
          data: {
            title: title,
            owner: {
              connect: { email: ownerEmail },
            },
          },
        })
      },
    })

    //todo: build validation into linkInstructorToListing
    t.field('linkInstructorToListing', {
      type: 'Listing',
      args: {
        listingId: idArg({ nullable: false }),
        instructorId: idArg({}),
      },
      resolve: (_, { listingId, instructorId }, ctx) => {
        return ctx.photon.listings.update({
          where: { id: listingId },
          data: {
            instructors: {
              connect: {
                id: instructorId,
              },
            },
          },
        })
      },
    })

    t.field('unlinkInstructorFromListing', {
      type: 'Listing',
      args: {
        listingId: idArg({ nullable: false }),
        instructorId: idArg({}),
      },
      resolve: (_, { listingId, instructorId }, ctx) => {
        return ctx.photon.listings.update({
          where: { id: listingId },
          data: {
            instructors: {
              disconnect: {
                id: instructorId,
              },
            },
          },
        })
      },
    })

    t.crud.createOneInstructor({ alias: 'createInstructor' })
    t.crud.deleteOneInstructor({ alias: 'deleteInstructor' })
    t.crud.createOneEvent({ alias: 'createEvent' })
    t.crud.deleteOneEvent({ alias: 'deleteEvent' })
    t.crud.updateOneEvent({ alias: 'updateEvent' })

    
    t.field('toggleEventStateToActive', {
      type: 'Event',
      args: { id: idArg({ nullable: false })},
      resolve: (_, { id }, ctx) => {
        return ctx.photon.events.update({
          where: {
            id
          },
          data: {
            eventState: "ACTIVE"
          }
        })
      }
    })

    t.field('toggleEventStateToInactive', {
      type: 'Event',
      args: { id: idArg({ nullable: false })},
      resolve: (_, { id }, ctx) => {
        return ctx.photon.events.update({
          where: {
            id
          },
          data: {
            eventState: "INACTIVE"
          }
        })
      }
    })

    t.field('toggleEventStateToFufilled', {
      type: 'Event',
      args: { id: idArg({ nullable: false })},
      resolve: (_, { id }, ctx) => {
        return ctx.photon.events.update({
          where: {
            id
          },
          data: {
            eventState: "FULFILLED"
          }
        })
      }
    })
  },
})

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Post,
    User,
    Student,
    Provider,
    Instructor,
    Listing,
    Event,
    Gender,
    EventState,
  ],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
