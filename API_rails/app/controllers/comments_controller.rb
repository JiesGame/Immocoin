class CommentsController < ApplicationController
  before_action :authenticate_user!

  def index
    @article = Article.find(params[:article_id])
    @comments = @article.comments
    render json: @article.comments
  end

  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.new(comment_params)
    @comment.user = current_user
    if @comment.save
      render json: @article.comments, status: :created, location: @article
    else
      render json: { error: "Le commentaire n'a pas pu être publié !"}, status: :unprocessable_entity
    end
  end

  def update
    @article = Article.find(params[:article_id])
    @comment = @article.comments.find(params[:id])
    if @comment.user.id == current_user.id
      if @comment.update(content: comment_params[:content], user_id: @comment.user.id)
        render json: @article.comments
      else
        render json: { error: "Le commentaire n'a pas pu être édité !"}, status: :unprocessable_entity
      end
    else
      render json: { error: "Vous ne pouvez pas mettre à jour ce commentaire." }, status: :unprocessable_entity
    end 
  end

  def destroy
    @article = Article.find(params[:article_id])
    @comment = @article.comments.find(params[:id])
    if @comment.user.id == current_user.id
      @comment.destroy
    else
      render json: { error: "Vous ne pouvez pas supprimer ce commentaire." }, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end
