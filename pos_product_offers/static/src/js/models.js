odoo.define("pos_product_offers.models", function (require) {
  "use strict";

  const models = require("point_of_sale.models");
   models.load_models([
        {
            model: 'pos.product.offer',
            fields: ['name', 'start_date', 'end_date', 'offer_price', 'offer_product_ids'],
            
	        loaded: function(self, product_offers){
	        	self.product_offers = [];
	        	product_offers.forEach(function(product_offer) {
	                self.product_offers.push(product_offer);
	            });
	        },
        },
        ], {'after': 'product.product'});
  
});
