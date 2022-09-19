odoo.define('pos_product_offers.pos_product_offers', function (require) {
"use strict";

var models = require('point_of_sale.models');
var core = require('web.core');
var utils = require('web.utils');

var round_pr = utils.round_precision;

var _t = core._t;



var _super_orderline = models.Orderline;
models.Orderline = models.Orderline.extend({
	
	initialize: function() {
		_super_orderline.prototype.initialize.apply(this,arguments);
		this.offer_str = '0';
    },
	
	
    get_offer: function(){
        var offer_id = this.offer_id;
        return this.pos.product_offers.find(function(offer){return offer.id === offer_id;});
    },
    set_offer: function(offer){
        this.offer_id = offer.id;
    },
    
    set_quantity: function (quantity, keep_price) {
    	if (this.offer_id){
    		keep_price = true
    	}
    	return _super_orderline.prototype.set_quantity.apply(this, [quantity, keep_price]);
    },
    
    get_offer_str: function(){
        return this.offer_str;
    },
    export_as_JSON: function(){
        var json = _super_orderline.prototype.export_as_JSON.apply(this,arguments);
        json.offer_id = this.offer_id;
        json.offer_str = this.offer_str;
        return json;
    },
    init_from_JSON: function(json){
        _super_orderline.prototype.init_from_JSON.apply(this,arguments);
        this.offer_id = json.offer_id;
        this.offer_str = json.offer_str;
        
    },
    
    
    export_for_printing: function() {
        var line = _super_orderline.prototype.export_for_printing.apply(this,arguments);
        line.offer_str = this.offer_str;
        return line;
    },
    
});

var _super = models.Order;
models.Order = models.Order.extend({


    get_available_offers: function(){
        var client = this.get_client();
        if (!client) {
            return [];
        }

        var self = this;
        var offers = [];
        for (var i = 0; i < this.pos.product_offers.length; i++) {
            var offer = this.pos.product_offers[i];
            
            var dateFrom = new Date(Date.parse(offer.start_date));
            var dateTo = new Date(Date.parse(offer.end_date));
            var currentDate = new Date();
            currentDate.setHours(0,0,0,0)
            dateFrom.setHours(0,0,0,0)
            dateTo.setHours(0,0,0,0)
            
            if (dateFrom.getTime() <= currentDate.getTime()  && currentDate.getTime() <= dateTo.getTime()){
                var found = false;
                self.get_orderlines().forEach(function(line) {
                    found |= offer.offer_product_ids.find(function(product_id){return product_id === line.get_product().id;});
                });
                if(!found)
                    continue;
                offers.push(offer);
            }
        }
        return offers;
    },

    apply_offer: function(offer){
    	
    	var client = this.get_client();
        if (!client) {
            return [];
        }

        var self = this;
        
        var found = false;
        self.get_orderlines().forEach(function(line) {
            found = offer.offer_product_ids.find(function(product_id){return product_id === line.get_product().id;});
            if(found){
            	line.set_unit_price(offer.offer_price);
            	line.set_offer(offer);
            	line.offer_str = offer.name;
            }
        });
    },

    
});

});
