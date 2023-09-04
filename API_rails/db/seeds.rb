User.destroy_all

5.times do
  user = User.create(
    email: Faker::Internet.email,
    password: "123456",
  )

  3.times do
    property = Property.create(
      title: Faker::Book.title,
      price: Faker::Commerce.price,
      description: Faker::Lorem.paragraphs,
      user_id: user.id,
    )

  end
end
