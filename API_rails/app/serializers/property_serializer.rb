class PropertySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :description, :price, :featured_image
  belongs_to :user

  def featured_image
    return unless object.featured_image.attached?

    object.featured_image.blob.attributes
      .slice('filename', 'byte_size')
      .merge('url': featured_image_url)
      .tap { |attrs| attrs['name'] = attrs.delete('filename')}
  end

  def featured_image_url
    url_for(object.featured_image)
  end
end