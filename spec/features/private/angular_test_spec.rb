#---
# Excerpted from "Rails, Angular, Postgres, and Bootstrap, Second Edition",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/dcbang2 for more book information.
#---
require 'rails_helper'
require_relative 'feature_support'

feature "search" do
  include FeatureSupport
  scenario "Angular Is Installed" do
    sign_up_and_log_in

    visit "/angular_test"
    expect(page).to have_text("Angular Test")
    within "form" do
      expect(page).to have_text("Name")
    end
    screenshot! filename: "angular-test-before.png"
    fill_in :name, with: "Pat"
    within "h2" do
      expect(page).to have_text("Hello Pat!")
    end
    screenshot! filename: "angular-test-after.png"
  end
end
