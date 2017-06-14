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
  def not_pat(&block)
    result = block.()
    while result =~ /^pat/i
      result = block.()
    end
    result
  end
  def create_address
    state = State.find_or_create_by!(
      code: Faker::Address.state_abbr,
      name: Faker::Address.state)

    Address.create!(
       street: Faker::Address.street_address,
         city: Faker::Address.city,
        state: state,
      zipcode: Faker::Address.zip)
  end
  def add_addresses
    ->(customer) {
      customer.create_customers_billing_address(address: create_address)
      customer.customers_shipping_address.create!(address: create_address, primary: true)
    }
  end
  let(:customer_attributes) {
    ->() {
      {
        first_name: not_pat { Faker::Name.first_name },
        last_name: not_pat { Faker::Name.last_name },
        email: not_pat { Faker::Internet.email },
        username: Faker::Internet.user_name + rand(1000).to_s
      }
    }
  }
  before do
    10.times do |i|
      Customer.create!(customer_attributes.())
    end
    @email_match = Customer.create!(customer_attributes.().merge(email: "pat@somewhere.com")).tap(&add_addresses)
    @matches = [
      Customer.create!(customer_attributes.().merge(first_name: "pat")).tap(&add_addresses),
      Customer.create!(customer_attributes.().merge(last_name: "patricia")).tap(&add_addresses),
      Customer.create!(customer_attributes.().merge(first_name: "patrick")).tap(&add_addresses),
      Customer.create!(customer_attributes.().merge(first_name: "pat")).tap(&add_addresses),
      Customer.create!(customer_attributes.().merge(last_name: "patricia")).tap(&add_addresses),
      Customer.create!(customer_attributes.().merge(first_name: "patrick")).tap(&add_addresses),
      Customer.create!(customer_attributes.().merge(first_name: "pat")).tap(&add_addresses),
      Customer.create!(customer_attributes.().merge(last_name: "patricia")).tap(&add_addresses),
      Customer.create!(customer_attributes.().merge(first_name: "patrick")).tap(&add_addresses),
      Customer.create!(customer_attributes.().merge(first_name: "pat")).tap(&add_addresses),
      Customer.create!(customer_attributes.().merge(last_name: "patricia")).tap(&add_addresses),
      Customer.create!(customer_attributes.().merge(first_name: "patrick")).tap(&add_addresses),
      @email_match,
    ]
  end

  scenario "search by email" do
    sign_up_and_log_in

    visit "/customers"
    fill_in "keywords", with: "pat@somewhere.com"

    within ".search-results ol" do
      expect(page).to have_selector("li", count: 10)
      expect(page).to have_text("pat@somewhere.com")
    end
    screenshot! filename: "customer-search.png"
  end

  scenario "typeahead" do
    sign_up_and_log_in
    visit "/customers"
    fill_in "keywords", with: "pat"
    within ".search-results ol" do
      expect(page).to have_selector("li", count: 10)
    end
    screenshot! filename: "customer-search-pat.png"

    fill_in "keywords", with: "patricia"
    within ".search-results[data-keywords='patricia'] ol" do
      expect(page).to have_selector("li", count: 4)
      expect(page).not_to have_text("Patrick")
    end
    screenshot! filename: "customer-search-patricia.png"
    screenshot! filename: "customer-search-component.png", selector: ".search-results[data-keywords='patricia'] ol li:first-child"
  end

  scenario "navigate" do
    sign_up_and_log_in
    visit "/customers"
    fill_in "keywords", with: "pat@somewhere.com"
    within ".search-results ol" do
      expect(page).to have_selector("li", count: 10)
      click_on("View Details...", match: :first)
    end
    within ".customer-details" do
      screenshot! filename: "customer-search-details.png"
    end
    screenshot! filename: "customer-search-details.png"
  end
end
