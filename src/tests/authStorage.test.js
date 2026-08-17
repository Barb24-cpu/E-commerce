import { describe, it, expect, beforeEach } from "vitest";
import {
  getSavedUser,
  saveUser,
  removeUser,
  getRegisteredUsers,
  saveRegisteredUsers,
  findUserByEmail,
  registerUser,
  loginUser,
} from "../context/authStorage";

describe("authStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getSavedUser / saveUser / removeUser", () => {
    it("returns null when no user is saved", () => {
      expect(getSavedUser()).toBeNull();
    });

    it("saves and retrieves a user", () => {
      const user = { email: "test@test.com", name: "Test" };
      saveUser(user);
      expect(getSavedUser()).toEqual(user);
    });

    it("removes a saved user", () => {
      saveUser({ email: "test@test.com", name: "Test" });
      removeUser();
      expect(getSavedUser()).toBeNull();
    });

    it("returns null on invalid JSON", () => {
      localStorage.setItem("user", "not-json");
      expect(getSavedUser()).toBeNull();
    });
  });

  describe("getRegisteredUsers / saveRegisteredUsers", () => {
    it("returns empty array when no users registered", () => {
      expect(getRegisteredUsers()).toEqual([]);
    });

    it("saves and retrieves registered users", () => {
      const users = [{ email: "a@a.com", name: "A", password: "123" }];
      saveRegisteredUsers(users);
      expect(getRegisteredUsers()).toEqual(users);
    });

    it("returns empty array on invalid JSON", () => {
      localStorage.setItem("sokoplus-users", "bad");
      expect(getRegisteredUsers()).toEqual([]);
    });
  });

  describe("findUserByEmail", () => {
    it("returns undefined when no users", () => {
      expect(findUserByEmail("a@a.com")).toBeUndefined();
    });

    it("finds user by email", () => {
      const users = [{ email: "a@a.com", name: "A", password: "123" }];
      saveRegisteredUsers(users);
      expect(findUserByEmail("a@a.com")).toEqual(users[0]);
    });

    it("is case-insensitive", () => {
      const users = [{ email: "A@A.COM", name: "A", password: "123" }];
      saveRegisteredUsers(users);
      expect(findUserByEmail("a@a.com")).toEqual(users[0]);
    });

    it("returns undefined when email not found", () => {
      saveRegisteredUsers([{ email: "b@b.com", name: "B", password: "456" }]);
      expect(findUserByEmail("a@a.com")).toBeUndefined();
    });
  });

  describe("registerUser", () => {
    it("registers a new user and returns success with user", () => {
      const result = registerUser({ name: "Test", email: "test@test.com", password: "password123" });
      expect(result).toEqual({ success: true, user: { name: "Test", email: "test@test.com" } });
      expect(findUserByEmail("test@test.com")).toBeTruthy();
    });

    it("stores the user with password", () => {
      registerUser({ name: "Test", email: "test@test.com", password: "password123" });
      const stored = getRegisteredUsers();
      expect(stored[0].password).toBe("password123");
    });

    it("returns error if email already registered", () => {
      registerUser({ name: "Test", email: "test@test.com", password: "password123" });
      const result = registerUser({ name: "Test2", email: "test@test.com", password: "password456" });
      expect(result.success).toBe(false);
      expect(result.error).toContain("already exists");
    });

    it("is case-insensitive for duplicate email check", () => {
      registerUser({ name: "Test", email: "Test@Test.com", password: "password123" });
      const result = registerUser({ name: "Other", email: "test@test.com", password: "password456" });
      expect(result.success).toBe(false);
    });
  });

  describe("loginUser", () => {
    it("returns success with user if credentials match", () => {
      registerUser({ name: "Test", email: "test@test.com", password: "password123" });
      const result = loginUser({ email: "test@test.com", password: "password123" });
      expect(result).toEqual({ success: true, user: { name: "Test", email: "test@test.com" } });
    });

    it("returns error if password is wrong", () => {
      registerUser({ name: "Test", email: "test@test.com", password: "password123" });
      const result = loginUser({ email: "test@test.com", password: "wrong" });
      expect(result.success).toBe(false);
      expect(result.error).toContain("Incorrect");
    });

    it("returns error if user not found", () => {
      const result = loginUser({ email: "nobody@test.com", password: "password123" });
      expect(result.success).toBe(false);
      expect(result.error).toContain("No account");
    });
  });
});
