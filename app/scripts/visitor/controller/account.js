(function (define) {
    "use strict";

    define([
        "visitor/init",
        "visitor/service/facebook",
        "visitor/service/google"
    ], function (visitorModule, fb, gl) {
        visitorModule

            .controller("visitorAccountController", [
                "$scope",
                "$visitorService",
                "$visitorApiService",
                "$location",
                "VISITOR_DEFAULT_AVATAR",
                function ($scope, $visitorService, $visitorApiService, $location, VISITOR_DEFAULT_AVATAR) {
                    $scope.addresses = [];
                    $scope.address = {};
                    $scope.visitor = $visitorService.getVisitor();

                    var getAddressList = function(){
                        console.log($scope.visitor);
                        $visitorApiService.getAddresses({"visitorId":$scope.visitor._id}).$promise.then(
                            function (response) {
                                var result = response.result || [];
                                $scope.addresses = result;
                            }
                        );
                    }

                    $scope.getAvatar = function () {
                        var avatar;
                        avatar = VISITOR_DEFAULT_AVATAR;
                        if ($scope.visitor.facebook_id !== "") {
                            avatar = "http://" + fb.getAvatar($scope.visitor.facebook_id, "large");
                        } else if ($scope.visitor.google_id !== "") {
                            avatar = gl.getAvatar($scope.visitor.google_id);
                        }
                        return avatar;
                    };

                    $scope.getFullName = function () {
                        return $scope.visitor.fname + " " + $scope.visitor.lname;
                    };

                    $scope.saveVisitor = function () {
                        alert("Implement this!!! Don't saved in DB");
                    }

                    $scope.update = function() {
                        $visitorApiService.update($scope.visitor).$promise.then(
                            function (response) {
                                var result = response.result || [];
                                console.log(result)
                            }
                        );
                    }


                    $scope.$watch("visitor", getAddressList);
                }
            ]);
        return visitorModule;
    });
})(window.define);