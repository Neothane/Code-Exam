import TodoList from "../src/TodoList";
import { shallowMount } from "@vue/test-utils";
import { expect } from "chai";
import fetchMock from "fetch-mock";

describe("TodoList", () => {
  let todoList;

  beforeEach(() => {
    todoList = shallowMount(TodoList);
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("todoList component is correctly created", () => {
    expect(todoList.exists()).equals(true);
  });

  it("list of to dos is retrieved with GET API", async () => {
    const todos = [
        { id: 1, task: "Complete unit tests" },
        { id: 2, task: "Integration testing" }
    ];
    fetchMock.mock("https://illfatedlavendermemoryallocator--jabez007.repl.co/api/todo", {
        body: todos,
        status: 200
    });

    await todoList.getTodos();
    expect(todoList.todos).equals(todos);
  });
});