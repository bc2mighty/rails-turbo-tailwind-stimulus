require 'rails_helper'

RSpec.describe "TodoLists", type: :request do

  context "Todo list" do
    it "index page should load" do
      get todo_list_index_path
      expect(response).to be_successful
    end
  end

  context "Todo List creation" do
    let(:todo_list) { FactoryBot.create :todo_list }

    it "should be successful" do
      expect(todo_list.id.class).to eq(Integer)
      expect(todo_list.item).to eq("Item 1")
    end

    it "should not be successful" do
      expect { TodoList.new(item: '').save! }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end

  context "Todo list update" do
    let(:todo_list) { FactoryBot.create :todo_list }

    it "should be successful" do
      expect(todo_list.id.class).to eq(Integer)
      todo_list.update!(item: "Updated Item")
      expect(todo_list.item).to eq("Updated Item")
    end

    it "should not be successful" do
      expect { todo_list.update!(item: "")}.to raise_error(ActiveRecord::RecordInvalid)
    end
  end

  context "Todo list delete" do
    let(:todo_list) { FactoryBot.create :todo_list }

    it "should be successful" do
      todo_list.destroy
      expect { todo_list.reload }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end