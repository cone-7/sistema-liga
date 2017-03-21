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
describe('Categorie CRUD tests', function () {

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

  it('should not be able to save an categorie if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/categories')
          .send(categorie)
          .expect(403)
          .end(function (categorieSaveErr, categorieSaveRes) {
            // Call the assertion callback
            done(categorieSaveErr);
          });

      });
  });

  it('should not be able to save an categorie if not logged in', function (done) {
    agent.post('/api/categories')
      .send(categorie)
      .expect(403)
      .end(function (categorieSaveErr, categorieSaveRes) {
        // Call the assertion callback
        done(categorieSaveErr);
      });
  });

  it('should not be able to update an categorie if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/categories')
          .send(categorie)
          .expect(403)
          .end(function (categorieSaveErr, categorieSaveRes) {
            // Call the assertion callback
            done(categorieSaveErr);
          });
      });
  });

  it('should be able to get a list of categories if not signed in', function (done) {
    // Create new categorie model instance
    var categorieObj = new Categorie(categorie);

    // Save the categorie
    categorieObj.save(function () {
      // Request categories
      request(app).get('/api/categories')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single categorie if not signed in', function (done) {
    // Create new categorie model instance
    var categorieObj = new Categorie(categorie);

    // Save the categorie
    categorieObj.save(function () {
      request(app).get('/api/categories/' + categorieObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', categorie.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single categorie with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/categories/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Categorie is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single categorie which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent categorie
    request(app).get('/api/categories/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No categorie with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete an categorie if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/categories')
          .send(categorie)
          .expect(403)
          .end(function (categorieSaveErr, categorieSaveRes) {
            // Call the assertion callback
            done(categorieSaveErr);
          });
      });
  });

  it('should not be able to delete an categorie if not signed in', function (done) {
    // Set categorie user
    categorie.user = user;

    // Create new categorie model instance
    var categorieObj = new Categorie(categorie);

    // Save the categorie
    categorieObj.save(function () {
      // Try deleting categorie
      request(app).delete('/api/categories/' + categorieObj._id)
        .expect(403)
        .end(function (categorieDeleteErr, categorieDeleteRes) {
          // Set message assertion
          (categorieDeleteRes.body.message).should.match('User is not authorized');

          // Handle categorie error error
          done(categorieDeleteErr);
        });

    });
  });

  it('should be able to get a single categorie that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      usernameOrEmail: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin']
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new categorie
          agent.post('/api/categories')
            .send(categorie)
            .expect(200)
            .end(function (categorieSaveErr, categorieSaveRes) {
              // Handle categorie save error
              if (categorieSaveErr) {
                return done(categorieSaveErr);
              }

              // Set assertions on new categorie
              (categorieSaveRes.body.title).should.equal(categorie.title);
              should.exist(categorieSaveRes.body.user);
              should.equal(categorieSaveRes.body.user._id, orphanId);

              // force the categorie to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
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
                        should.equal(categorieInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
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
