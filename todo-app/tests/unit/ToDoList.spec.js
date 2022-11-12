import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import ToDoList from "@/components/ToDoList.vue";

describe("ToDoList.vue", () => {
  it("can be mounted", () => {
    let component = shallowMount(ToDoList);
    expect(component.exists()).to.be.true;
    expect(component.vm.edit).to.be.null;
    expect(component.vm.todos).to.be.empty;
    expect(component.vm.saving).to.be.false;
  });

  it("can load todos", async () => {
    let component = shallowMount(ToDoList);
    let loadPromise = component.vm.load();
    expect(component.vm.todos).to.be.empty;
    expect(component.vm.saving).to.be.true;
    await loadPromise;
    expect(component.vm.todos).not.to.be.empty;
    expect(component.vm.saving).to.be.false;
  });

  describe("save", () => {
    it("can update a todo in the list", async () => {
      let component = shallowMount(ToDoList);
      await component.vm.load();

      let lengthBefore = component.vm.todos.length;
      let lastIndex = lengthBefore - 1;
      if (lastIndex == 0) return;

      let toUpdate = component.vm.todos[lastIndex];
      toUpdate.task += " (Mocha)";
      component.vm.edit = toUpdate;
      await component.vm.save();
      expect(component.vm.todos.length).to.equal(lengthBefore);
      expect(component.vm.todos[lengthBefore - 1].task).to.equal(toUpdate.task);
    });

    it("can add a todo to the list", async () => {
      let component = shallowMount(ToDoList);
      await component.vm.load();
      let lengthBefore = component.vm.todos.length;

      let toAdd = { task: "Mocha Note" };
      component.vm.edit = toAdd;
      await component.vm.save();
      expect(component.vm.todos.length).to.equal(lengthBefore + 1);
      expect(component.vm.todos[lengthBefore].task).to.equal(toAdd.task);
    });
  });
});
