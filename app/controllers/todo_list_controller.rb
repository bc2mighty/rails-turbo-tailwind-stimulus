class TodoListController < ApplicationController
  protect_from_forgery with: :null_session
  def index
    @todo_lists = TodoList.all
  end

  def new
  end

  def show
    @todo = TodoList.find(params[:id])
  end

  def update
    @todo = TodoList.find(params[:id])
    @todo.item = params[:item]
    @todo.save!
    return render json: {message: "Todo List updated successfully"}
  rescue StandardError => e
    return render json: {message: e.message}
  end

  def create
    todo_list = TodoList.new(todo_params)
    if !todo_list.valid?
      return render json: {message: todo_list.errors&.first&.full_message}, status: :bad_request
    end
    if todo_list.save!
      return render json: {message: "Todo List saved successfully"}
    else
      return render json: {message: "Something went wrong"}, status: :unprocessable_entity
    end
  rescue StandardError => e
    return render json: {message: e.message}
  end

  private
  def todo_params
    params.permit(:item)
  end
end
