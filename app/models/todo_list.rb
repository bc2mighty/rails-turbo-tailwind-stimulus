class TodoList < ApplicationRecord
  validates :item, presence: {allow_blank: false}
end
