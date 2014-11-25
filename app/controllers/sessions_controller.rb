class SessionsController < ApplicationController
  def new
      @user = User.new
      render :new
    end
  
    def create
      @user = User.find_by_credentials(user_params)
      unless @user.nil?
        if @user.save
          log_user_in!(@user)
          redirect_to posts_url
        else
          flash.now[:errors] = @user.errors.full_messages
          render :new
        end
      else
        render :new
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
