class Api::ArticlesController < ApplicationController
  def index
    current_user.businesses.each do |business|
      business.reload
    end
    render json: Article.all.order('published_at DESC')
  end
  
  def show
    render json: Article.find(params[:id])
  end
end
