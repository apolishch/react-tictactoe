class HomeController < ApplicationController
  respond_to :json, :html

  def index
    render template: 'home/index', layout: 'application'
  end
end
