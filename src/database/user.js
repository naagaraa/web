import Dexie from "dexie";

// Initialize DB
export const db = new Dexie("MyPWA_DB");

// Define schema
db.version(1).stores({
  posts: "++id, title, content, createdAt, published",
});

// Add post
export const addPost = async (title, content) => {
  return await db.posts.add({
    title,
    content,
    published: false,
    createdAt: new Date().toISOString(),
  });
};

// Get all posts
export const getPosts = async () => {
  return await db.posts.toArray();
};

// Toggle published status
export const togglePost = async (id) => {
  const post = await db.posts.get(id);
  if (post) {
    await db.posts.update(id, { published: !post.published });
  }
};
