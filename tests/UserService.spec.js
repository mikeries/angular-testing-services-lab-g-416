describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
      UserService = $injector.get('UserService');
      $httpBackend = $injector.get('$httpBackend');

      $httpBackend.when('GET', '/rest/user').respond({first_name: 'Bill', last_name: 'Gates'});
  }));

  it('should get the current users information', function (done) {
      $httpBackend.expectGET('/rest/user');

      UserService.getUser()
        .then(function (res) {
          if (res.data.first_name === 'Bill' && res.data.last_name === 'Gates') {
            done();
          }
        });

      $httpBackend.flush();
  });

  it('should create the full name', function (done) {
    $httpBackend.expectGET('/rest/user');

    UserService.getUser()
      .then(res => UserService.createFullName(res.data))
      .then(function (res) {
        if (res === 'Bill Gates') {
          done();
        }
      });

    $httpBackend.flush();
});
});
