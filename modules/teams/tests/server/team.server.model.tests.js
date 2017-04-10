'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Team = mongoose.model('Team'),
  Categorie = mongoose.model('Categorie');

/**
 * Globals
 */
var user,
  categorie,
  team;

/**
 * Unit tests
 */
describe('Team Model Unit Tests:', function () {

  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    });

    user.save();

    categorie = new Categorie({
      title: 'Team Title',
      content: 'Team Content',
      user: user.id
    });
    categorie.save();

    team = new Team({
      name: 'Test team',
      categorie: categorie._id,
      user: user
    });

    team.save(function() {
      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      team.save(function (err) {
        should.not.exist(err);
        return done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      team.name = '';

      team.save(function (err) {
        should.exist(err);
        return done();
      });
    });
  });

  afterEach(function (done) {
    Team.remove().exec(function () {
      User.remove().exec(done);
    });
  });
});
