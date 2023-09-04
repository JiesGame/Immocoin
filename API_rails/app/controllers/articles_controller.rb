class ArticlesController < ApplicationController
  before_action :set_article, only: %i[ show update destroy ]
  before_action :authenticate_user!, only: %i[ create update destroy ]

  # GET /articles
  def index
    if current_user
      @articles = Article.where(private: false).or(current_user.articles.where(private: true))
    else
      @articles = Article.where(private: false)
    end
    render json: @articles
  end
  

  # GET /articles/1
  def show
    render json: @article, include: :comments
  end

  # POST /articles
  def create
    @article = Article.new(title: article_params[:title], content: article_params[:content], user_id: current_user.id, private: article_params[:private])
      if @article.save
        render json: @article, status: :created, location: @article
      else
        render json: @article.errors, status: :unprocessable_entity
      end
  end

  # PATCH/PUT /articles/1
  def update
    if @article.user.id == current_user.id
      if @article.update(title: article_params[:title], content: article_params[:content], user_id: @article.user.id)
        render json: @article
      else
        render json: @article.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "Vous ne pouvez pas mettre à jour cet article." }, status: :unprocessable_entity
    end 
  end

  # DELETE /articles/1
  def destroy
    if @article.user.id == current_user.id
      @article.destroy
    else
      render json: { error: "Vous ne pouvez pas supprimer cet article." }, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def article_params
      params.require(:article).permit(:title, :content, :private)
    end
end
