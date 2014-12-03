class Api::ArticlesController < ApplicationController
  def index
    render json: Article.all.order('published_at DESC')
  end
end
