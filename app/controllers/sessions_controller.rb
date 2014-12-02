class SessionsController < ApplicationController
  before_action :require_no_user, only: [:new]
  
  def new
      @user = User.new
      render :new
    end
  
    def create
      @user = User.find_by_credentials(user_params)
      unless @user.nil?
        log_user_in!(@user)
        redirect_to root_url
      else
        flash[:errors] = ["Invalid Email/Password"]
        redirect_to new_session_url
      end
    end
  
    def destroy
      @user = current_user
      log_user_out(@user)
      redirect_to new_session_url
    end
  
    private 
    def user_params
      params.require(:user).permit(:email, :password)
    end
end
