Article.destroy_all
User.destroy_all
Comment.destroy_all

5.times do
  user = User.create(
    email: Faker::Internet.email,
    password: "123456",
  )

  6.times do
    article = Article.create(
      title: Faker::Book.title,
      content: Faker::Lorem.paragraphs,
      user_id: user.id,
      private: rand < 0.3,
    )

    2.times do
      Comment.create(
        content: Faker::Lorem.paragraphs,
        user_id: user.id,
        article_id: article.id,
      )
    end
  end
end
