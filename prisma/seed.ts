import { Photon } from '@prisma/photon'
import { connect } from 'http2'

const photon = new Photon()

// A `main` function so that we can use async/await
async function main() {
  // Seed the database with users and posts
  const user1 = await photon.users.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Watch the talks from Prisma Day 2019',
          content: 'https://www.prisma.io/blog/z11sg6ipb3i1/',
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  })
  const user2 = await photon.users.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma/',
            published: false,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  })
  console.log(
    `Created users: ${user1.name} (${user1.posts.length} post) and (${user2.posts.length} posts) `,
  )

  // Retrieve all published posts
  const allPosts = await photon.posts.findMany({
    where: { published: true },
  })
  console.log(`Retrieved all published posts: `, allPosts)

  // Create a new post (written by an already existing user with email alice@prisma.io)
  const newPost = await photon.posts.create({
    data: {
      title: 'Join the Prisma Slack community',
      content: 'http://slack.prisma.io',
      published: false,
      author: {
        connect: {
          email: 'alice@prisma.io',
        },
      },
    },
  })
  console.log(`Created a new post: `, newPost)

  // Publish the new post
  const updatedPost = await photon.posts.update({
    where: {
      id: newPost.id,
    },
    data: {
      published: true,
    },
  })
  console.log(`Published the newly created post: `, updatedPost)

  // Retrieve all posts by user with email alice@prisma.io
  const postsByUser = await photon.users
    .findOne({
      where: {
        email: 'alice@prisma.io',
      },
    })
    .posts()
  console.log(`Retrieved all posts from a specific user: `, postsByUser)

  const provider_1 = await photon.providers.create({
    data: {
      email: 'john@provider.com',
      name: 'john',
      listings: {
        create: {
          title: 'math tutoring',
        },
      },
      instructors: {
        create: {
          email: 'john@provider.com',
          firstName: 'John',
          lastName: 'Smith',
          gender: 'MALE',
          age: 25,
        },
      },
    },
    include: {
      listings: true,
      instructors: true,
    },
  })

  const provider_2 = await photon.providers.create({
    data: {
      email: 'susie@provider.com',
      name: 'susie',
      listings: {
        create: {
          title: 'writing camp',
        },
      },
      instructors: {
        create: {
          email: 'susie@provider.com',
          firstName: 'Susie',
          lastName: 'Sommer',
          gender: 'FEMALE',
          age: 22,
        },
      },
    },
    include: {
      listings: true,
      instructors: true,
    },
  })

  console.log(
    `Created users: ${provider_1.name} (${provider_1.listings.length} post) and ${provider_2.name} ( ${provider_2.listings.length} posts) `,
  )

  const allListings = await photon.listings.findMany()

  console.log('allListings: ', allListings)

  const newListing = await photon.listings.create({
    data: {
      title: 'Hackathon for teens',
      content: 'http://slack.prisma.io',
      owner: {
        connect: {
          email: 'john@provider.com',
        },
      },
      instructors: {
        connect: {
          email: 'john@provider.com',
        },
      },
    },
  })

  console.log(`Created a new listing: `, newListing)

  const instructor_john = await photon.instructors.findOne({
    where: {
      email: 'john@provider.com',
    },
  })

  console.log('updated listings by john: ', instructor_john)

  //need the if statement to pass typescript check TS2531: 'object might be null'
  if (instructor_john) {
    const connectNewListingToInstructor = await photon.listings.update({
      data: {
        instructors: {
          connect: {
            id: instructor_john.id,
          },
        },
      },
      where: {
        id: newListing.id,
      },
    })

    console.log(
      'Connect new listing to instructor John : ',
      connectNewListingToInstructor,
    )

    const newListingByJohn = await photon.listings.findOne({
      where: {
        id: newListing.id,
      },
    })

    console.log('newListingByJohn : ', newListingByJohn)
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect()
  })
