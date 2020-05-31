# News-Scraper

Web Scraper the scrapes articles from the Guardian News Website

# What This App Does:

1. Scrapes The Guardian News Website for breaking news stories from the United States
2. Saves each article headline, summary and the link to the full article to a Mongo Database
3. Users can save an article and view them on the Saved Articles page. On the saved articles page, users can post comments on the saved articles. The comments persist until they are deleted from the database by the user, or the saved article is deleted.

# Helpful?

Yes! This app quickly populates a page with the meat and potatoes of an article so that a user can have faster News browsing at their command.

# How to?

1. First, head to the app that is [Deployed Here!](https://atrscraper.herokuapp.com/)
2. Once the app starts, the user can either check in on Saved Articles and their associated notes, or they can scrape for some new articles to populate the DB and page with!
3. After the user scrapes articles, they can save whichever ones catch their interest and can leave comments for other people to see! P.S. Generally good practice to only scrape 1-3 times a day to let the news website populate with more articles.

# Technologies/Tools

1. [Node.js](https://nodejs.org/en/)
2. [Express.js](https://expressjs.com/)
3. [Express-Handlebars.js](https://www.npmjs.com/package/express-handlebars)
4. [Mongoose](https://www.npmjs.com/package/mongoose)
5. [Cheerio](https://www.npmjs.com/package/cheerio)
6. [Axios](https://www.npmjs.com/package/axios)
7. [Morgan](https://www.npmjs.com/package/morgan)
8. MVC-ish style backend functionality

# Created and Maintained by

[Alex R.](https://github.com/atrodondi)
