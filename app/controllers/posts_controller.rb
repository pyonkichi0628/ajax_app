class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end

 # def new
 # end

  def create
    post = Post.create(content: params[:content])
    #renderメソッドでレスポンスで返却されるデータフォーマットにJSONを指定
    render json:{ post: post } 
  end
end
