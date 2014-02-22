module Jekyll
  module ListPostCategories
    def cat_list(input)
      [input[0...-1].join(', '), input[-1]].join(' and ')
    end
  end
end

Liquid::Template.register_filter(Jekyll::ListPostCategories)