import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create or update profile for current user
export const upsertProfile = mutation({
  args: {
    displayName: v.string(),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get user
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    // Check for existing profile
    const existingProfile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .unique();

    if (existingProfile) {
      // Update existing profile
      await ctx.db.patch(existingProfile._id, {
        displayName: args.displayName,
        bio: args.bio,
      });
      return existingProfile._id;
    }

    // Create new profile
    return await ctx.db.insert("profiles", {
      userId: user._id,
      displayName: args.displayName,
      bio: args.bio,
    });
  },
});

// Get current user's profile
export const myProfile = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      return null;
    }

    return await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .unique();
  },
});

// List all profiles (with user info)
export const listProfiles = query({
  args: {},
  handler: async (ctx) => {
    const profiles = await ctx.db.query("profiles").collect();

    // Fetch user info for each profile
    const profilesWithUsers = await Promise.all(
      profiles.map(async (profile) => {
        const user = await ctx.db.get(profile.userId);
        return {
          ...profile,
          user: user
            ? { name: user.name, email: user.email, imageUrl: user.imageUrl }
            : null,
        };
      })
    );

    return profilesWithUsers;
  },
});
