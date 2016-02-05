(function () {
    var app = angular.module('gstApp', []);
    
    app.controller('GstController', function($scope){
        
        $scope.GST = 0.15;
        
        function CreatePrice(){
            var price = {
                _priceExcludingGST: 0,
                _priceIncludingGST: 0,
                _gst: 0,
                get priceExcludingGST(){
                    return this._priceExcludingGST;
                },
                set priceExcludingGST(value){
                    this._priceExcludingGST = parseFloat(value);
                    this._priceIncludingGST = parseFloat(value) * (1 + $scope.GST);
                    this._gst = this._priceExcludingGST * $scope.GST;
                },
                get priceIncludingGST(){
                    return this._priceIncludingGST;
                },
                set priceIncludingGST(value){
                    this._priceIncludingGST = parseFloat(value);
                    this._priceExcludingGST = parseFloat(value) / (1 + $scope.GST);
                    this._gst = this._priceExcludingGST * $scope.GST;
                },
                get GST(){
                    return this._gst;
                }
            };
            return price;
        };
        
        var controller = this;
        this.title = 'GST Controller';
        this.prices = [ CreatePrice()];
        
        
        this.AddPrice = function(index){
            var price = CreatePrice();
            controller.prices.splice(index + 1, 0, price);
        };
        
        this.RemovePrice = function(index){
            controller.prices.splice(index, 1);
        };        
        
        this.GetTotalExcludingGST = function(){
            var total = 0;
            for(i = 0; i < controller.prices.length; i++){
                total = total + controller.prices[i].priceExcludingGST;
            }
            return total;
        };
        
        this.GetTotalGST = function(){
            var total = 0;
            for(i = 0; i < controller.prices.length; i++){
                total = total + controller.prices[i].GST;
            }
            return total;
        };
        
        this.GetTotalIncludingGST = function(){
            var total = 0;
            for(i = 0; i < controller.prices.length; i++){
                total = total + controller.prices[i].priceIncludingGST;
            }
            return total;
        };
    });
}())