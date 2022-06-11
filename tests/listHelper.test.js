const listHelper = require("../utils/listHelper");
const average = require("../utils/listHelper").average;
const reverse = require("../utils/listHelper").reverse;
describe("reverse", () => {
	test("reverse of a", () => {
		const result = reverse("a");
		expect(result).toBe("a");
	});

	test("reverse of react", () => {
		const result = reverse("react");
		expect(result).toBe("tcaer");
	});

	test("reverse of releveler", () => {
		const res = reverse("releveler");
		expect(res).toBe("releveler");
	});
});

describe("average", () => {
	test("of one value is the value itself", () => {
		expect(average([1])).toBe(1);
	});

	test("of many is calculated right", () => {
		expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
	});

	test("of empty array is zero", () => {
		expect(average([])).toBe(0);
	});
});

describe("dummy", () => {
	test("dummy returns one", () => {
		const blogs = [];
		const res = listHelper.dummy(blogs);
		expect(res).toBe(1);
	});
});

describe("total likes", () => {
	const listWithOneBlog = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
	];

	const blogs = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
		{
			_id: "57722aa71b54a676234d17f8",
			title: "Two",
			author: "shafa",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 40,
			__v: 0,
		},
	];

	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});

	test("list has many blogs", () => {
		const res = listHelper.totalLikes(blogs);
		expect(res).toBe(45);
	});
});

describe("favoriteBlog", () => {
	const listWithOneBlog = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
	];

	const blogs = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
		{
			_id: "57722aa71b54a676234d17f8",
			title: "Two",
			author: "shafa",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 40,
			__v: 0,
		},
	];

	test("favorite 1 blog", () => {
		const result = listHelper.favoriteBlog(listWithOneBlog);
		expect(result).toStrictEqual({
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			likes: 5,
		});
	});

	test("favorite many blogs", () => {
		const res = listHelper.favoriteBlog(blogs);
		expect(res).toStrictEqual({ title: "Two", author: "shafa", likes: 40 });
	});
});

describe("mostBlog", () => {
	const blogs = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 150,
			__v: 0,
		},
		{
			_id: "57722aa71b54a676234d17f8",
			title: "Two",
			author: "shafa",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 80,
			__v: 0,
		},
		{
			_id: "57722a123a71b54a676234d17f8",
			title: "555",
			author: "shafa",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 40,
			__v: 0,
		},
		{
			_id: "57722aa71b54a676234d17f8",
			title: "221",
			author: "shafa",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 20,
			__v: 0,
		},
	];

	test("most blogs", () => {
		const result = listHelper.mostBlogs(blogs);
		expect(result).toStrictEqual({
			author: "shafa",
			blogs: 3,
		});
	});

	test("most likes", () => {
		const res = listHelper.mostLikes(blogs);
		expect(res).toStrictEqual({
			author: "Edsger W. Dijkstra",
			likes: 150,
		});
	});
});
