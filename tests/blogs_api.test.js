const { initial, rest } = require("lodash");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const Helper = require("./test_helper");

beforeEach(async () => {
	await Blog.deleteMany({});
	console.log("cleared");
	//并行执行promise
	/*
	const blogObject = Helper.initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObject.map((blog) => blog.save());
	await Promise.all(promiseArray);
	*/
	//顺序执行
	/*for(let blog in Helper.initialBlogs) {
		const blogObject = new Blog(blog)
		await blogObject.save()
	}*/
	await Blog.insertMany(Helper.initialBlogs);
	console.log("done");
});

describe("all blogs", () => {
	//返回所有blogs
	test("blogs are returned as json", async () => {
		const blogs = await Helper.BlogInDB();
		expect(blogs).toHaveLength(Helper.initialBlogs.length);
	});
});

describe("add a blog", () => {
	//是否正确post blog
	test("post blog", async () => {
		const newBlog = {
			title: "Third",
			author: "Thirdd",
			url: "URL3",
			likes: 3,
		};
		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);
		const blogsAtEnd = await Helper.BlogInDB();
		expect(blogsAtEnd).toHaveLength(Helper.initialBlogs.length + 1);
	});
});
describe("definition", () => {
	//是否有id的定义
	test("isID?", async () => {
		const blogs = await Helper.BlogInDB();
		expect(blogs[0].id).toBeDefined();
	});
});

describe("valid/invalid data", () => {
	//没有likes的blog能成功添加并且返回状态码201
	test("Blogs with no likes", async () => {
		const newBlog = {
			title: "Nolikes",
			author: "NoLike",
			url: "noLike",
		};
		await api.post("/api/blogs").send(newBlog).expect(201);
	});

	//没有tilte和url的blog返回状态码400
	test("newBlog without tilte or url", async () => {
		const newBlog = {
			// title: "Don't want url",
			author: "Don't want title or url",
			url: "Don't want title",
		};
		await api.post("/api/blogs").send(newBlog).expect(400);
	});
});

describe("delet/update blog", () => {
	//删除blog
	test("delete a blog", async () => {
		const BlogsAtStart = await Helper.BlogInDB();
		const deletedBlog = BlogsAtStart[0];
		await api.delete(`/api/blogs/${deletedBlog.id}`).expect(204);
		const resultBlogs = await Helper.BlogInDB();
		expect(resultBlogs).toHaveLength(BlogsAtStart.length - 1);
	});

	//更新blog
	test("update a blog", async () => {
		const BlogsWillBeUpdate = await Helper.BlogInDB();
		const id = BlogsWillBeUpdate[0].id;
		// console.log(id);
		await api.put(`/api/blogs/${id}`).expect(204);
		const response = await api.get(`/api/blogs/${id}`);
		expect(response.body.likes).toEqual(2);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
