'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Categorie = mongoose.model('Categorie'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  categorie;

/**
 * Categorie routes tests
 */
describe('Categorie Admin CRUD tests', function () {
  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      usernameOrEmail: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      roles: ['admin'],
      username: credentials.usernameOrEmail,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new categorie
    user.save(function () {
      categorie = {
        title: 'Categorie Title',
        content: 'Categorie Content'
      };

      done();
    });
  });

  it('should be able to save an categorie if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new categorie
        agent.post('/api/categories')
          .send(categorie)
          .expect(200)
          .end(function (categorieSaveErr, categorieSaveRes) {
            // Handle categorie save error
            if (categorieSaveErr) {
              return done(categorieSaveErr);
            }

            // Get a list of categories
            agent.get('/api/categories')
              .end(function (categoriesGetErr, categoriesGetRes) {
                // Handle categorie save error
                if (categoriesGetErr) {
                  return done(categoriesGetErr);
                }

                // Get categories list
                var categories = categoriesGetRes.body;

                // Set assertions
                (categories[0].user._id).should.equal(userId);
                (categories[0].title).should.match('Categorie Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update an categorie if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new categorie
        agent.post('/api/categories')
          .send(categorie)
          .expect(200)
          .end(function (categorieSaveErr, categorieSaveRes) {
            // Handle categorie save error
            if (categorieSaveErr) {
              return done(categorieSaveErr);
            }

            // Update categorie title
            categorie.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing categorie
            agent.put('/api/categories/' + categorieSaveRes.body._id)
              .send(categorie)
              .expect(200)
              .end(function (categorieUpdateErr, categorieUpdateRes) {
                // Handle categorie update error
                if (categorieUpdateErr) {
                  return done(categorieUpdateErr);
                }

                // Set assertions
                (categorieUpdateRes.body._id).should.equal(categorieSaveRes.body._id);
                (categorieUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an categorie if no title is provided', function (done) {
    // Invalidate title field
    categorie.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new categorie
        agent.post('/api/categories')
          .send(categorie)
          .expect(422)
          .end(function (categorieSaveErr, categorieSaveRes) {
            // Set message assertion
            (categorieSaveRes.body.message).should.match('Title cannot be blank');

            // Handle categorie save error
            done(categorieSaveErr);
          });
      });
  });

  it('should be able to delete an categorie if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new categorie
        agent.post('/api/categories')
          .send(categorie)
          .expect(200)
          .end(function (categorieSaveErr, categorieSaveRes) {
            // Handle categorie save error
            if (categorieSaveErr) {
              return done(categorieSaveErr);
            }

            // Delete an existing categorie
            agent.delete('/api/categories/' + categorieSaveRes.body._id)
              .send(categorie)
              .expect(200)
              .end(function (categorieDeleteErr, categorieDeleteRes) {
                // Handle categorie error error
                if (categorieDeleteErr) {
                  return done(categorieDeleteErr);
                }

                // Set assertions
                (categorieDeleteRes.body._id).should.equal(categorieSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single categorie if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new categorie model instance
    categorie.user = user;
    var categorieObj = new Categorie(categorie);

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new categorie
        agent.post('/api/categories')
          .send(categorie)
          .expect(200)
          .end(function (categorieSaveErr, categorieSaveRes) {
            // Handle categorie save error
            if (categorieSaveErr) {
              return done(categorieSaveErr);
            }

            // Get the categorie
            agent.get('/api/categories/' + categorieSaveRes.body._id)
              .expect(200)
              .end(function (categorieInfoErr, categorieInfoRes) {
                // Handle categorie error
                if (categorieInfoErr) {
                  return done(categorieInfoErr);
                }

                // Set assertions
                (categorieInfoRes.body._id).should.equal(categorieSaveRes.body._id);
                (categorieInfoRes.body.title).should.equal(categorie.title);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Categorie.remove().exec(done);
    });
  });
});
