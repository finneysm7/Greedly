class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  helper_method :current_user, :logged_in?
  
  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end
  
  def logged_in?
    !!current_user
  end
  
  def log_user_in!(user)
    @current_user = user
    session[:session_token] = @current_user.session_token
  end
  
  def log_user_out(user)
    user.reset_session_token!
    session[:session_token] = nil
  end
  
  def require_user
    redirect_to new_session_url if !logged_in?
  end
end
