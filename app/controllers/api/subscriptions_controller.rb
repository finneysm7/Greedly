class Api::SubscriptionsController < ApplicationController
  def create
    @subscribe = current_user.subscriptions.create!({business_id: params[:business_id]})
    
    respond_to do |format|
      format.html { redirect_to root_url }
      format.json { render json: @subscribe }
    end
  end
  
  def destroy
    @subscribe = current_user.subscriptions.find(params[:id])
    @subscribe.destroy!
    
    respond_to do |format|
      format.html { redirect_to root_url}
      format.json { render json: @subscribe}
    end
  end
  
  def index
    render json: current_user.subscriptions
  end
end
