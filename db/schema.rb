# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141205195425) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: true do |t|
    t.string   "guid",         null: false
    t.text     "link",         null: false
    t.string   "title",        null: false
    t.datetime "published_at", null: false
    t.integer  "business_id",  null: false
    t.text     "json",         null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "articles", ["business_id"], name: "index_articles_on_business_id", using: :btree

  create_table "businesses", force: true do |t|
    t.string   "title",        null: false
    t.string   "rss_feed_url", null: false
    t.text     "description"
    t.integer  "category_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_source"
  end

  add_index "businesses", ["category_id"], name: "index_businesses_on_category_id", using: :btree

  create_table "categories", force: true do |t|
    t.string   "title",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_source"
  end

  create_table "subscriptions", force: true do |t|
    t.integer  "user_id"
    t.integer  "business_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "subscriptions", ["business_id"], name: "index_subscriptions_on_business_id", using: :btree
  add_index "subscriptions", ["user_id"], name: "index_subscriptions_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
